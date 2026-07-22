"use client";

import dynamic from "next/dynamic";

// Code-split: the WebGL bundle never blocks first paint.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

/**
 * Full-bleed layer behind the hero. The CSS gradient is both the static
 * fallback (no WebGL / reduced motion / mobile) and the base the shader
 * composites over; the bottom fade hands off cleanly to the next section.
 */
export default function HeroBackdrop() {
  return (
    <div
      data-hero-backdrop
      aria-hidden="true"
      className="absolute bottom-0 left-1/2 -top-32 -z-10 w-screen -translate-x-1/2 overflow-hidden"
    >
      <div className="hero-gradient absolute inset-0" />
      <HeroCanvas />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
