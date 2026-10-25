import { createFileRoute, Link } from "@tanstack/react-router";

import { CartView } from "@/components/cart-view";
import { MenuBrowser } from "@/components/menu-browser";
import { PageHero } from "@/components/page-hero";
import { formatUSD } from "@/lib/cart";
import { useCart } from "@/lib/use-cart";
import { preloadImage } from "@/lib/preload";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/order")({
  head: () =>
    seo({
      title: "Order for pickup | Juniper & Ember (concept)",
      description:
        "Build a sample pickup order from the fictional Juniper & Ember menu. A demo checkout: nothing is charged and no order is placed.",
      image: "order",
      path: "/order",
    }),
  loader: () => {
    preloadImage("dishDrumsticks", "100vw");
  },
  component: OrderPage,
});

function OrderPage() {
  const { count, subtotal, openCart } = useCart();
  return (
    <>
      <PageHero
        image="dishDrumsticks"
        focus="50% 55%"
        eyebrow="Order online"
        title={
          <>
            Your favorites, <span className="it">ready to go.</span>
          </>
        }
      />
      <section className={`section-tight ${count > 0 ? "pb-28 lg:pb-16" : ""}`}>
        <div className="wrap">
          <p className="notice mb-10 max-w-3xl">
            <strong>Demo ordering.</strong> Pickup only, ready in about 20 minutes (a sample
            estimate). No payment is collected and no order is sent to a kitchen, because this
            restaurant is fictional.
          </p>
          <div className="order-grid">
            <MenuBrowser mode="order" />
            <aside className="order-side hidden lg:block" aria-label="Your order">
              <div className="ticket flex max-h-[calc(100dvh-8rem)] flex-col overflow-hidden">
                <h2 className="display-sm border-b border-line px-5 py-4">Your order</h2>
                <CartView />
              </div>
            </aside>
          </div>
          <p className="mt-12">
            <Link to="/reservations" className="text-link">
              Dining in instead? Reserve a table
            </Link>
          </p>
        </div>
      </section>

      {count > 0 && (
        <div className="order-bar lg:hidden">
          <button
            type="button"
            className="btn btn-primary w-full justify-between"
            onClick={openCart}
          >
            <span>View order ({count})</span>
            <span>{formatUSD(subtotal)}</span>
          </button>
        </div>
      )}
    </>
  );
}
