import Reveal from "./Reveal";
import Parallax from "./motion/Parallax";

interface SectionHeadingProps {
  /** Zero-padded index shown in the mono label, e.g. "01". */
  index: string;
  label: string;
  title: string;
}

/**
 * Numbered mono label + big title used at the top of every section.
 * The title drifts on a subtle scroll parallax for depth between
 * sections.
 */
export default function SectionHeading({ index, label, title }: SectionHeadingProps) {
  return (
    <Reveal>
      <Parallax amount={10}>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {index} / {label}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      </Parallax>
    </Reveal>
  );
}
