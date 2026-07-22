"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, FINE_POINTER, MOTION_OK } from "@/lib/motion";

interface MagneticProps {
  children: ReactNode;
  /** How strongly the element chases the cursor (0–1). */
  strength?: number;
  className?: string;
}

/**
 * Magnetic wrapper: while the cursor is over the element it eases toward
 * the pointer, then springs back to rest on exit. No-op on touch and
 * under reduced motion.
 */
export default function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !window.matchMedia(FINE_POINTER).matches ||
      !window.matchMedia(MOTION_OK).matches
    ) {
      return;
    }

    const el = ref.current!;
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.35)" });
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block ${className ?? ""}`}>
      {children}
    </div>
  );
}
