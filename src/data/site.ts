/**
 * Site-wide facts and copy. Juniper & Ember is a fictional restaurant made for a design portfolio:
 * the address, phone number, hours and every dish are sample content, not a real business.
 */

/** Injected at build time from the deployment domain (see scripts/site-origin.mjs). */
export const SITE_URL: string = import.meta.env.VITE_SITE_URL;

/** The restaurant is fictional, so no page asks search engines to index it. Flip to allow indexing. */
export const INDEXABLE = false;

export const site = {
  name: "Juniper & Ember",
  tagline: "Good food. Good company. Stay awhile.",
  city: "Austin, Texas",
  address: { line1: "1204 East 6th Street", line2: "Austin, TX 78702" },
  /** A 555-01xx number is reserved for fiction: it cannot ring a real phone. */
  phoneDisplay: "(512) 555-0141",
  phoneHref: "+15125550141",
  /** A reserved .example address: it cannot receive mail. */
  email: "hello@juniperandember.example",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=1204+East+6th+Street+Austin+TX+78702",
} as const;

export const CONCEPT_NOTE =
  "Juniper & Ember is a fictional restaurant made for a design portfolio. The address, hours, menu and prices are sample content, and nothing on this site books a table or places an order.";

/** Largest party the online request form takes. Bigger groups are pointed to private dining. */
export const PARTY_MAX = 8;

/** Sample sales tax shown as an estimate in the demo checkout (8.25 percent, as in Austin). */
export const TAX_RATE = 0.0825;

export type Daypart = { label: string; opens: string; lastSeating: string };

/**
 * Sample opening hours. `days` are JavaScript weekday numbers (0 is Sunday). Kitchen service is
 * listed as dayparts so the reservation form can offer only times that fit the day.
 */
export const hours: {
  label: string;
  days: number[];
  dayparts: Daypart[];
  display: string;
}[] = [
  {
    label: "Monday to Thursday",
    days: [1, 2, 3, 4],
    dayparts: [{ label: "Dinner", opens: "17:00", lastSeating: "21:30" }],
    display: "5 to 10 PM",
  },
  {
    label: "Friday and Saturday",
    days: [5, 6],
    dayparts: [{ label: "Dinner", opens: "17:00", lastSeating: "22:30" }],
    display: "5 to 11 PM",
  },
  {
    label: "Sunday",
    days: [0],
    dayparts: [
      { label: "Brunch", opens: "10:00", lastSeating: "13:30" },
      { label: "Dinner", opens: "17:00", lastSeating: "20:30" },
    ],
    display: "Brunch 10 AM to 2 PM, dinner 5 to 9 PM",
  },
];

export type LinkTarget = {
  to:
    | "/"
    | "/menu"
    | "/order"
    | "/our-story"
    | "/gallery"
    | "/contact"
    | "/reservations"
    | "/privacy";
  label: string;
};

export const nav: LinkTarget[] = [
  { to: "/menu", label: "Menu" },
  { to: "/our-story", label: "Our Story" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Visit Us" },
];
