import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHero } from "@/components/page-hero";
import { ReservationForm } from "@/components/reservation-form";
import { hours, site } from "@/data/site";
import { preloadImage } from "@/lib/preload";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/reservations")({
  head: () =>
    seo({
      title: "Reserve a table | Juniper & Ember (concept)",
      description:
        "Request a table at the fictional Juniper & Ember. A demo form that checks your details and says clearly that no real reservation is made.",
      image: "reservations",
      path: "/reservations",
    }),
  loader: () => {
    preloadImage("dateNight", "100vw");
  },
  component: ReservationsPage,
});

function ReservationsPage() {
  return (
    <>
      <PageHero
        image="dateNight"
        focus="50% 30%"
        eyebrow="Reservations"
        title={
          <>
            Your table is <span className="it">waiting.</span>
          </>
        }
      />
      <section className="section-tight">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <ReservationForm />
          <aside className="grid gap-8 lg:sticky lg:top-28">
            <p className="lead">
              Planning a date night, a dinner with friends or just a good meal out? We would love to
              have you.
            </p>
            <div>
              <h2 className="eyebrow">Hours (sample)</h2>
              <ul className="hours-list mt-4">
                {hours.map((h) => (
                  <li key={h.label}>
                    <span className="font-bold">{h.label}</span>
                    <span className="text-right text-muted">{h.display}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow">Good to know</h2>
              <ul className="mt-4 grid gap-3 text-muted">
                <li>Walk-ins are welcome at the bar, first come first served.</li>
                <li>
                  Parties of nine or more:{" "}
                  <Link to="/contact" className="underline underline-offset-4">
                    ask about private dining
                  </Link>
                  .
                </li>
                <li>
                  Prefer the phone? The sample number is {site.phoneDisplay}, a number that cannot
                  ring.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
