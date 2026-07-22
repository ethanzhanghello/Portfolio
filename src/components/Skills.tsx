import { skillGroups } from "@/data/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/**
 * Grouped skill tags - built to be scanned, not read. Pills stagger in
 * with the site-wide reveal and spring on hover. No parallax here: the
 * groups sit in a shared grid, and per-group drift makes the row
 * spacing visibly uneven.
 */
export default function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="py-20 sm:py-24">
      <SectionHeading index="03" label="skills" title="Tools I reach for" />

      <div className="mt-10 grid gap-x-12 gap-y-16 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <Reveal key={group.name} stagger>
            <h3
              data-reveal
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted"
            >
              {group.name}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  data-reveal
                  className="springy rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-xs text-fg hover:scale-105 hover:border-accent hover:text-accent motion-reduce:hover:scale-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
