import { ArrowRight, CalendarBlank, Clock, Fire, MapPin } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

import { alt } from "@/data/photos";
import { hours, site } from "@/data/site";

import { Img } from "./img";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** The first screen: one photograph of a long table, the promise, and the three things to do. */
export function HomeHero() {
  return (
    <section data-hero data-tone="dark" className="hero">
      <div className="hero-media hero-drift">
        <div className="photo settle h-full">
          <Img
            id="heroTable"
            alt={alt.heroTable}
            sizes="100vw"
            priority
            style={{ objectPosition: "50% 42%" }}
          />
        </div>
      </div>
      <div className="hero-scrim" aria-hidden />
      <div className="wrap hero-copy hero-out">
        <p className="eyebrow rise" style={{ color: "#efb095" }}>
          Seasonal cooking · Neighborhood spirit
        </p>
        <h1 className="display-xl words mt-5 max-w-[11ch]">
          {["Come", "hungry."].map((w, n) => (
            <span key={w}>
              <span className="w" style={i(n)}>
                {w}
              </span>{" "}
            </span>
          ))}
          <br />
          {["Leave", "a", "little"].map((w, n) => (
            <span key={w}>
              <span className="w" style={i(n + 2)}>
                {w}
              </span>{" "}
            </span>
          ))}
          <span className="w it" style={i(5)}>
            happier.
          </span>
        </h1>

        <div className="rise mt-9 flex flex-wrap items-center gap-3" style={i(6)}>
          <Link to="/menu" className="btn btn-primary">
            Explore the menu
            <ArrowRight size={18} className="nudge" aria-hidden />
          </Link>
          <Link to="/reservations" className="btn btn-ghost">
            Reserve a table
          </Link>
        </div>
      </div>
    </section>
  );
}

/** The practical facts straight after the hero, as a ruled row rather than a set of cards. */
export function Facts() {
  return (
    <section aria-label="Visiting at a glance" className="wrap">
      <div className="facts">
        <div className="reveal">
          <p className="eyebrow flex items-center gap-2">
            <MapPin size={16} aria-hidden /> Find us
          </p>
          <address className="mt-3 font-display text-2xl leading-snug">
            {site.address.line1}
            <br />
            {site.address.line2}
          </address>
          <a href={site.mapUrl} target="_blank" rel="noreferrer" className="text-link mt-1">
            Get directions
            <span className="sr-only"> (opens Google Maps in a new tab)</span>
          </a>
        </div>
        <div className="reveal" style={{ animationDelay: "60ms" }}>
          <p className="eyebrow flex items-center gap-2">
            <Clock size={16} aria-hidden /> Hours
          </p>
          <ul className="mt-3 space-y-1 text-[0.98rem]">
            {hours.map((h) => (
              <li key={h.label}>
                <span className="font-bold">{h.label}</span>
                <br />
                <span className="text-muted">{h.display}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal" style={{ animationDelay: "120ms" }}>
          <p className="eyebrow flex items-center gap-2">
            <Fire size={16} aria-hidden /> The table
          </p>
          <p className="mt-3 font-display text-2xl leading-snug">
            Wood-fired comfort food, made for sharing.
          </p>
          <p className="mt-1 text-muted">Casual and lively. Walk-ins welcome at the bar.</p>
        </div>
        <div className="reveal" style={{ animationDelay: "180ms" }}>
          <p className="eyebrow flex items-center gap-2">
            <CalendarBlank size={16} aria-hidden /> Reservations
          </p>
          <p className="mt-3 font-display text-2xl leading-snug">Plan ahead for weekends.</p>
          <p className="text-muted">Parties of up to eight can request a table online.</p>
          <Link to="/reservations" className="text-link mt-1">
            Reserve a table
          </Link>
        </div>
      </div>
      <p className="py-4 text-sm text-muted">
        Sample details for a fictional restaurant. Not a real business, and no live opening status
        or availability is shown.
      </p>
    </section>
  );
}
