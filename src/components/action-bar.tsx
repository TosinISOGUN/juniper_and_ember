import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

/** Pages that already have their own bottom controls or a form in progress. */
const QUIET = ["/reservations", "/order", "/checkout"];

/**
 * Menu, Reserve and Order within thumb reach on phones and tablets. It stays out of the way until
 * the first screen has been read, and is hidden on pages with their own bottom bar.
 */
export function ActionBar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [past, setPast] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      setPast(window.scrollY > window.innerHeight * 0.55);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [path]);

  const hidden = QUIET.includes(path) || !past;
  return (
    <nav
      aria-label="Quick actions"
      className="action-bar"
      {...(hidden ? { "data-hidden": "" } : {})}
    >
      <Link to="/menu" tabIndex={hidden ? -1 : 0}>
        Menu
      </Link>
      <Link to="/reservations" data-primary tabIndex={hidden ? -1 : 0}>
        Reserve
      </Link>
      <Link to="/order" tabIndex={hidden ? -1 : 0}>
        Order
      </Link>
    </nav>
  );
}
