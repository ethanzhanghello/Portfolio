"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, EASE, MOTION_OK, useIsomorphicLayoutEffect } from "@/lib/motion";
import { site } from "@/data/content";
import HeroBackdrop from "./HeroBackdrop";
import Magnetic from "./motion/Magnetic";
import { ArrowUpRightIcon, DocumentIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

/**
 * Above-the-fold hero over a WebGL backdrop. The name reveals character
 * by character from a clipped baseline; status, pitch, CTAs, and the
 * photo follow on one GSAP timeline. The name is server-rendered as real
 * text (masked spans, aria-labelled), so SEO, no-JS, and reduced-motion
 * all see it instantly.
 */
export default function Hero() {
  const scope = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(scope);

      // Entrance timeline. 125% (not 110) so glyphs stay fully hidden
      // inside the masks' descender padding before revealing.
      gsap.set(q("[data-char]"), { yPercent: 125 });
      const tl = gsap.timeline({ defaults: { ease: EASE } });
      tl.from(q("[data-hero-status]"), { autoAlpha: 0, y: 16, duration: 0.6 }, 0.1)
        .to(q("[data-char]"), { yPercent: 0, duration: 0.9, stagger: 0.03 }, 0.15)
        .from(
          q("[data-hero-fade]"),
          { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.1 },
          "-=0.55",
        )
        .from(q("[data-hero-photo]"), { autoAlpha: 0, scale: 0.94, duration: 0.9 }, 0.35);

      // Scroll-out handoff: the backdrop parallaxes down and fades while
      // the content lifts, softens with a slight blur, and dissolves -
      // no hard cut into the experience section.
      gsap.to(q("[data-hero-backdrop]"), {
        yPercent: 16,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom 25%",
          scrub: true,
        },
      });
      gsap.to(q("[data-hero-inner]"), {
        y: -56,
        autoAlpha: 0,
        filter: "blur(6px)",
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom 35%",
          scrub: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      aria-label="Introduction"
      className="relative pb-20 pt-32 sm:pb-28 sm:pt-40"
    >
      <HeroBackdrop />

      <div
        data-hero-inner
        className="lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16"
      >
        <div>
          {/* Availability status */}
          <p
            data-hero-status
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 font-mono text-xs text-muted backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {site.status}
          </p>

          {/* Character-by-character masked reveal */}
          <h1
            aria-label={site.name}
            className="mt-7 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            {site.name.split(" ").map((word, wi) => (
              <span
                key={wi}
                aria-hidden="true"
                className="mr-[0.28em] inline-block whitespace-nowrap last:mr-0"
              >
                {word.split("").map((char, ci) => (
                  // pb extends the mask below the baseline so descenders
                  // (g, y, j) aren't clipped at the heading's tight
                  // line-height; the negative margin cancels the extra
                  // height so layout doesn't shift.
                  <span
                    key={ci}
                    className="-mb-[0.25em] inline-block overflow-hidden pb-[0.25em] align-bottom"
                  >
                    <span data-char className="inline-block">
                      {char}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p data-hero-fade className="mt-4 text-lg font-medium text-fg sm:text-xl">
            {site.headline}
          </p>

          <p
            data-hero-fade
            className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {site.pitch}
          </p>

          {/* Primary CTAs - magnetic on fine pointers */}
          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4.5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
              >
                <DocumentIcon className="h-4 w-4" />
                View resume
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-line bg-bg/60 px-4.5 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-muted" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-line bg-bg/60 px-4.5 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-muted" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-md border border-line bg-bg/60 px-4.5 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
              >
                <MailIcon className="h-4 w-4" />
                Email
              </a>
            </Magnetic>
          </div>

          {/* Currently line */}
          <p data-hero-fade className="mt-10 font-mono text-xs text-muted sm:text-sm">
            <span className="text-accent">currently</span>
            {": "}
            {site.currently.join(" · ")}
          </p>
        </div>

        {/* Headshot - beside the text on desktop, below it on mobile */}
        <div data-hero-photo className="mt-12 lg:mt-0">
          <Image
            src={site.headshot.src}
            alt={site.headshot.alt}
            width={800}
            height={800}
            priority
            sizes="(min-width: 1024px) 288px, 176px"
            className="h-44 w-44 rounded-2xl object-cover ring-1 ring-line lg:h-72 lg:w-72"
          />
        </div>
      </div>
    </section>
  );
}
