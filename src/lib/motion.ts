"use client";

/**
 * Single home for the motion system's shared pieces:
 *
 * - GSAP + ScrollTrigger registration (GSAP owns all scroll sequencing;
 *   there is deliberately no second scroll engine on the page).
 * - The site-wide reveal convention constants, so every section enters
 *   the same way and the motion feels designed rather than random.
 * - The Lenis smooth-scroll singleton, shared so nav anchors can drive
 *   the same scroller that ScrollTrigger listens to.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect } from "react";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** The one reveal convention used site-wide. */
export const EASE = "power3.out";
export const REVEAL_Y = 32;
export const REVEAL_DURATION = 0.75;
export const REVEAL_STAGGER = 0.08;
export const REVEAL_START = "top 85%";

/** Media query gate: animations only exist inside this match. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** True when the device has a precise pointer (mouse/trackpad). */
export const FINE_POINTER = "(pointer: fine)";

/**
 * useLayoutEffect on the client (so initial animation states are set
 * before paint - no flash), useEffect during SSR (no warning).
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** The active Lenis instance, or null (touch, reduced motion, no JS yet). */
export function getLenis(): Lenis | null {
  return lenis;
}
