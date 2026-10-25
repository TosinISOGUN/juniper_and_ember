import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, ShoppingBag, WarningCircle } from "@phosphor-icons/react";
import { useRef, useState, type FormEvent } from "react";

import { TAX_RATE } from "@/data/site";
import {
  cartSubtotal,
  cartTotal,
  estimateTax,
  formatUSD,
  lineTotal,
  type CartLine,
} from "@/lib/cart";
import { useCart } from "@/lib/use-cart";
import { validateCheckout, type CheckoutErrors, type CheckoutValues } from "@/lib/forms";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/checkout")({
  head: () =>
    seo({
      title: "Demo checkout | Juniper & Ember (concept)",
      description:
        "A clearly labeled demo checkout for the fictional Juniper & Ember. No payment is taken and no order is placed.",
      image: "checkout",
      path: "/checkout",
    }),
  component: CheckoutPage,
});

const WHEN = [
  "As soon as possible (about 20 minutes)",
  "In about 45 minutes",
  "In about an hour",
  "In about 90 minutes",
] as const;

type Values = CheckoutValues;
type Errors = CheckoutErrors;

function Err({ id, text }: { id: string; text: string | undefined }) {
  if (!text) return null;
  return (
    <p id={id} className="field-error">
      <WarningCircle size={18} weight="fill" className="mt-0.5 shrink-0" aria-hidden />
      {text}
    </p>
  );
}

