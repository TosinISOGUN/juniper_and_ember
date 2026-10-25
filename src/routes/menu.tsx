import { createFileRoute, Link } from "@tanstack/react-router";

import { MenuBrowser } from "@/components/menu-browser";
import { PageHero } from "@/components/page-hero";
import { preloadImage } from "@/lib/preload";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>): { c?: string } =>
    typeof search["c"] === "string" ? { c: search["c"] } : {},
  head: () =>
    seo({
      title: "Menu | Juniper & Ember, Austin TX (concept)",
      description:
        "The full sample menu of a fictional Austin restaurant: shareables, wood-fired mains, salads, sides, desserts and handcrafted drinks, with sample prices.",
      image: "menu",
      path: "/menu",
    }),
  loader: () => {
    preloadImage("tBoneFlame", "100vw");
  },
  component: MenuPage,
});

function MenuPage() {
  const { c } = Route.useSearch();
  return (
    <>
      <PageHero
        image="tBoneFlame"
        focus="50% 60%"
        eyebrow="The menu"
        title={
          <>
            From the <span className="it">fire.</span>
          </>
        }
      >
        <Link to="/reservations" className="btn btn-primary">
          Reserve a table
        </Link>
        <Link to="/order" className="btn btn-ghost">
          Order for pickup
        </Link>
      </PageHero>
      <div className="pb-24 lg:pb-32">
        <MenuBrowser initial={c} />
      </div>
    </>
  );
}
