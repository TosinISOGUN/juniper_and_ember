import { Minus, Plus, ShoppingBag, Trash } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";

import { TAX_RATE } from "@/data/site";
import { MAX_QTY, cartTotal, estimateTax, formatUSD, lineTotal } from "@/lib/cart";
import { useCart } from "@/lib/use-cart";

/** The lines of the demo order with steppers and totals. Used in the drawer and on the order page. */
export function CartView({ onNavigate }: { onNavigate?: () => void }) {
  const { lines, subtotal, setQty, remove } = useCart();

  if (lines.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <ShoppingBag size={44} className="text-accent-text" aria-hidden />
        <p className="display-sm">Nothing here yet.</p>
        <p className="max-w-[30ch] text-muted">
          Add a few favorites from the menu and they will show up here.
        </p>
        <Link to="/order" onClick={onNavigate} className="btn btn-primary">
          Browse the pickup menu
        </Link>
      </div>
    );
  }

  const tax = estimateTax(subtotal);
  return (
    <>
      <ul className="flex-1 overflow-y-auto px-5">
        {lines.map((line) => (
          <li key={line.item.id} className="cart-line">
            <div className="min-w-0">
              <p className="font-display text-xl leading-tight">{line.item.name}</p>
              <p className="text-sm text-muted">{formatUSD(line.item.price)} each</p>
            </div>
            <p className="font-display text-xl tabular-nums">
              {formatUSD(lineTotal(line.item.price, line.qty))}
            </p>
            <div className="stepper">
              <button
                type="button"
                aria-label={`Fewer ${line.item.name}`}
                onClick={() => setQty(line.item.id, line.qty - 1)}
              >
                <Minus size={16} aria-hidden />
              </button>
              <output aria-label={`${line.item.name} quantity`}>{line.qty}</output>
              <button
                type="button"
                aria-label={`More ${line.item.name}`}
                disabled={line.qty >= MAX_QTY}
                onClick={() => setQty(line.item.id, line.qty + 1)}
              >
                <Plus size={16} aria-hidden />
              </button>
            </div>
            <button
              type="button"
              className="text-link justify-self-end text-xs"
              onClick={() => remove(line.item.id)}
              aria-label={`Remove ${line.item.name}`}
            >
              <Trash size={16} aria-hidden />
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="border-t border-line bg-bg p-5">
        <dl className="grid gap-1.5 text-[0.95rem]">
          <div className="receipt-row">
            <dt className="text-muted">Subtotal</dt>
            <dd>{formatUSD(subtotal)}</dd>
          </div>
          <div className="receipt-row">
            <dt className="text-muted">Estimated tax ({(TAX_RATE * 100).toFixed(2)}%)</dt>
            <dd>{formatUSD(tax)}</dd>
          </div>
          <div className="receipt-row mt-1 border-t border-line pt-2 text-lg font-bold">
            <dt>Estimated total</dt>
            <dd className="font-display text-2xl">{formatUSD(cartTotal(lines))}</dd>
          </div>
        </dl>
        <p className="mt-2 text-sm text-muted">
          Sample prices. This is a demo: nothing is charged and no order is sent to a kitchen.
        </p>
        <Link to="/checkout" onClick={onNavigate} className="btn btn-primary mt-4 w-full">
          Continue to demo checkout
        </Link>
      </div>
    </>
  );
}
