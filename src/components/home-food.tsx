import { ArrowRight, ArrowUpRight, Bag, HandPointing, Timer } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";

import { DietaryTags } from "@/components/dietary";
import { Img } from "@/components/img";
import { alt } from "@/data/photos";
import {
  categoryOf,
  findMenuItem,
  menuCategories,
  signatureDishIds,
  type MenuItem,
} from "@/data/menu";
import { formatUSD } from "@/lib/cart";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

function Dish({
  dish,
  n,
  className,
  ratio,
}: {
  dish: MenuItem;
  n: number;
  className: string;
  ratio: string;
}) {
  const category = categoryOf(dish.id)!;
  return (
    <article className={`reveal ${className}`}>
      <Link
        to="/menu"
        search={{ c: category.id }}
        className="group block"
        aria-label={`${dish.name}, ${formatUSD(dish.price)}. See it on the menu`}
      >
        <div className={`photo zoom ${ratio}`}>
          <Img
            id={dish.image!}
            alt={dish.imageAlt ?? alt[dish.image!]}
            sizes="(min-width: 768px) 55vw, 100vw"
          />
        </div>
        <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4">
          <span className="numeral">{String(n).padStart(2, "0")}</span>
          <h3 className="display-sm">{dish.name}</h3>
          <span className="price">{formatUSD(dish.price)}</span>
          <p className="col-start-2 col-end-4 mt-2 max-w-[52ch] text-muted">{dish.description}</p>
          <div className="col-start-2 col-end-4 mt-3">
            <DietaryTags dietary={dish.dietary} />
          </div>
        </div>
      </Link>
    </article>
  );
}

/** "Made to be savored": an uneven four-dish composition rather than a row of identical cards. */
export function Signature() {
  const dishes = signatureDishIds.map((id) => findMenuItem(id)).filter((d): d is MenuItem => !!d);
  const [a, b, c, d] = dishes as [MenuItem, MenuItem, MenuItem, MenuItem];
  return (
    <section className="section" aria-labelledby="signature-h">
      <div className="wrap">
        <header className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div className="reveal">
            <p className="eyebrow">Signature plates</p>
            <h2 id="signature-h" className="display-lg mt-4">
              Made to be <span className="it">savored.</span>
            </h2>
          </div>
          <div className="reveal">
            <p className="lead">
              Seasonal ingredients, generous flavors and the kind of cooking that brings everyone to
              the table.
            </p>
            <Link to="/menu" className="btn btn-solid mt-6">
              Explore the full menu
              <ArrowRight size={18} className="nudge" aria-hidden />
            </Link>
          </div>
        </header>

        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-12 lg:gap-x-12">
          <Dish dish={a} n={1} className="md:col-span-7" ratio="aspect-[4/3]" />
          <Dish dish={b} n={2} className="md:col-span-5 md:mt-32" ratio="aspect-[4/5]" />
          <Dish dish={c} n={3} className="md:col-span-5 md:-mt-4" ratio="aspect-square" />
          <Dish dish={d} n={4} className="md:col-span-7 md:mt-24" ratio="aspect-[3/2]" />
        </div>
      </div>
    </section>
  );
}

/**
 * A pinned statement: on wide screens the section holds still while the words of the line arrive one
 * after another as you scroll (scroll-driven CSS, transform and opacity only). Elsewhere, or with
 * reduced motion, it is simply the finished line.
 */
