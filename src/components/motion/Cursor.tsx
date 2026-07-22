"use client";

import { useEffect, useRef } from "react";
import { gsap, FINE_POINTER, MOTION_OK } from "@/lib/motion";

/**
 * Custom cursor: an accent dot that tracks the pointer tightly, plus a
 * larger ring that trails it with lag and inverts whatever it passes
 * over (mix-blend-mode: difference). Over interactive elements the ring
 * grows and the dot collapses.
 *
 * Only mounts for precise pointers with motion allowed - touch devices
 * and reduced-motion users keep the native cursor.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !window.matchMedia(FINE_POINTER).matches ||
      !window.matchMedia(MOTION_OK).matches
    ) {
      return;
    }

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    document.documentElement.classList.add("custom-cursor");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    // quickTo gives cheap per-frame tweens; the ring's longer duration
    // is what creates the trailing lag.
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let shown = false;
    const move = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    // Grow over anything interactive.
    const over = (e: MouseEvent) => {
      const interactive = (e.target as Element).closest?.(
        "a, button, [data-cursor]",
      );
      gsap.to(ring, { scale: interactive ? 2.4 : 1, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: interactive ? 0 : 1, duration: 0.25, ease: "power3.out" });
    };

    const hide = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.25 });
    const show = () => shown && gsap.to([dot, ring], { autoAlpha: 1, duration: 0.25 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
