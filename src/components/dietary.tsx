import type { DietaryLabel } from "@/data/menu";

const short: Record<DietaryLabel, string> = {
  Vegetarian: "V",
  "Gluten-free": "GF",
  Spicy: "Spicy",
};

/** Small marks beside a dish. The full word is spoken to screen readers and shown on hover. */
export function DietaryTags({ dietary }: { dietary?: DietaryLabel[] | undefined }) {
  if (!dietary?.length) return null;
  return (
    <ul className="inline-flex flex-wrap items-center gap-1" aria-label="Dietary information">
      {dietary.map((d) => (
        <li key={d} className="tag" title={d}>
          <span aria-hidden>{short[d]}</span>
          <span className="sr-only">{d}</span>
        </li>
      ))}
    </ul>
  );
}
