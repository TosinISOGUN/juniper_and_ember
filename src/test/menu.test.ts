import { describe, expect, it } from "vitest";

import { images } from "@/data/images.generated";
import { alt, galleryPhotos, occasions } from "@/data/photos";
import {
  allItems,
  categoryOf,
  findMenuItem,
  isOrderable,
  menuCategories,
  signatureDishIds,
} from "@/data/menu";

describe("menu data", () => {
  it("has unique ids, whole-dollar prices and real descriptions", () => {
    const ids = allItems.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of allItems) {
      expect(Number.isInteger(item.price) && item.price > 0).toBe(true);
      expect(item.description.length).toBeGreaterThan(20);
    }
  });

  it("covers the seven categories in the brief", () => {
    expect(menuCategories.map((c) => c.id)).toEqual([
      "starters",
      "wood-fire",
      "mains",
      "salads",
      "sides",
      "desserts",
      "drinks",
    ]);
  });

  it("always has something to order in every category", () => {
    for (const c of menuCategories) expect(c.items.some(isOrderable)).toBe(true);
  });

  it("points every picture at a built image and describes every dish picture", () => {
    for (const c of menuCategories) expect(images[c.image]).toBeDefined();
    for (const item of allItems.filter((i) => i.image)) {
      expect(images[item.image!]).toBeDefined();
      expect(item.imageAlt?.length).toBeGreaterThan(10);
    }
  });

  it("features four signature dishes, each with a photograph, that the menu also lists", () => {
    expect(signatureDishIds).toHaveLength(4);
    for (const id of signatureDishIds) {
      expect(findMenuItem(id)?.image).toBeDefined();
      expect(categoryOf(id)).toBeDefined();
    }
  });

  it("keeps dietary marks to what the text supports", () => {
    expect(findMenuItem("mushroom-risotto")?.dietary).not.toContain("Vegetarian");
    const meat =
      /\b(chicken|beef|duck|turkey|tuna|oyster|snapper|scallop|anchov|rib|steak|burger)/i;
    for (const item of allItems) {
      if (item.dietary?.includes("Vegetarian")) expect(item.description).not.toMatch(meat);
    }
  });
});

describe("photographs", () => {
  it("has alt text for every built image", () => {
    for (const id of Object.keys(images)) {
      expect(alt[id as keyof typeof alt]?.length).toBeGreaterThan(15);
    }
  });

  it("uses each photograph once in the gallery, in shapes the mosaic can place", () => {
    const ids = galleryPhotos.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toHaveLength(Object.keys(images).length);
    // A 6 column band holds wide+wide, three squares, or cine+square.
    const area = { wide: 3, cine: 4, square: 2 } as const;
    const total = galleryPhotos.reduce((n, p) => n + area[p.shape], 0);
    expect(total % 6).toBe(0);
  });

  it("has three occasions that link somewhere real", () => {
    expect(occasions).toHaveLength(3);
    for (const o of occasions) expect(["/reservations", "/contact"]).toContain(o.to);
  });
});
