import { MoonStars, SunDim } from "@phosphor-icons/react";

const STORAGE_KEY = "juniper-ember-theme";

/** Runs in <head> before first paint: the stored choice, otherwise the evening (forest) default. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t="dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})()`;

/** Switches between forest (dark) and cream (light) and remembers the choice in this browser. */
export function ThemeToggle() {
  const flip = () => {
    const root = document.documentElement;
    const next = root.dataset["theme"] === "light" ? "dark" : "light";
    root.dataset["theme"] = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage can be blocked; the choice still applies for this visit */
    }
  };
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={flip}
      aria-label="Switch between dark and light theme"
    >
      <MoonStars size={24} className="theme-moon" aria-hidden />
      <SunDim size={24} className="theme-sun" aria-hidden />
    </button>
  );
}
