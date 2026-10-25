import { Clock, Envelope, MapPin, NavigationArrow, Phone } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { hours, site } from "@/data/site";
import { preloadImage } from "@/lib/preload";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Visit us | Juniper & Ember, East 6th Street, Austin (concept)",
      description:
        "Sample address, hours and contact details for the fictional Juniper & Ember in Austin, Texas, plus directions and a demo enquiry form.",
      image: "contact",
      path: "/contact",
    }),
  loader: () => {
    preloadImage("booths", "100vw");
  },
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        image="booths"
        focus="50% 70%"
        eyebrow="Visit us"
        title={
          <>
            Come find us on East <span className="it">6th.</span>
          </>
        }
      />
      <section className="section-tight">
        <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="grid content-start gap-10">
            <p className="lead">Every detail below is sample content for a fictional restaurant.</p>
            <div className="reveal">
              <h2 className="eyebrow flex items-center gap-2">
                <MapPin size={16} aria-hidden /> Address (sample)
              </h2>
              <address className="mt-3 font-display text-3xl leading-snug">
                {site.address.line1}
                <br />
                {site.address.line2}
              </address>
              <a href={site.mapUrl} target="_blank" rel="noreferrer" className="btn btn-solid mt-5">
                <NavigationArrow size={18} aria-hidden />
                Get directions
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
              <p className="mt-3 text-sm text-muted">
                The link opens a map search for the sample address. It does not point to a real
                restaurant.
              </p>
            </div>
            <div className="reveal">
              <h2 className="eyebrow flex items-center gap-2">
                <Clock size={16} aria-hidden /> Hours (sample)
              </h2>
              <ul className="hours-list mt-4 max-w-md">
                {hours.map((h) => (
                  <li key={h.label}>
                    <span className="font-bold">{h.label}</span>
                    <span className="text-right text-muted">{h.display}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted">We do not claim to be open right now.</p>
            </div>
            <div className="reveal">
              <h2 className="eyebrow">Contact (demo)</h2>
              <ul className="mt-4 grid gap-2">
                <li className="flex items-center gap-3">
                  <Phone size={20} className="text-accent-text" aria-hidden />
                  <span>
                    {site.phoneDisplay}{" "}
                    <span className="text-muted">(a number that cannot ring)</span>
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Envelope size={20} className="text-accent-text" aria-hidden />
                  <span>
                    {site.email} <span className="text-muted">(cannot receive mail)</span>
                  </span>
                </li>
              </ul>
            </div>
            <div className="reveal panel-deep p-6 sm:p-8" data-tone="dark">
              <h2 className="display-sm">Private dining</h2>
              <p className="mt-3 text-muted">
                A back room that would seat up to 24 for birthdays, team dinners and small
                celebrations. Send an enquiry, or reserve a table for a smaller group.
              </p>
              <Link to="/reservations" className="btn btn-primary mt-5">
                Reserve a table
              </Link>
            </div>
          </div>
          <div className="reveal">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
