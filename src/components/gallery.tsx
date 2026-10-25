import { ArrowLeft, ArrowRight, MagnifyingGlassPlus, X } from "@phosphor-icons/react";
import { useState, type KeyboardEvent } from "react";

import { alt, type GalleryPhoto } from "@/data/photos";

import { Img } from "./img";
import { Sheet } from "./sheet";

/**
 * The gallery as a mosaic of mixed shapes with a lightbox. The lightbox is a native modal dialog:
 * Escape closes it, focus is trapped while it is open and returns to the photograph you opened, and
 * the arrow keys (or the buttons) move between photographs.
 */
export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? null : photos[open];

  const step = (by: number) =>
    setOpen((i) => (i === null ? null : (i + by + photos.length) % photos.length));

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  }

  return (
    <>
      <div className="mosaic-wrap">
        <ul className="mosaic">
          {photos.map((p, i) => (
            <li key={p.id} className="contents">
              <button
                type="button"
                className="tile reveal-photo"
                data-shape={p.shape}
                aria-label={`Open photo: ${alt[p.id]}`}
                aria-haspopup="dialog"
                onClick={() => setOpen(i)}
              >
                <Img
                  id={p.id}
                  alt=""
                  sizes={
                    p.shape === "cine"
                      ? "(min-width: 768px) 66vw, 100vw"
                      : p.shape === "wide"
                        ? "(min-width: 768px) 50vw, 100vw"
                        : "(min-width: 768px) 33vw, 50vw"
                  }
                />
                <span className="tile-cap">
                  <span>{p.caption}</span>
                  <MagnifyingGlassPlus size={22} aria-hidden />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Sheet open={open !== null} onClose={() => setOpen(null)} side="full" label="Photo viewer">
        {current && (
          <div className="lightbox" onKeyDown={onKeyDown}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold tabular-nums" aria-live="polite">
                {(open ?? 0) + 1} of {photos.length}
              </p>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setOpen(null)}
                aria-label="Close photo viewer"
              >
                <X size={24} aria-hidden />
              </button>
            </div>
            <div className="lightbox-stage">
              <Img key={current.id} id={current.id} alt={alt[current.id]} sizes="100vw" priority />
              <button
                type="button"
                className="lightbox-nav icon-btn left-0"
                onClick={() => step(-1)}
                aria-label="Previous photo"
              >
                <ArrowLeft size={22} aria-hidden />
              </button>
              <button
                type="button"
                className="lightbox-nav icon-btn right-0"
                onClick={() => step(1)}
                aria-label="Next photo"
              >
                <ArrowRight size={22} aria-hidden />
              </button>
            </div>
            <p className="text-center font-display text-xl italic">{current.caption}</p>
          </div>
        )}
      </Sheet>
    </>
  );
}
