import { useCallback, useMemo, useState, type ReactNode } from "react";

import type { MenuItem } from "@/data/menu";

import { addLine, cartCount, cartSubtotal, removeLine, setLineQty, type CartLine } from "./cart";
import { CartContext, type CartApi } from "./use-cart";

/**
 * The demo order. It lives in memory only: nothing is saved in the browser, so a reload starts a
 * fresh order, and nothing is ever sent anywhere.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const add = useCallback((item: MenuItem) => {
    setLines((prev) => addLine(prev, item));
    setAnnouncement(`Added ${item.name} to your order.`);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) => setLineQty(prev, id, qty));
    setAnnouncement(qty <= 0 ? "Item removed from your order." : `Quantity changed to ${qty}.`);
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => removeLine(prev, id));
    setAnnouncement("Item removed from your order.");
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartApi>(
    () => ({
      lines,
      count: cartCount(lines),
      subtotal: cartSubtotal(lines),
      add,
      setQty,
      remove,
      clear,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      announcement,
    }),
    [lines, add, setQty, remove, clear, isOpen, announcement],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </CartContext.Provider>
  );
}
