"use client";

import { MoonIcon, SunIcon } from "./icons";

/**
 * Light/dark toggle. The current theme lives as a `dark` class on <html>,
 * set before hydration by the inline script in layout.tsx, so this
 * component never needs theme state - the icons swap purely via CSS.
 */
export default function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // Private browsing - the choice just won't persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light or dark theme"
      className="rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-fg"
    >
      <SunIcon className="hidden h-5 w-5 dark:block" />
      <MoonIcon className="h-5 w-5 dark:hidden" />
    </button>
  );
}
