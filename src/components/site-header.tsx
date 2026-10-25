import { CalendarBlank, List, ShoppingBag } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { nav, site } from "@/data/site";
import { useCart } from "@/lib/use-cart";

import { Wordmark } from "./brand";
import { Sheet } from "./sheet";
import { ThemeToggle } from "./theme-toggle";

/**
 * Fixed header. It is transparent at the top of the page (light type over a photograph, theme
 * colours elsewhere) and gains a solid surface once the page scrolls, detected with an
 * IntersectionObserver sentinel rather than a scroll listener.
 */
export function SiteHeader() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry?.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute top-0 h-px w-px" />
      <header data-site-header data-top={scrolled ? undefined : ""}>
        <div className="wrap flex h-full items-center justify-between gap-4">
          <Link to="/" aria-label={`${site.name}, home`}>
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <div className="max-[399px]:hidden">
              <ThemeToggle />
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-sm hidden lg:inline-flex"
              onClick={openCart}
              aria-haspopup="dialog"
            >
              <ShoppingBag size={18} aria-hidden />
              Order
              {count > 0 && <span className="sr-only">, {count} items in your order</span>}
              {count > 0 && (
                <span
                  aria-hidden
                  key={count}
                  className="pop -mr-1 grid h-5 min-w-5 place-items-center rounded-full bg-btn px-1 text-[0.68rem] font-extrabold text-on-accent"
                >
                  {count}
                </span>
              )}
            </button>
            <Link to="/reservations" className="btn btn-primary btn-sm ml-1 hidden lg:inline-flex">
              <CalendarBlank size={18} aria-hidden />
              Reserve
            </Link>
            <button
              type="button"
              className="icon-btn lg:hidden"
              aria-label={`Your order, ${count} ${count === 1 ? "item" : "items"}`}
              aria-haspopup="dialog"
              onClick={openCart}
            >
              <ShoppingBag size={24} aria-hidden />
              {count > 0 && (
                <span aria-hidden key={count} className="badge pop">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              className="icon-btn lg:hidden"
              aria-label="Open menu"
              aria-haspopup="dialog"
              onClick={() => setMenuOpen(true)}
            >
              <List size={26} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <Sheet
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        side="full"
        label="Site menu"
        title="Menu"
      >
        <nav aria-label="Site" className="flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-4">
          <ul className="divide-y divide-line">
            {[{ to: "/", label: "Home" }, ...nav].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to as "/"}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-16 items-center font-display text-[2.1rem]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-10">
            <Link to="/reservations" onClick={() => setMenuOpen(false)} className="btn btn-primary">
              Reserve a table
            </Link>
            <Link to="/order" onClick={() => setMenuOpen(false)} className="btn btn-ghost">
              Order online for pickup
            </Link>
            <div className="flex items-center gap-2 pt-2 text-sm text-[#cfd5c8] min-[400px]:hidden">
              <ThemeToggle />
              <span>Switch between dark and light</span>
            </div>
            <p className="pt-2 text-sm text-[#cfd5c8]">
              {site.address.line1}, {site.address.line2}. Sample details for a fictional concept.
            </p>
          </div>
        </nav>
      </Sheet>
    </>
  );
}
