import { describe, expect, it } from "vitest";

import { findMenuItem } from "@/data/menu";
import {
  MAX_QTY,
  addLine,
  cartCount,
  cartSubtotal,
  cartTotal,
  estimateTax,
  formatUSD,
  removeLine,
  setLineQty,
} from "@/lib/cart";

const burger = findMenuItem("ember-burger")!;
const sprouts = findMenuItem("hot-honey-brussels")!;

describe("cart", () => {
  it("formats dollars", () => {
    expect(formatUSD(19)).toBe("$19.00");
    expect(formatUSD(46.55)).toBe("$46.55");
  });

  it("adds a new dish and stacks a repeat", () => {
    let lines = addLine([], burger);
    lines = addLine(lines, sprouts);
    lines = addLine(lines, burger);
    expect(lines).toHaveLength(2);
    expect(lines.find((l) => l.item.id === burger.id)?.qty).toBe(2);
    expect(cartCount(lines)).toBe(3);
  });

  it("sums the subtotal from the menu prices", () => {
    const lines = setLineQty(addLine(addLine([], sprouts), burger), sprouts.id, 2);
    expect(cartSubtotal(lines)).toBe(12 * 2 + 19);
  });

  it("removes a line when the quantity reaches zero or it is removed", () => {
    const lines = addLine(addLine([], burger), sprouts);
    expect(setLineQty(lines, burger.id, 0).map((l) => l.item.id)).toEqual([sprouts.id]);
    expect(removeLine(lines, sprouts.id).map((l) => l.item.id)).toEqual([burger.id]);
  });

  it("caps one dish at the maximum quantity", () => {
    expect(setLineQty(addLine([], burger), burger.id, 500)[0]?.qty).toBe(MAX_QTY);
    expect(addLine([{ item: burger, qty: MAX_QTY }], burger)[0]?.qty).toBe(MAX_QTY);
  });

  it("estimates 8.25 percent tax, rounded to the cent, and adds it to the total", () => {
    expect(estimateTax(43)).toBe(3.55);
    expect(estimateTax(0)).toBe(0);
    const lines = setLineQty(addLine(addLine([], sprouts), burger), sprouts.id, 2);
    expect(cartTotal(lines)).toBe(46.55);
  });
});
