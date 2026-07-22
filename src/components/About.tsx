import { about } from "@/data/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/** Short and human - three sentences, no life story. */
export default function About() {
  return (
    <section id="about" aria-label="About" className="py-20 sm:py-24">
      <SectionHeading index="04" label="about" title="A little context" />

      <Reveal delay={0.08}>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          {about.join(" ")}
        </p>
      </Reveal>
    </section>
  );
}
