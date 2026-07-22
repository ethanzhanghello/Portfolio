"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useIsomorphicLayoutEffect } from "@/lib/motion";

interface StatProps {
  /** e.g. "10M+", "<20ms", "$1.2M", "6h → <1h" - numbers count up. */
  value: string;
  label: string;
}

/** Splits a stat string so each numeric run can be tweened. */
const NUMBER_SPLIT = /(\d+(?:\.\d+)?)/;

/**
 * A headline metric: big monospace accent number with a caption.
 * Every number inside the value counts up from 0 when it scrolls into
 * view; prefixes/suffixes like "$", "M+", "ms" stay static. Renders the
 * final value in the HTML, so no-JS and reduced-motion users see the
 * real numbers.
 */
export default function Stat({ value, label }: StatProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      el.querySelectorAll<HTMLElement>("[data-num]").forEach((numEl) => {
        const raw = numEl.dataset.num!;
        const target = parseFloat(raw);
        const decimals = (raw.split(".")[1] ?? "").length;
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            numEl.textContent = counter.v.toFixed(decimals);
          },
        });
      });
    });

    return () => mm.revert();
  }, [value]);

  const parts = value.split(NUMBER_SPLIT);

  return (
    <div data-reveal>
      <dd
        ref={ref}
        className="font-mono text-3xl font-semibold tracking-tight text-accent sm:text-4xl"
      >
        {parts.map((part, i) =>
          NUMBER_SPLIT.test(part) && i % 2 === 1 ? (
            <span key={i} data-num={part}>
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </dd>
      <dt className="mt-1 text-xs text-muted">{label}</dt>
    </div>
  );
}
