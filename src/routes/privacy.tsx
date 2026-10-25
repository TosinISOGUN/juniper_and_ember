import { createFileRoute, Link } from "@tanstack/react-router";

import { CONCEPT_NOTE } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo({
      title: "Privacy | Juniper & Ember (concept)",
      description:
        "What this fictional restaurant's demo site does and does not do with the details you type into its forms.",
      image: "privacy",
      path: "/privacy",
    }),
  component: Privacy,
});

function Privacy() {
  return (
    <section className="wrap pb-24 pt-[calc(var(--nav-h)+3rem)]">
      <p className="eyebrow">Privacy</p>
      <h1 className="display-lg mt-3 max-w-[18ch]">Short, because there is nothing to collect.</h1>
      <p className="notice mt-8 max-w-3xl">{CONCEPT_NOTE}</p>
      <div className="mt-10 grid max-w-3xl gap-8">
        <div>
          <h2 className="display-sm">The forms</h2>
          <p className="mt-2 text-muted">
            The reservation, pickup and enquiry forms check what you type in your browser and then
            stop. There is no server behind them: nothing is sent, emailed or saved, and nobody
            reads it.
          </p>
        </div>
        <div>
          <h2 className="display-sm">Your pickup order</h2>
          <p className="mt-2 text-muted">
            The items in your demo order are kept in the page&apos;s memory only. Reload the page
            and the order is empty again.
          </p>
        </div>
        <div>
          <h2 className="display-sm">What is stored in your browser</h2>
          <p className="mt-2 text-muted">
            One small preference: whether you chose the dark or the light theme, kept under the name
            juniper-ember-theme in local storage so the page does not flash when you return. It
            never leaves your device.
          </p>
        </div>
        <div>
          <h2 className="display-sm">Cookies, analytics and third parties</h2>
          <p className="mt-2 text-muted">
            None. Fonts and photographs are served from this site. The only outside link is the
            directions button, which opens a map search in a new tab when you click it.
          </p>
        </div>
        <div>
          <h2 className="display-sm">If this were a real restaurant</h2>
          <p className="mt-2 text-muted">
            A real site would need a real policy: what it collects, why, who processes it (a
            reservation provider, for example) and how to ask for it to be removed. This page would
            be replaced with that.
          </p>
        </div>
      </div>
      <p className="mt-12">
        <Link to="/" className="text-link">
          Back to the homepage
        </Link>
      </p>
    </section>
  );
}
