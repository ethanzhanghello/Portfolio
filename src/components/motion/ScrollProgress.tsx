"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useIsomorphicLayoutEffect } from "@/lib/motion";

/**
 * Thin page-progress bar along the top edge, scrubbed to scroll
 * position (with slight smoothing so it feels weighted). Hidden under
 * reduced motion - it starts at scaleX(0) and only GSAP grows it.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
