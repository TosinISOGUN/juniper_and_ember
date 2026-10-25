import { createFileRoute, Link } from "@tanstack/react-router";

import { Img } from "@/components/img";
import { PageHero } from "@/components/page-hero";
import { alt } from "@/data/photos";
import { preloadImage } from "@/lib/preload";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/our-story")({
  head: () =>
    seo({
      title: "Our story | Juniper & Ember (concept)",
      description:
        "The idea behind the fictional Juniper & Ember: seasonal ingredients, open-fire cooking and hospitality that makes people stay awhile.",
      image: "our-story",
      path: "/our-story",
    }),
  loader: () => {
    preloadImage("chefPlating", "100vw");
  },
  component: OurStory,
});

const values = [
  {
    title: "Fire first",
    text: "An oak-burning hearth anchors the kitchen. Vegetables, bread, birds and steaks all spend time over live embers, and it is the flavor everything else is built around.",
  },
  {
    title: "Season-led",
    text: "The menu shifts with the market. When the squash runs out, the squash runs out, and something better takes its place.",
  },
  {
    title: "Hospitality that lingers",
    text: "Success is measured in how long people stay, not how fast tables turn. Linger over dessert. Order another bottle. Stay awhile.",
  },
];

function OurStory() {
  return (
    <>
      <PageHero
        image="chefPlating"
        focus="50% 40%"
        eyebrow="Our story"
        title={
          <>
            A neighborhood table, with a little more <span className="it">soul.</span>
          </>
        }
      />

      <section className="section">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div className="reveal-photo photo aspect-[4/3]">
            <Img id="terrace" alt={alt.terrace} sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
          <div className="reveal">
            <p className="eyebrow">Concept copy</p>
            <h2 className="display-md mt-4">
              Imagined around one simple <span className="it">idea.</span>
            </h2>
            <div className="mt-6 grid gap-4 text-muted">
              <p>
                Juniper &amp; Ember was imagined around a simple idea: food tastes better when it
                brings people together. Our kitchen celebrates seasonal ingredients, open-fire
                cooking and the small details that turn an ordinary dinner into a reason to gather.
              </p>
              <p>
                The name says it all. The juniper is the evergreen that stays green through every
                season; the ember is the low, steady heat that everything on the menu leans toward.
                Between the two is where we like to cook, and where we hope you like to eat.
              </p>
              <p className="text-sm italic">
                This story is concept copy written for a fictional restaurant. There is no real
                founder, chef or location behind it.
              </p>
            </div>
            <Link to="/menu" className="btn btn-primary mt-8">
              See what we would cook for you
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tight panel-surface" aria-labelledby="values-h">
        <div className="wrap">
          <h2 id="values-h" className="eyebrow reveal">
            What guides the kitchen
          </h2>
          <ol className="mt-8 border-t border-line">
            {values.map((v, n) => (
              <li
                key={v.title}
                className="reveal grid gap-4 border-b border-line py-10 md:grid-cols-[6rem_1fr_1.2fr] md:gap-10"
              >
                <span className="numeral text-3xl">{String(n + 1).padStart(2, "0")}</span>
                <h3 className="display-md">{v.title}</h3>
                <p className="text-muted">{v.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="hearth"
        data-tone="dark"
        style={{ position: "relative" }}
        aria-labelledby="kitchen-h"
      >
        <div className="hearth-pin" style={{ minHeight: "min(90svh, 52rem)" }}>
          <div className="hearth-photo">
            <div className="photo h-full">
              <Img id="embers" alt="" sizes="100vw" />
            </div>
          </div>
          <div className="hearth-veil" aria-hidden />
          <div className="wrap reveal py-24">
            <p className="eyebrow">The kitchen</p>
            <h2 id="kitchen-h" className="display-lg mt-4 max-w-[16ch]">
              Everything tastes a little better over <span className="it">fire.</span>
            </h2>
            <p className="lead mt-6" style={{ color: "#d3d9cc" }}>
              There is no secret beyond patience: a hearth stoked before service, a menu written
              around what is good right now, and a team that would rather bring you one more plate
              than rush you out the door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/reservations" className="btn btn-primary">
                Reserve a table
              </Link>
              <Link to="/gallery" className="btn btn-ghost">
                See the experience
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