export function Hearth() {
  const line = ["Everything", "tastes", "a", "little", "better", "over", "fire."];
  return (
    <section className="hearth" data-tone="dark" aria-labelledby="hearth-h">
      <div className="hearth-pin">
        <div className="hearth-photo">
          <div className="photo h-full">
            <Img id="embers" alt="" sizes="100vw" />
          </div>
        </div>
        <div className="hearth-veil" aria-hidden />
        <div className="hearth-glow" aria-hidden />
        <div className="wrap py-24 text-center">
          <p className="eyebrow">The hearth</p>
          <h2 id="hearth-h" className="display-xl hearth-line mx-auto mt-6 max-w-[14ch]">
            {line.map((w, n) => (
              <span key={w + n} className={`w ${w === "fire." ? "it" : ""}`} style={i(n)}>
                {w}
              </span>
            ))}
          </h2>
          <p className="hearth-sub lead mx-auto mt-8 max-w-[34rem]" style={{ color: "#d3d9cc" }}>
            Live oak, open flame and nothing hurried. Vegetables, bread, birds and steaks all spend
            time over the coals.
          </p>
        </div>
      </div>
    </section>
  );
}

/** The menu by the course: pick a category and the photograph beside it follows. */
export function MenuIndex() {
  const [hover, setHover] = useState(menuCategories[0]!.id);
  return (
    <section className="section panel-surface" aria-labelledby="index-h">
      <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <p className="eyebrow reveal">The menu</p>
          <h2 id="index-h" className="display-lg reveal mt-4">
            Start anywhere.
          </h2>
          <ul className="mt-10 border-t border-line">
            {menuCategories.map((c, n) => (
              <li key={c.id} className="border-b border-line">
                <Link
                  to="/menu"
                  search={{ c: c.id }}
                  className="group flex min-h-16 items-center gap-4 py-3.5"
                  onMouseEnter={() => setHover(c.id)}
                  onFocus={() => setHover(c.id)}
                >
                  <span className="numeral w-8 shrink-0">{String(n + 1).padStart(2, "0")}</span>
                  <span className="display-md flex-1 transition-transform duration-300 group-hover:translate-x-2 group-focus-visible:translate-x-2">
                    {c.name}
                  </span>
                  <span className="hidden text-sm text-muted sm:block">
                    {c.items.length} dishes
                  </span>
                  <ArrowUpRight size={22} className="shrink-0 text-accent-text" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative hidden lg:block" aria-hidden>
          <div className="photo sticky top-28 aspect-[4/5]">
            {menuCategories.map((c) => (
              <div
                key={c.id}
                className="fill absolute inset-0 transition-opacity duration-500"
                style={{ opacity: c.id === hover ? 1 : 0 }}
              >
                <Img id={c.image} alt="" sizes="40vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Online ordering, as a short promise and a way in. */
export function Takeout() {
  const steps = [
    {
      icon: HandPointing,
      title: "Pick your plates",
      text: "Browse the pickup menu and add what you like.",
    },
    { icon: Bag, title: "Check your order", text: "Change quantities and see a running total." },
    {
      icon: Timer,
      title: "Send it to the demo kitchen",
      text: "A sample checkout, clearly labeled. No payment is taken.",
    },
  ];
  return (
    <section className="panel-deep section" data-tone="dark" aria-labelledby="takeout-h">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="reveal">
          <p className="eyebrow">Order online</p>
          <h2 id="takeout-h" className="display-lg mt-4">
            Your favorites, <span className="it">ready to go.</span>
          </h2>
          <p className="lead mt-5">Bring a little Juniper &amp; Ember to your own table.</p>
          <ol className="mt-10 grid gap-6">
            {steps.map((s, n) => (
              <li key={s.title} className="grid grid-cols-[auto_1fr] gap-4">
                <span className="grid size-11 place-items-center rounded-full border border-line">
                  <s.icon size={22} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-xl">
                    <span className="numeral mr-2">{n + 1}.</span>
                    {s.title}
                  </p>
                  <p className="text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/order" className="btn btn-primary">
              Start a pickup order
              <ArrowRight size={18} className="nudge" aria-hidden />
            </Link>
            <Link to="/menu" className="btn btn-ghost">
              Read the menu
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">
            Demo ordering for a fictional restaurant: no payment is collected and nothing is sent to
            a kitchen.
          </p>
        </div>
        <div className="reveal-photo photo aspect-[4/3] lg:aspect-[5/4]">
          <Img
            id="dishDrumsticks"
            alt={alt.dishDrumsticks}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
