import { ArrowRight, MapPin, Phone } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

import { Img } from "@/components/img";
import { ReservationForm } from "@/components/reservation-form";
import { alt, occasions } from "@/data/photos";
import { hours, site } from "@/data/site";

/** The story in short: two photographs and the idea behind the restaurant. */
export function StoryTeaser() {
  return (
    <section className="section" aria-labelledby="story-h">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        <div className="relative pb-16 sm:pb-24">
          <div className="reveal-photo photo aspect-[4/5] w-[88%]">
            <Img
              id="terrace"
              alt={alt.terrace}
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{ objectPosition: "35% 50%" }}
            />
          </div>
          <div className="reveal-photo photo absolute bottom-0 right-0 aspect-[4/3] w-[58%] border-[6px] border-bg">
            <Img id="chefPlating" alt={alt.chefPlating} sizes="(min-width: 1024px) 24vw, 52vw" />
          </div>
        </div>
        <div className="reveal">
          <p className="eyebrow">Our story</p>
          <h2 id="story-h" className="display-lg mt-4">
            A neighborhood table, with a little more <span className="it">soul.</span>
          </h2>
          <p className="lead mt-6">
            Juniper &amp; Ember was imagined around a simple idea: food tastes better when it brings
            people together. Our kitchen celebrates seasonal ingredients, open-fire cooking and the
            small details that turn an ordinary dinner into a reason to gather.
          </p>
          <p className="mt-4 text-sm text-muted">
            Concept copy for a fictional restaurant. There is no real founder, chef or address
            behind it.
          </p>
          <Link to="/our-story" className="btn btn-ghost mt-8">
            A little more about us
            <ArrowRight size={18} className="nudge" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** The dining experience: three image-led panels that open on hover or focus. */
export function Occasions() {
  return (
    <section className="section-tight panel-surface" aria-labelledby="occasions-h">
      <div className="wrap">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">The experience</p>
          <h2 id="occasions-h" className="display-lg mt-4">
            More than a <span className="it">meal.</span>
          </h2>
        </div>
        <div className="panels mt-12">
          {occasions.map((o) => (
            <article key={o.id} className="panel" data-tone="dark">
              <div className="photo">
                <Img id={o.image} alt={alt[o.image]} sizes="(min-width: 1024px) 45vw, 100vw" />
              </div>
              <div className="panel-body">
                <h3 className="display-md">{o.title}</h3>
                <p className="mt-3 text-[#dfe4d8]">{o.line}</p>
                <Link to={o.to} className="text-link mt-3" style={{ color: "#efb095" }}>
                  {o.cta}
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReservationSection() {
  return (
    <section className="section" aria-labelledby="reserve-h" id="reserve">
      <div className="wrap grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="reveal lg:sticky lg:top-28">
          <p className="eyebrow">Reservations</p>
          <h2 id="reserve-h" className="display-lg mt-4">
            Your table is <span className="it">waiting.</span>
          </h2>
          <p className="lead mt-5">
            Planning a date night, a dinner with friends or just a good meal out? We would love to
            have you.
          </p>
          <ul className="mt-8 grid gap-3 text-muted">
            <li className="flex gap-3">
              <MapPin size={22} className="mt-0.5 shrink-0 text-accent-text" aria-hidden />
              Walk-ins are welcome at the bar, first come first served.
            </li>
            <li className="flex gap-3">
              <Phone size={22} className="mt-0.5 shrink-0 text-accent-text" aria-hidden />
              Prefer the phone? The sample number is {site.phoneDisplay}.
            </li>
          </ul>
        </div>
        <div className="reveal">
          <ReservationForm />
        </div>
      </div>
    </section>
  );
}

/** A brand statement in place of reviews: there are none to quote for a fictional restaurant. */
export function Statement() {
  return (
    <section className="panel-deep section" data-tone="dark" aria-label="Our promise">
      <div className="wrap reveal text-center">
        <p className="eyebrow">Our promise</p>
        <blockquote className="display-lg mx-auto mt-6 max-w-[22ch] !font-normal italic">
          Seasonal plates, wood-fired favorites and another reason to stay for one more bite.
        </blockquote>
        <p className="mt-8 text-sm text-muted">
          Concept copy for a fictional restaurant. There are no customer reviews here because there
          are no customers.
        </p>
      </div>
    </section>
  );
}

export function GalleryTeaser() {
  const tiles: {
    id: "drinkGimlet" | "privateTable" | "tBoneFlame" | "booths" | "dessertSkillet";
    cls: string;
    ratio: string;
  }[] = [
    { id: "drinkGimlet", cls: "col-span-6 md:col-span-3", ratio: "aspect-[4/5]" },
    { id: "privateTable", cls: "col-span-6 md:col-span-5 md:mt-16", ratio: "aspect-[4/3]" },
    { id: "tBoneFlame", cls: "col-span-6 md:col-span-4", ratio: "aspect-[1/1]" },
    { id: "booths", cls: "col-span-6 md:col-span-5 md:-mt-10", ratio: "aspect-[3/2]" },
    {
      id: "dessertSkillet",
      cls: "col-span-12 md:col-span-3 md:mt-10",
      ratio: "aspect-[4/3] md:aspect-[4/5]",
    },
  ];
  return (
    <section className="section" aria-labelledby="gallery-h">
      <div className="wrap">
        <header className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The room and the plate</p>
            <h2 id="gallery-h" className="display-lg mt-4">
              Look hungry <span className="it">yet?</span>
            </h2>
          </div>
          <Link to="/gallery" className="btn btn-ghost">
            See the experience
            <ArrowRight size={18} className="nudge" aria-hidden />
          </Link>
        </header>
        <div className="mt-12 grid grid-cols-12 gap-3 md:gap-5">
          {tiles.map((t) => (
            <div key={t.id} className={`reveal-photo ${t.cls}`}>
              <Link
                to="/gallery"
                aria-label={`Open the gallery: ${alt[t.id]}`}
                className={`photo zoom block ${t.ratio}`}
              >
                <Img id={t.id} alt="" sizes="(min-width: 768px) 40vw, 100vw" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VisitBlock() {
  return (
    <section className="section panel-surface" aria-labelledby="visit-h">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="reveal">
          <p className="eyebrow">Visit us</p>
          <h2 id="visit-h" className="display-lg mt-4">
            Easy to find, hard to <span className="it">leave.</span>
          </h2>
          <address className="mt-6 font-display text-2xl leading-snug">
            {site.address.line1}
            <br />
            {site.address.line2}
          </address>
          <ul className="hours-list mt-6 max-w-md">
            {hours.map((h) => (
              <li key={h.label}>
                <span className="font-bold">{h.label}</span>
                <span className="text-right text-muted">{h.display}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">
            Sample hours. We do not claim to be open right now, and this fictional restaurant cannot
            seat you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.mapUrl} target="_blank" rel="noreferrer" className="btn btn-solid">
              <MapPin size={18} aria-hidden />
              Get directions
              <span className="sr-only"> (opens Google Maps in a new tab)</span>
            </a>
            <Link to="/reservations" className="btn btn-ghost">
              Reserve a table
            </Link>
            <Link to="/contact" className="text-link ml-1">
              Contact details
            </Link>
          </div>
        </div>
        <div className="reveal-photo photo aspect-[4/3]">
          <Img id="booths" alt={alt.booths} sizes="(min-width: 1024px) 55vw, 100vw" />
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section
      data-tone="dark"
      className="hero hero-sm relative"
      style={{ minHeight: "clamp(30rem, 78svh, 44rem)" } as CSSProperties}
      aria-labelledby="final-h"
    >
      <div className="hero-media" style={{ viewTransitionName: "none" } as CSSProperties}>
        <div className="photo h-full">
          <Img
            id="dateNight"
            alt={alt.dateNight}
            sizes="100vw"
            style={{ objectPosition: "50% 35%" }}
          />
        </div>
      </div>
      <div className="hero-scrim" aria-hidden />
      <div className="wrap reveal pb-16 pt-24 text-center">
        <h2 id="final-h" className="display-xl mx-auto max-w-[14ch]">
          Good food. Good company. Your <span className="it">table?</span>
        </h2>
        <p className="lead mx-auto mt-5" style={{ color: "#e6eadf" }}>
          Make a night of it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/reservations" className="btn btn-primary">
            Reserve a table
          </Link>
          <Link to="/menu" className="btn btn-ghost">
            View the menu
          </Link>
        </div>
      </div>
    </section>
  );
}
