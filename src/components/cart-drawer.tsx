import { useCart } from "@/lib/use-cart";

import { CartView } from "./cart-view";
import { Sheet } from "./sheet";

/** The order as a side drawer, opened from the header or the pickup bar. */
export function CartDrawer() {
  const { isOpen, closeCart, count } = useCart();
  return (
    <Sheet
      open={isOpen}
      onClose={closeCart}
      side="right"
      label="Your pickup order"
      title={`Your order${count > 0 ? ` (${count})` : ""}`}
    >
      <CartView onNavigate={closeCart} />
    </Sheet>
  );
}
