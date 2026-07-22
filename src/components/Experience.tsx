"use client";

import { useRef } from "react";
import { roles } from "@/data/content";
import {
  gsap,
  ScrollTrigger,
  EASE,
  MOTION_OK,
  REVEAL_DURATION,
  REVEAL_STAGGER,
  REVEAL_START,
  REVEAL_Y,
  useIsomorphicLayoutEffect,
} from "@/lib/motion";
import Rich from "./Rich";
import SectionHeading from "./SectionHeading";
import Stat from "./Stat";

/**
 * The centerpiece, told as a pinned scroll story on desktop: a sticky
 * left rail holds the active role's company/title/dates and a progress
 * line that draws itself as you move through the roles, while the cards
 * scroll by on the right - the active card in focus, the others receded.
 * Crossing a card's zone crossfades the rail to that role and updates
 * the "01 / 04" counter; metrics count up as each card enters.
 *
 * The story only exists when JS adds `.story-on` (desktop + motion
 * allowed), so mobile, reduced-motion, and no-JS all get the clean
 * stacked layout with per-card meta - the content reads correctly
 * everywhere.
 */
export default function Experience() {
  const scope = useRef<HTMLElement>(null);
  const activeRef = useRef(0);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    // Triggered reveals + drawn dividers, at every size that allows motion.
    mm.add(MOTION_OK, () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-role-card]", scope.current);
      cards.forEach((card) => {
        // clearProps: leftover inline transform styles would override CSS
        // hover effects on the revealed elements.
        gsap.from(card.querySelectorAll("[data-reveal]"), {
          autoAlpha: 0,
          y: REVEAL_Y,
          duration: REVEAL_DURATION,
          ease: EASE,
          stagger: REVEAL_STAGGER,
          clearProps: "all",
          scrollTrigger: { trigger: card, start: REVEAL_START, once: true },
        });
        gsap.from(card.querySelectorAll("[data-reveal-line]"), {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power3.inOut",
          clearProps: "all",
          scrollTrigger: { trigger: card, start: REVEAL_START, once: true },
        });
      });
    });

    // The pinned story: desktop + motion only.
    mm.add(
      { motion: MOTION_OK, desktop: "(min-width: 1024px)" },
      (ctx) => {
        if (!(ctx.conditions?.motion && ctx.conditions?.desktop)) return;

        const wrap = scope.current!;
        wrap.classList.add("story-on");

        const cards = gsap.utils.toArray<HTMLElement>("[data-role-card]", wrap);
        const entries = gsap.utils.toArray<HTMLElement>("[data-rail-entry]", wrap);
        const counter = wrap.querySelector<HTMLElement>("[data-rail-index]");
        const fill = wrap.querySelector<HTMLElement>("[data-rail-fill]");
        const cardsCol = wrap.querySelector<HTMLElement>("[data-cards]");

        activeRef.current = 0;
        gsap.set(entries.slice(1), { autoAlpha: 0, y: 14 });
        gsap.set(cards.slice(1), { opacity: 0.35 });

        const setActive = (next: number) => {
          if (next === activeRef.current) return;
          const prev = activeRef.current;
          activeRef.current = next;

          gsap.to(entries[prev], {
            autoAlpha: 0,
            y: -14,
            duration: 0.3,
            ease: "power2.in",
            overwrite: "auto",
          });
          gsap.fromTo(
            entries[next],
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.45, ease: EASE, overwrite: "auto" },
          );
          cards.forEach((card, i) => {
            gsap.to(card, {
              opacity: i === next ? 1 : 0.35,
              scale: i === next ? 1 : 0.985,
              duration: 0.45,
              ease: EASE,
              overwrite: "auto",
            });
          });
          if (counter) {
            counter.textContent = `${String(next + 1).padStart(2, "0")} / ${String(
              cards.length,
            ).padStart(2, "0")}`;
          }
        };

        // Each card owns a zone around the viewport's midline; entering
        // it (in either scroll direction) makes that role active.
        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              if (self.isActive) setActive(i);
            },
          });
        });

        // The rail's progress line draws itself, scrubbed to how far
        // the reader is through the roles.
        if (fill && cardsCol) {
          gsap.fromTo(
            fill,
            { scaleY: 0 },
            {
              scaleY: 1,
              transformOrigin: "top center",
              ease: "none",
              scrollTrigger: {
                trigger: cardsCol,
                start: "top 55%",
                end: "bottom 55%",
                scrub: true,
              },
            },
          );
        }

        return () => wrap.classList.remove("story-on");
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      id="experience"
      aria-label="Experience"
      className="py-20 sm:py-24"
    >
      <SectionHeading index="01" label="experience" title="Where I've shipped" />

      <div className="mt-6 lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
        {/* Sticky rail - only rendered visible when the story is on */}
        <div className="experience-rail">
          <div className="sticky top-28 pt-10">
            <p data-rail-index className="font-mono text-xs text-muted">
              01 / {String(roles.length).padStart(2, "0")}
            </p>
            <div className="relative mt-4 h-24 w-px bg-line" aria-hidden="true">
              <div
                data-rail-fill
                className="absolute inset-0 origin-top scale-y-0 bg-accent"
              />
            </div>
            {/* Entries stack in one grid cell and crossfade */}
            <div className="mt-6 grid">
              {roles.map((role) => (
                <div key={role.company} data-rail-entry className="col-start-1 row-start-1">
                  <h3 className="text-2xl font-semibold tracking-tight">{role.company}</h3>
                  <p className="mt-1 text-sm text-muted">{role.title}</p>
                  <p className="mt-3 font-mono text-xs text-muted">
                    {role.dates}
                    {role.current && (
                      <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent">
                        Now
                      </span>
                    )}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted">{role.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Role cards */}
        <div data-cards>
          {roles.map((role) => (
            <article key={role.company} data-role-card className="relative py-10">
              <div
                data-reveal-line
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-line"
              />

              {/* Inline meta - hidden while the rail is telling the story */}
              <div className="role-meta mb-6">
                <h3 data-reveal className="text-xl font-semibold tracking-tight">
                  {role.company}
                </h3>
                <div data-reveal>
                  <p className="mt-1 text-sm text-muted">{role.title}</p>
                  <p className="mt-3 font-mono text-xs text-muted">
                    {role.dates}
                    {role.current && (
                      <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent">
                        Now
                      </span>
                    )}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted">{role.location}</p>
                </div>
              </div>

              <dl className="flex flex-wrap gap-x-10 gap-y-5">
                {role.stats.map((stat) => (
                  <Stat key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </dl>

              <p
                data-reveal
                className="mt-7 max-w-prose text-[0.95rem] leading-relaxed text-muted"
              >
                <Rich text={role.story} />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
