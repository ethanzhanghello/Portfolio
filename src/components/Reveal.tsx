"use client";

import { useRef, type ReactNode } from "react";
import {
  gsap,
  EASE,
  MOTION_OK,
  REVEAL_DURATION,
  REVEAL_STAGGER,
  REVEAL_START,
  REVEAL_Y,
  useIsomorphicLayoutEffect,
} from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Extra seconds before the tween starts once triggered. */
  delay?: number;
  /**
   * When true, instead of revealing the wrapper as one block, stagger
   * every descendant marked with `data-reveal` (and draw any
   * `data-reveal-line` dividers from left to right).
   */
  stagger?: boolean;
  /** "wipe" clips the block open from the top - used for work cards. */
  effect?: "fade" | "wipe";
  /**
   * Scrub the wipe to scroll position instead of playing it once, so
   * the card unmasks as it enters and re-masks scrolling back up.
   */
  scrub?: boolean;
}

/**
 * The site-wide scroll reveal. One convention everywhere: fade + rise,
 * triggered at 85% of the viewport, power3.out. Content is rendered
 * visible in the HTML and only hidden the moment GSAP takes over, so
 * no-JS visitors and reduced-motion users always see everything.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
  effect = "fade",
  scrub = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const trigger = { trigger: el, start: REVEAL_START, once: true };

      if (effect === "wipe") {
        gsap.from(el, {
          clipPath: "inset(0% 0% 100% 0%)",
          y: scrub ? 24 : REVEAL_Y,
          autoAlpha: 0,
          ...(scrub
            ? {
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top 92%",
                  end: "top 55%",
                  scrub: 0.4,
                },
              }
            : { duration: 0.9, ease: EASE, delay, clearProps: "all", scrollTrigger: trigger }),
        });
        return;
      }

      // clearProps removes GSAP's inline styles once each reveal lands;
      // leftover inline `scale: none` would otherwise override CSS hover
      // effects (Tailwind's scale/translate utilities set those same
      // individual transform properties).
      const targets = stagger ? el.querySelectorAll("[data-reveal]") : el;
      gsap.from(targets, {
        autoAlpha: 0,
        y: REVEAL_Y,
        duration: REVEAL_DURATION,
        ease: EASE,
        stagger: stagger ? REVEAL_STAGGER : 0,
        delay,
        clearProps: "all",
        scrollTrigger: trigger,
      });

      const lines = el.querySelectorAll("[data-reveal-line]");
      if (lines.length) {
        gsap.from(lines, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power3.inOut",
          delay,
          clearProps: "all",
          scrollTrigger: trigger,
        });
      }
    });

    return () => mm.revert();
  }, [delay, stagger, effect]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
