import { createFileRoute } from "@tanstack/react-router";

import { Facts, HomeHero } from "@/components/home-top";
import { Hearth, MenuIndex, Signature, Takeout } from "@/components/home-food";
import {
  FinalCta,
  GalleryTeaser,
  Occasions,
  ReservationSection,
  Statement,
  StoryTeaser,
  VisitBlock,
} from "@/components/home-place";
import { preloadImage } from "@/lib/preload";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Juniper & Ember | Wood-fired American kitchen in Austin, Texas (concept)",
      description:
        "Seasonal plates, wood-fired favorites and good company in Austin, Texas. Explore the menu, reserve a table or order for pickup. A fictional restaurant concept made as a design demo.",
      image: "home",
      path: "/",
    }),
  loader: () => {
    preloadImage("heroTable", "100vw");
  },
  component: Home,
});

function Home() {
  return (
    <>
      <HomeHero />
      <Facts />
      <Signature />
      <Hearth />
      <MenuIndex />
      <StoryTeaser />
      <Occasions />
      <ReservationSection />
      <Takeout />
      <GalleryTeaser />
      <Statement />
      <VisitBlock />
      <FinalCta />
    </>
  );
}
