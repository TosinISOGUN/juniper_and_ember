import { createFileRoute, Link } from "@tanstack/react-router";

import { Gallery } from "@/components/gallery";
import { PageHero } from "@/components/page-hero";
import { galleryPhotos } from "@/data/photos";
import { preloadImage } from "@/lib/preload";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () =>
    seo({
      title: "Gallery | Juniper & Ember (concept)",
      description:
        "Food, room and atmosphere from the fictional Juniper & Ember: a curated spread of the plates, the fire and the long tables.",
      image: "gallery",
      path: "/gallery",
    }),
  loader: () => {
    preloadImage("terrace", "100vw");
  },
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHero
        image="terrace"
        focus="50% 60%"
        eyebrow="Gallery"
        title={
          <>
            The room, the fire, the <span className="it">plate.</span>
          </>
        }
      />
      <section className="section-tight">
        <div className="wrap">
          <p className="mb-8 max-w-2xl text-muted">
            Photographs are licensed stock chosen to set the mood. Select any one to see it larger;
            the arrow keys work too.
          </p>
          <Gallery photos={galleryPhotos} />
          <div className="reveal mt-16 text-center">
            <h2 className="display-md">
              See it in <span className="it">person.</span>
            </h2>
            <p className="lead mx-auto mt-3">
              If this were a real restaurant, this is where you would book.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/reservations" className="btn btn-primary">
                Reserve a table
              </Link>
              <Link to="/menu" className="btn btn-ghost">
                Read the menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
