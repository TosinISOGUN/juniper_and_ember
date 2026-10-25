import { TAX_RATE } from "@/data/site";
import type { MenuItem } from "@/data/menu";

export interface CartLine {
  item: MenuItem;
  qty: number;
}

/** Largest quantity of one dish in a single demo order. */
export const MAX_QTY = 20;

export function formatUSD(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function lineTotal(price: number, qty: number): number {
  return price * qty;
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + lineTotal(line.item.price, line.qty), 0);
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}

/** Estimated sales tax, rounded to the cent so the receipt always adds up. */
export function estimateTax(subtotal: number): number {
  return Math.round(subtotal * TAX_RATE * 100) / 100;
}

export function cartTotal(lines: CartLine[]): number {
  const subtotal = cartSubtotal(lines);
  return Math.round((subtotal + estimateTax(subtotal)) * 100) / 100;
}

export function addLine(lines: CartLine[], item: MenuItem, qty = 1): CartLine[] {
  const existing = lines.find((l) => l.item.id === item.id);
  if (!existing) return [...lines, { item, qty: Math.min(qty, MAX_QTY) }];
  return lines.map((l) =>
    l.item.id === item.id ? { ...l, qty: Math.min(l.qty + qty, MAX_QTY) } : l,
  );
}

/** Sets a quantity; zero or less removes the line. */
export function setLineQty(lines: CartLine[], id: string, qty: number): CartLine[] {
  if (qty <= 0) return lines.filter((l) => l.item.id !== id);
  return lines.map((l) => (l.item.id === id ? { ...l, qty: Math.min(qty, MAX_QTY) } : l));
}

export function removeLine(lines: CartLine[], id: string): CartLine[] {
  return lines.filter((l) => l.item.id !== id);
}