function Summary({ lines }: { lines: CartLine[] }) {
  const subtotal = cartSubtotal(lines);
  return (
    <div className="ticket p-6">
      <h2 className="display-sm">Order summary</h2>
      <ul className="mt-4 divide-y divide-line">
        {lines.map((l) => (
          <li key={l.item.id} className="receipt-row py-3">
            <span>
              {l.qty} × {l.item.name}
            </span>
            <span>{formatUSD(lineTotal(l.item.price, l.qty))}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-3 grid gap-1.5 border-t border-line pt-3">
        <div className="receipt-row">
          <dt className="text-muted">Subtotal</dt>
          <dd>{formatUSD(subtotal)}</dd>
        </div>
        <div className="receipt-row">
          <dt className="text-muted">Estimated tax ({(TAX_RATE * 100).toFixed(2)}%)</dt>
          <dd>{formatUSD(estimateTax(subtotal))}</dd>
        </div>
        <div className="receipt-row text-lg font-bold">
          <dt>Estimated total</dt>
          <dd className="font-display text-2xl">{formatUSD(cartTotal(lines))}</dd>
        </div>
      </dl>
    </div>
  );
}

function CheckoutPage() {
  const { lines, clear } = useCart();
  const [values, setValues] = useState<Values>({ name: "", phone: "", when: WHEN[0], notes: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [placed, setPlaced] = useState<{ lines: CartLine[]; values: Values } | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  const set = (key: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function submit(e: FormEvent) {
    e.preventDefault();
    const found = validateCheckout(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setPlaced({ lines, values });
    clear();
    window.scrollTo({ top: 0 });
    window.setTimeout(() => heading.current?.focus(), 0);
  }

  const top = "pt-[calc(var(--nav-h)+3rem)]";

  if (placed) {
    const subtotal = cartSubtotal(placed.lines);
    return (
      <section className={`wrap pb-24 ${top}`}>
        <div className="ticket mx-auto max-w-2xl">
          <div className="p-6 sm:p-10">
            <p className="eyebrow">Demo order</p>
            <h1 ref={heading} tabIndex={-1} className="display-lg mt-3 outline-none">
              Thanks, {placed.values.name.trim()}. The demo kitchen is on it.
            </h1>
            <p className="mt-4 text-muted">
              Pickup would be {placed.values.when.toLowerCase()}. This is what the receipt would
              show.
            </p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {placed.lines.map((l) => (
                <li key={l.item.id} className="receipt-row py-3">
                  <span>
                    {l.qty} × {l.item.name}
                  </span>
                  <span>{formatUSD(lineTotal(l.item.price, l.qty))}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-3 grid gap-1.5">
              <div className="receipt-row">
                <dt className="text-muted">Subtotal</dt>
                <dd>{formatUSD(subtotal)}</dd>
              </div>
              <div className="receipt-row">
                <dt className="text-muted">Estimated tax</dt>
                <dd>{formatUSD(estimateTax(subtotal))}</dd>
              </div>
              <div className="receipt-row text-lg font-bold">
                <dt>Estimated total</dt>
                <dd className="font-display text-2xl">{formatUSD(cartTotal(placed.lines))}</dd>
              </div>
            </dl>
          </div>
          <div className="ticket-stub p-6 sm:p-10">
            <p className="notice flex gap-3">
              <CheckCircle
                size={22}
                weight="fill"
                className="mt-0.5 shrink-0 text-accent-text"
                aria-hidden
              />
              <span>
                <strong>No order was placed and nothing was charged.</strong> Juniper &amp; Ember is
                a fictional restaurant: no kitchen received this, and no food is on its way.
              </span>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/order" className="btn btn-solid">
                Build another order
              </Link>
              <Link to="/menu" className="btn btn-ghost">
                Browse the menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section
        className={`wrap grid min-h-[70dvh] content-center justify-items-start pb-24 ${top}`}
      >
        <ShoppingBag size={48} className="text-accent-text" aria-hidden />
        <h1 className="display-lg mt-4">Your order is empty.</h1>
        <p className="lead mt-4">Add a few favorites from the pickup menu first.</p>
        <Link to="/order" className="btn btn-primary mt-8">
          Browse the pickup menu
        </Link>
      </section>
    );
  }

  return (
    <section className={`wrap pb-24 ${top}`}>
      <p className="eyebrow">Demo checkout</p>
      <h1 className="display-lg mt-3">Review your order.</h1>
      <p className="notice mt-6 max-w-3xl">
        <strong>This is a demo.</strong> No payment details are asked for, nothing is charged and
        nothing is sent to a kitchen.
      </p>
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <form ref={form} onSubmit={submit} noValidate className="ticket grid gap-6 p-6 sm:p-8">
          <h2 className="display-sm">Pickup details</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="field">
              <label htmlFor="ck-name">Name for the order</label>
              <input
                id="ck-name"
                name="name"
                className="input"
                autoComplete="name"
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "err-ck-name" : undefined}
              />
              <Err id="err-ck-name" text={errors.name} />
            </div>
            <div className="field">
              <label htmlFor="ck-phone">Phone</label>
              <input
                id="ck-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                className="input"
                autoComplete="tel"
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "err-ck-phone" : undefined}
              />
              <Err id="err-ck-phone" text={errors.phone} />
            </div>
          </div>
          <fieldset className="grid gap-3">
            <legend className="field-label mb-1">Pickup</legend>
            <div className="flex flex-wrap gap-2">
              {WHEN.map((w) => (
                <label key={w} className="choice">
                  <input
                    type="radio"
                    name="when"
                    value={w}
                    checked={values.when === w}
                    onChange={() => set("when", w)}
                  />
                  <span>{w}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="field">
            <label htmlFor="ck-notes">
              Notes <span className="font-normal text-muted">(optional)</span>
            </label>
            <textarea
              id="ck-notes"
              name="notes"
              className="input"
              rows={3}
              value={values.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-full sm:w-auto">
              Place demo order · {formatUSD(cartTotal(lines))}
            </button>
            <p className="mt-4 text-sm text-muted">
              Nothing you type here is stored or sent anywhere.{" "}
              <Link to="/order" className="underline underline-offset-4">
                Change your order
              </Link>
              .
            </p>
          </div>
        </form>
        <Summary lines={lines} />
      </div>
    </section>
  );
}
