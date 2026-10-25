import { Check, Minus, Plus } from "@phosphor-icons/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { DIETARY_NOTE, isOrderable, menuCategories, type MenuItem } from "@/data/menu";
import { MAX_QTY, formatUSD } from "@/lib/cart";
import { useCart } from "@/lib/use-cart";

import { DietaryTags } from "./dietary";
import { Img } from "./img";

function AddControl({ item }: { item: MenuItem }) {
  const { lines, add, setQty } = useCart();
  const qty = lines.find((l) => l.item.id === item.id)?.qty ?? 0;
  const [just, setJust] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  if (qty > 0) {
    return (
      <div className="stepper">
        <button
          type="button"
          aria-label={`Fewer ${item.name}`}
          onClick={() => setQty(item.id, qty - 1)}
        >
          <Minus size={16} aria-hidden />
        </button>
        <output aria-label={`${item.name} quantity`}>{qty}</output>
        <button
          type="button"
          aria-label={`More ${item.name}`}
          disabled={qty >= MAX_QTY}
          onClick={() => setQty(item.id, qty + 1)}
        >
          <Plus size={16} aria-hidden />
        </button>
      </div>
    );
  }
  return (
    <button
      type="button"
      className="add"
      aria-label={`Add ${item.name} to your order`}
      {...(just ? { "data-added": "" } : {})}
      onClick={() => {
        add(item);
        setJust(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setJust(false), 1200);
      }}
    >
      {just ? (
        <Check size={16} weight="bold" aria-hidden />
      ) : (
        <Plus size={16} weight="bold" aria-hidden />
      )}
      {just ? "Added" : "Add"}
    </button>
  );
}

function MenuRow({ item, order }: { item: MenuItem; order: boolean }) {
  const thumb = item.image;
  return (
    <li>
      <article className={`menu-row ${thumb ? "has-thumb" : ""}`}>
        {thumb && (
          <div className="photo menu-thumb">
            <Img id={thumb} alt={item.imageAlt ?? ""} sizes="(min-width: 640px) 128px, 88px" />
          </div>
        )}
        <div className="min-w-0">
          <div className="menu-head">
            <h3 className="display-sm">{item.name}</h3>
            <span className="leader" aria-hidden />
            <span className="price">{formatUSD(item.price)}</span>
          </div>
          <p className="mt-1.5 max-w-[56ch] text-muted">{item.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <DietaryTags dietary={item.dietary} />
            {item.popular && <span className="chip text-accent-text">Popular</span>}
            {order && (
              <div className="ml-auto">
                <AddControl item={item} />
              </div>
            )}
          </div>
        </div>
      </article>
    </li>
  );
}

interface Props {
  /** "order" adds quantity controls and hides dishes that are not sold for pickup. */
  mode?: "browse" | "order";
  /** The category to open on (browse mode reads it from the page address). */
  initial?: string | undefined;
}

/**
 * The menu as real text in a keyboard-friendly tablist: arrow keys move between categories, Home and
 * End jump to the first and last, and the panel crossfades. In browse mode the chosen category is
 * kept in the address (?c=wood-fire) so it can be linked to.
 */
export function MenuBrowser({ mode = "browse", initial }: Props) {
  const order = mode === "order";
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(
    menuCategories.some((c) => c.id === initial) ? (initial as string) : menuCategories[0]!.id,
  );
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});
  const active = menuCategories.find((c) => c.id === activeId) ?? menuCategories[0]!;
  const items = order ? active.items.filter(isOrderable) : active.items;

  // Follow the address when it changes (a link from the home page, or the back button).
  useEffect(() => {
    if (!order && initial && menuCategories.some((c) => c.id === initial)) setActiveId(initial);
  }, [initial, order]);

  function select(id: string, focus = false) {
    setActiveId(id);
    if (focus) tabs.current[id]?.focus();
    if (!order) {
      void navigate({
        to: "/menu",
        search: { c: id },
        replace: true,
        resetScroll: false,
        viewTransition: false,
      });
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const i = menuCategories.findIndex((c) => c.id === activeId);
    const last = menuCategories.length - 1;
    let next = -1;
    if (e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next < 0) return;
    e.preventDefault();
    select(menuCategories[next]!.id, true);
  }

  return (
    <div>
      <div className="rail">
        <div className={order ? "" : "wrap"}>
          <div role="tablist" aria-label="Menu categories" className="rail-scroll">
            {menuCategories.map((c) => {
              const count = order ? c.items.filter(isOrderable).length : c.items.length;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabs.current[c.id] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${c.id}`}
                  className="tab"
                  aria-selected={c.id === activeId}
                  aria-controls="menu-panel"
                  tabIndex={c.id === activeId ? 0 : -1}
                  onClick={() => select(c.id)}
                  onKeyDown={onKeyDown}
                >
                  {c.name}
                  <small aria-hidden>{count}</small>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        key={active.id}
        role="tabpanel"
        id="menu-panel"
        aria-labelledby={`tab-${active.id}`}
        tabIndex={0}
        className={`menu-panel ${order ? "pt-8" : "wrap pt-10"}`}
      >
        <div
          className={
            order
              ? "grid gap-6"
              : "grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16"
          }
        >
          <header
            className={order ? "" : "lg:sticky lg:top-[calc(var(--nav-h)+5rem)] lg:self-start"}
          >
            <h2 className="display-md">{active.name}</h2>
            <p className="lead mt-3">{active.blurb}</p>
            {!order && (
              <div className="photo mt-6 hidden aspect-[4/5] lg:block">
                <Img id={active.image} alt="" sizes="22rem" />
              </div>
            )}
          </header>
          <div>
            <ul className="menu-list border-t border-line">
              {items.map((item) => (
                <MenuRow key={item.id} item={item} order={order} />
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">{DIETARY_NOTE}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {order ? (
                <Link to="/reservations" className="btn btn-ghost">
                  Dining in? Reserve a table
                </Link>
              ) : (
                <>
                  <Link to="/reservations" className="btn btn-primary">
                    Reserve a table
                  </Link>
                  <Link to="/order" className="btn btn-ghost">
                    Order for pickup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
