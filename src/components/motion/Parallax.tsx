"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useIsomorphicLayoutEffect } from "@/lib/motion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Total yPercent drift while traversing the viewport. Keep it small. */
  amount?: number;
}

/**
 * Subtle scroll-scrubbed parallax: the element drifts slightly slower
 * than the page as it crosses the viewport, adding depth between
 * sections. Scrubbed to scroll progress, not time.
 */
export default function Parallax({ children, className, amount = 12 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        el,
        { yPercent: amount },
        {
          yPercent: -amount,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    return () => mm.revert();
  }, [amount]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
