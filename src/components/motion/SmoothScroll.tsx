"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger, setLenis, MOTION_OK } from "@/lib/motion";

/**
 * Inertia-based smooth scrolling for the whole page, driven by Lenis and
 * ticked by GSAP so ScrollTrigger and the scroller share one clock.
 *
 * Tuned subtle (lerp 0.12) - weighted, not floaty. Touch devices keep
 * native scrolling (Lenis default), and reduced-motion users get the
 * browser's own scroll untouched.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia(MOTION_OK).matches) return;

    const lenis = new Lenis({ lerp: 0.12, anchors: false });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
