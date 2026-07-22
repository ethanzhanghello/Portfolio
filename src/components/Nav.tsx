"use client";

import { useState } from "react";
import { navLinks, site } from "@/data/content";
import { getLenis } from "@/lib/motion";
import Magnetic from "./motion/Magnetic";
import ThemeToggle from "./ThemeToggle";
import { CloseIcon, MenuIcon } from "./icons";

/**
 * Sticky top nav with anchor links, theme toggle, and a resume CTA.
 * Anchor clicks are routed through Lenis (when active) so nav scrolling
 * shares the page's inertia; otherwise they fall back to the browser.
 * Collapses to a hamburger menu below `md`.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);

  /** Smooth-scroll an anchor via Lenis, keeping the hash in the URL. */
  function goTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const lenis = getLenis();
    if (!lenis) return; // native fallback (touch / reduced motion)
    e.preventDefault();
    lenis.scrollTo(href === "#top" ? 0 : href, { offset: -80 });
    history.pushState(null, "", href);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8"
      >
        {/* Monogram - jumps back to the top */}
        <a
          href="#top"
          onClick={(e) => goTo(e, "#top")}
          className="font-mono text-sm font-semibold tracking-tight"
        >
          <span className="text-accent">ez</span>
          <span className="text-muted">@</span>
          <span>berkeley</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Magnetic key={link.href} strength={0.2}>
              <a
                href={link.href}
                onClick={(e) => goTo(e, link.href)}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-fg"
              >
                {link.label}
              </a>
            </Magnetic>
          ))}
          <span aria-hidden="true" className="mx-2 h-5 w-px bg-line" />
          <ThemeToggle />
          <Magnetic strength={0.25} className="ml-2">
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-accent px-3.5 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              Resume
            </a>
          </Magnetic>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-fg"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-line px-5 pb-4 pt-2 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                setOpen(false);
                goTo(e, link.href);
              }}
              className="block rounded-md px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-fg"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-md bg-accent px-3 py-2.5 text-center text-sm font-medium text-bg"
          >
            Resume
          </a>
        </div>
      )}
    </header>
  );
}
