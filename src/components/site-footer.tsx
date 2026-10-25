import { Link } from "@tanstack/react-router";

import { CONCEPT_NOTE, hours, nav, site } from "@/data/site";

import { Wordmark } from "./brand";

export function SiteFooter() {
  return (
    <footer className="panel-surface border-t border-line">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="md:col-span-2 lg:col-span-1">
          <Link to="/" aria-label={`${site.name}, home`}>
            <Wordmark />
          </Link>
          <p className="mt-4 max-w-[30ch] font-display text-2xl italic leading-tight">
            {site.tagline}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-3">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="footer-link">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/reservations" className="footer-link">
                Reserve a table
              </Link>
            </li>
            <li>
              <Link to="/order" className="footer-link">
                Order online
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="footer-link">
                Privacy
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">Visit (sample)</h2>
          <address className="mt-3 text-muted">
            {site.address.line1}
            <br />
            {site.address.line2}
          </address>
          <ul className="mt-3 space-y-1 text-sm text-muted">
            {hours.map((h) => (
              <li key={h.label}>
                <span className="font-bold text-fg">{h.label}:</span> {h.display}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow">A fictional restaurant</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{CONCEPT_NOTE}</p>
          <p className="mt-3 text-sm text-muted">
            {site.phoneDisplay} (a number that cannot ring) <br />
            {site.email}
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="wrap py-5 pb-24 text-sm text-muted lg:pb-5">
          © {new Date().getFullYear()} Juniper &amp; Ember, a design concept. Photographs are
          licensed stock and do not show a real restaurant.
        </p>
      </div>
    </footer>
  );
}
