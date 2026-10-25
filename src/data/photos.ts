import type { ImageId } from "@/data/images.generated";

/**
 * Alt text for every photograph, so a picture is described the same way wherever it appears.
 * The photographs are licensed stock (see ASSETS.md) and do not show a real restaurant.
 */
export const alt: Record<ImageId, string> = {
  booths:
    "Teal leather banquettes under warm wood paneling in a dining room with small wooden tables",
  brunchTable: "Friends reaching across a bright table of shared brunch dishes and orange juice",
  chefPlating: "A chef in whites finishing a plated dish at a steel counter",
  dateNight: "A smiling couple sharing plates of pasta at a restaurant table",
  dessertSkillet: "A skillet brownie topped with ice cream and melted chocolate on a wooden board",
  dishBeets: "Sliced roasted beets with greens and crumbled cheese on a wooden board",
  dishBrussels: "Roasted brussels sprouts with browned edges in a cast iron skillet",
  dishBurger: "A double cheeseburger with melted cheddar running down the patties",
  dishChicken: "A roast chicken being carved at the table with a fork and knife",
  dishDrumsticks: "Roasted chicken drumsticks glistening in a black cast iron pan",
  dishSalad: "A salad of crisp greens with walnuts and crumbled white cheese",
  drinkBar: "Three cocktails on a dark bar: one green, one in a coupe and one orange",
  drinkGimlet: "A pale green gimlet in a coupe glass with lime slices against a dark green ground",
  embers: "A cut of beef searing on a grill above glowing wood embers",
  friendsLunch: "Three friends laughing over shared plates at a table beside an outdoor oven",
  heroTable: "Friends around a long candlelit table at dinner, with wine glasses and shared plates",
  privateTable: "A long dining table set with plates, wine glasses and a tall candlestick",
  sharingHands: "Hands reaching across a candlelit table for shared plates, mussels and wine",
  tBoneFlame: "A thick T-bone steak on the fire with flames curling around its edge",
  terrace: "A restaurant terrace at dusk with wicker chairs, set tables and glowing lamps",
};

export interface GalleryPhoto {
  id: ImageId;
  caption: string;
  /** Shape of the tile in the mosaic. */
  shape: "wide" | "cine" | "square";
}

/** The gallery, in reading order. The mosaic places each tile by its shape. */
export const galleryPhotos: GalleryPhoto[] = [
  { id: "heroTable", caption: "A long table, a lot of candles.", shape: "wide" },
  { id: "tBoneFlame", caption: "Oak-fired, hard and fast.", shape: "wide" },
  { id: "dishBurger", caption: "The Ember-Grilled Double Cheeseburger.", shape: "square" },
  { id: "drinkGimlet", caption: "The Juniper Gimlet, our house pour.", shape: "square" },
  { id: "dishBrussels", caption: "Brussels sprouts with hot honey.", shape: "square" },
  { id: "sharingHands", caption: "Order for the middle of the table.", shape: "cine" },
  { id: "dessertSkillet", caption: "Skillet brownie, made for two.", shape: "square" },
  { id: "drinkBar", caption: "Three ways to start the evening.", shape: "square" },
  { id: "terrace", caption: "The patio, once the lamps come on.", shape: "cine" },
  { id: "booths", caption: "Banquettes built for lingering.", shape: "wide" },
  { id: "chefPlating", caption: "The last touch before it leaves the pass.", shape: "wide" },
  { id: "dishChicken", caption: "Wood-fired chicken, carved at the table.", shape: "square" },
  { id: "dishSalad", caption: "Whatever the market brought in.", shape: "square" },
  { id: "dishBeets", caption: "Charred beets with feta and greens.", shape: "square" },
  { id: "brunchTable", caption: "Sunday, done properly.", shape: "wide" },
  { id: "friendsLunch", caption: "Long lunches count too.", shape: "wide" },
  {
    id: "dishDrumsticks",
    caption: "Cast-iron chicken legs, straight from the pan.",
    shape: "square",
  },
  { id: "dateNight", caption: "A table for two.", shape: "cine" },
  { id: "embers", caption: "Live oak, open flame.", shape: "wide" },
  { id: "privateTable", caption: "Set for a long dinner.", shape: "wide" },
];

export interface Occasion {
  id: string;
  image: ImageId;
  title: string;
  line: string;
  to: "/reservations" | "/contact";
  cta: string;
}

/** The dining experience: three ways people use the room. */
export const occasions: Occasion[] = [
  {
    id: "brunch",
    image: "brunchTable",
    title: "Slow Sunday brunch",
    line: "Frittatas, short stacks and a second pot of coffee. No one is rushing you.",
    to: "/reservations",
    cta: "Reserve brunch",
  },
  {
    id: "date",
    image: "dateNight",
    title: "Date night, handled",
    line: "Candlelight, a good bottle and plates made for leaning across the table.",
    to: "/reservations",
    cta: "Reserve for two",
  },
  {
    id: "tables",
    image: "sharingHands",
    title: "Long tables, loud laughs",
    line: "Order for the middle of the table. Parties of nine or more can ask about private dining.",
    to: "/contact",
    cta: "Plan a gathering",
  },
];
