/**
 * Sample menu for the fictional Juniper & Ember concept. Every dish, price and dietary mark is
 * illustrative. Dietary marks only appear where the written ingredients support them, and the menu
 * always tells guests to ask about allergens.
 */
import type { ImageId } from "@/data/images.generated";

export type DietaryLabel = "Vegetarian" | "Gluten-free" | "Spicy";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /** Whole US dollars. */
  price: number;
  dietary?: DietaryLabel[];
  image?: ImageId;
  imageAlt?: string;
  popular?: boolean;
  /** Dishes are available for pickup unless this is false (the rotating draft list, for example). */
  orderable?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  blurb: string;
  /** The photograph used where the category is shown on its own. */
  image: ImageId;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "starters",
    name: "Starters & Shareables",
    blurb: "Small plates made for passing around the table.",
    image: "dishBrussels",
    items: [
      {
        id: "hot-honey-brussels",
        name: "Crispy Brussels Sprouts",
        description:
          "Twice-cooked sprouts with charred edges, hot honey, toasted almonds and a squeeze of lemon.",
        price: 12,
        dietary: ["Vegetarian", "Gluten-free"],
        image: "dishBrussels",
        imageAlt: "Roasted brussels sprouts with browned edges in a cast iron skillet",
        popular: true,
      },
      {
        id: "ember-dip",
        name: "Ember Smoked Dip",
        description:
          "Fire-roasted onion and chive cream cheese dip served warm with house potato chips and crudité.",
        price: 11,
        dietary: ["Vegetarian"],
      },
      {
        id: "oysters",
        name: "Gulf Coast Oysters",
        description:
          "Half dozen on ice with mignonette and fresh horseradish. Ask what is shucking today.",
        price: 18,
        dietary: ["Gluten-free"],
      },
      {
        id: "cornbread",
        name: "Skillet Cornbread",
        description:
          "Baked to order in a little cast iron, with whipped honey butter and flaky salt.",
        price: 9,
        dietary: ["Vegetarian"],
      },
      {
        id: "tuna-crisp",
        name: "Seared Tuna Crisp",
        description:
          "Pepper-crusted yellowfin on crispy rice with avocado, sesame and soy-lime glaze.",
        price: 16,
      },
    ],
  },
  {
    id: "wood-fire",
    name: "From the Wood Fire",
    blurb: "Everything here spends time over live oak embers.",
    image: "tBoneFlame",
    items: [
      {
        id: "half-chicken",
        name: "Wood-Fired Half Chicken",
        description:
          "Brined overnight, roasted over oak until the skin crackles, finished with herb butter and charred lemon.",
        price: 27,
        dietary: ["Gluten-free"],
        image: "dishChicken",
        imageAlt: "A roast chicken being carved at the table with a fork and knife",
        popular: true,
      },
      {
        id: "ember-burger",
        name: "Ember-Grilled Double Cheeseburger",
        description:
          "Two smashed patties seared over embers, aged cheddar, burnt-end onions, house pickles, brioche bun.",
        price: 19,
        image: "dishBurger",
        imageAlt: "A double cheeseburger with melted cheddar running down the patties",
        popular: true,
      },
      {
        id: "oak-steak",
        name: "Oak-Fired Bone-In Steak",
        description:
          "A thick bone-in cut seared hard over live oak, finished with bone marrow butter and flaky salt.",
        price: 44,
        dietary: ["Gluten-free"],
        image: "tBoneFlame",
        imageAlt: "A thick T-bone steak on the fire with flames curling around it",
      },
      {
        id: "smoked-beef-rib",
        name: "Smoked Beef Rib",
        description:
          "A bone-in rib rubbed with coffee and chile, smoked low for eight hours, with pickled onions.",
        price: 34,
      },
      {
        id: "wood-fired-broccolini",
        name: "Wood-Fired Broccolini",
        description: "Blistered over the coals with chili crisp, peanuts and mint. Simple as that.",
        price: 13,
        dietary: ["Vegetarian", "Spicy"],
      },
    ],
  },
  {
    id: "mains",
    name: "Mains",
    blurb: "Generous plates for a proper sit-down dinner.",
    image: "dishDrumsticks",
    items: [
      {
        id: "cast-iron-chicken-legs",
        name: "Cast-Iron Chicken Legs",
        description:
          "Crisp-skinned legs roasted in a skillet with pan juices, charred scallions and lemon, served with warm bread.",
        price: 24,
        image: "dishDrumsticks",
        imageAlt: "Roasted chicken drumsticks glistening in a black cast iron pan",
      },
      {
        id: "snapper-verde",
        name: "Roast Snapper Verde",
        description:
          "Whole-roasted red snapper with tomatillo butter, grilled lime and charred scallions, for two.",
        price: 46,
        dietary: ["Gluten-free"],
      },
      {
        id: "duck-confit",
        name: "Braised Duck Confit",
        description: "Slow-cooked leg with crispy skin, white beans, garlic sausage and gremolata.",
        price: 31,
      },
      {
        id: "scallop-pappardelle",
        name: "Seared Scallops & Pappardelle",
        description: "Hand-rolled pasta, brown butter, sweet corn, basil and a whisper of lemon.",
        price: 29,
      },
      {
        id: "mushroom-risotto",
        name: "Wild Mushroom Risotto",
        description: "Carnaroli rice, roasted maitake, parmesan brodo and herb oil.",
        price: 26,
        dietary: ["Gluten-free"],
      },
    ],
  },
  {
    id: "salads",
    name: "Salads & Greens",
    blurb: "From the market, wherever the season points.",
    image: "dishSalad",
    items: [
      {
        id: "market-salad",
        name: "Seasonal Market Salad",
        description:
          "Little Gems, roasted squash, feta, toasted walnuts, shaved apple and cider vinaigrette.",
        price: 16,
        dietary: ["Vegetarian", "Gluten-free"],
        image: "dishSalad",
        imageAlt: "A salad of crisp greens with walnuts and crumbled white cheese",
      },
      {
        id: "caesar",
        name: "Little Gem Caesar",
        description: "Crisp little gems, anchovy dressing, sourdough crumb and aged pecorino.",
        price: 15,
      },
      {
        id: "charred-beets",
        name: "Charred Beets",
        description: "Ember-roasted beets, crumbled feta, pistachio dukkah and mint.",
        price: 14,
        dietary: ["Vegetarian", "Gluten-free"],
        image: "dishBeets",
        imageAlt: "Sliced roasted beets with greens and crumbled cheese on a wooden board",
      },
    ],
  },
  {
    id: "sides",
    name: "Sides",
    blurb: "The supporting cast that steals the show.",
    image: "dishBeets",
    items: [
      {
        id: "duck-fat-fries",
        name: "Duck-Fat Fries",
        description: "Crispy, herby and impossible to share politely. Served with smoked aioli.",
        price: 9,
        dietary: ["Gluten-free"],
        popular: true,
      },
      {
        id: "charred-greens",
        name: "Charred Collard Greens",
        description: "Cooked low with smoked turkey, chili vinegar and crispy shallots.",
        price: 10,
      },
      {
        id: "cheddar-grits",
        name: "Sharp Cheddar Grits",
        description: "Creamy stone-ground grits with aged cheddar and a flick of black pepper.",
        price: 10,
        dietary: ["Vegetarian", "Gluten-free"],
      },
      {
        id: "wood-oven-bread",
        name: "Wood-Oven Bread & Butter",
        description: "Warm hearth loaf with cultured butter and olive oil for dunking.",
        price: 8,
        dietary: ["Vegetarian"],
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    blurb: "Worth saving room for. We mean it.",
    image: "dessertSkillet",
    items: [
      {
        id: "skillet-brownie",
        name: "Skillet Chocolate Brownie",
        description:
          "Baked in a mini cast iron, salted brown butter, warm chocolate sauce and vanilla bean gelato. Made for two.",
        price: 13,
        dietary: ["Vegetarian"],
        image: "dessertSkillet",
        imageAlt: "A skillet brownie topped with ice cream and melted chocolate on a wooden board",
        popular: true,
      },
      {
        id: "burnt-basque",
        name: "Burnt Basque Cheesecake",
        description: "Caramelized top, custardy middle, macerated berries.",
        price: 12,
        dietary: ["Vegetarian"],
      },
      {
        id: "hand-pie",
        name: "Seasonal Hand Pie",
        description:
          "Flaky, fruit-forward and served with buttermilk ice cream. Ask what is in the case.",
        price: 11,
        dietary: ["Vegetarian"],
      },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    blurb: "Handcrafted, low-key and made to be sipped slowly.",
    image: "drinkGimlet",
    items: [
      {
        id: "juniper-gimlet",
        name: "Juniper Gimlet",
        description:
          "Gin, charred lime, juniper tincture. Our house cocktail and a quiet favorite.",
        price: 14,
        image: "drinkGimlet",
        imageAlt: "A pale green gimlet in a coupe glass with lime slices on a dark green ground",
        popular: true,
      },
      {
        id: "smoked-old-fashioned",
        name: "Smoked Old Fashioned",
        description: "Rye, demerara, bitters, applewood smoke under glass.",
        price: 15,
      },
      {
        id: "verde-spritz",
        name: "Verde Spritz",
        description: "Cucumber, lime leaf, dry vermouth and soda over crushed ice.",
        price: 13,
      },
      {
        id: "texas-drafts",
        name: "Texas Drafts & Cider",
        description: "A short, rotating list of local brews. Ask your server what is on.",
        price: 7,
        orderable: false,
      },
      {
        id: "shrub-soda",
        name: "Shrub Soda",
        description: "House fruit shrubs with sparkling water. Zero proof, full flavor.",
        price: 8,
        dietary: ["Vegetarian"],
      },
      {
        id: "coffee-tea",
        name: "Coffee & Tea",
        description: "Local roast espresso, batch coffee and a proper pot of tea.",
        price: 4,
      },
    ],
  },
];

export const allItems: MenuItem[] = menuCategories.flatMap((c) => c.items);

export function findMenuItem(id: string): MenuItem | undefined {
  return allItems.find((i) => i.id === id);
}

export function isOrderable(item: MenuItem): boolean {
  return item.orderable !== false;
}

/** Dishes featured on the home page, in display order. Prices come from the menu above. */
export const signatureDishIds = [
  "ember-burger",
  "half-chicken",
  "hot-honey-brussels",
  "market-salad",
];

export const DIETARY_NOTE =
  "V is vegetarian, GF is gluten-free. Sample marks for a fictional menu: please ask about allergens at a real restaurant.";

/** The category a dish is listed under, for deep links from the home page. */
export function categoryOf(itemId: string): MenuCategory | undefined {
  return menuCategories.find((c) => c.items.some((i) => i.id === itemId));
}
