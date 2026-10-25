import type { CSSProperties, ReactNode } from "react";

import type { ImageId } from "@/data/images.generated";
import { alt } from "@/data/photos";

import { Img } from "./img";

type Props = {
  image: ImageId;
  eyebrow: string;
  title: ReactNode;
  text?: string;
  /** CSS object-position for the photograph, to keep the subject clear of the type. */
  focus?: string;
  children?: ReactNode;
};

/**
 * The opening of every page with a photograph: a full-bleed picture, a short block of type and
 * (optionally) actions. The photograph keeps evening colours in both themes so the type stays legible.
 */
export function PageHero({ image, eyebrow, title, text, focus = "50% 50%", children }: Props) {
  return (
    <section data-hero data-tone="dark" className="hero hero-sm">
      <div className="hero-media hero-drift">
        <div className="photo settle h-full">
          <Img
            id={image}
            alt={alt[image]}
            sizes="100vw"
            priority
            style={{ objectPosition: focus } as CSSProperties}
          />
        </div>
      </div>
      <div className="hero-scrim" aria-hidden />
      <div className="wrap hero-copy hero-out">
        <p className="eyebrow rise">{eyebrow}</p>
        <h1 className="display-lg rise mt-4 max-w-[16ch]" style={{ "--i": 1 } as CSSProperties}>
          {title}
        </h1>
        {text && (
          <p className="lead rise mt-5" style={{ "--i": 2, color: "#e1e6db" } as CSSProperties}>
            {text}
          </p>
        )}
        {children && (
          <div
            className="rise mt-7 flex flex-wrap items-center gap-3"
            style={{ "--i": 3 } as CSSProperties}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
