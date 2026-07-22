import { projects } from "@/data/content";
import Reveal from "./Reveal";
import Rich from "./Rich";
import SectionHeading from "./SectionHeading";
import { ArrowUpRightIcon } from "./icons";

/**
 * Small, curated set of project cards - deliberately not a project dump.
 * Cards open with a clipped wipe reveal and lift with an accent glow on
 * hover.
 */
export default function SelectedWork() {
  return (
    <section id="work" aria-label="Selected work" className="py-20 sm:py-24">
      <SectionHeading index="02" label="selected work" title="Beyond the day job" />

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <Reveal key={project.name} effect="wipe" scrub className="h-full">
            <article
              data-cursor
              className="group flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_12px_40px_-16px_var(--accent)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
                <p className="shrink-0 font-mono text-xs text-muted">{project.dates}</p>
              </div>
              <p className="mt-1 font-mono text-xs text-accent">{project.role}</p>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                <Rich text={project.outcome} />
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.7rem] text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.links.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                    >
                      {link.label}
                      <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
