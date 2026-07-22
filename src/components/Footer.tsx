import { site } from "@/data/content";
import Reveal from "./Reveal";
import Magnetic from "./motion/Magnetic";
import { ArrowUpRightIcon, DocumentIcon, GitHubIcon, LinkedInIcon } from "./icons";

/**
 * Contact section + footer. The email is the hero here; the links are
 * magnetic as a closing flourish. Otherwise motion stays restrained to
 * let the eye rest.
 */
export default function Footer() {
  return (
    <footer className="border-t border-line">
      <section id="contact" aria-label="Contact" className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal stagger>
            <p data-reveal className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              05 / contact
            </p>
            <h2 data-reveal className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Let&apos;s talk
            </h2>
            <p data-reveal className="mt-4 max-w-xl text-muted">
              {site.status}, any location. The fastest way to reach me:
            </p>
            <div data-reveal className="mt-6">
              <Magnetic strength={0.15}>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-block break-all font-mono text-xl font-medium text-accent underline-offset-4 hover:underline sm:text-2xl"
                >
                  {site.email}
                </a>
              </Magnetic>
            </div>

            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
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
                  className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  LinkedIn
                  <ArrowUpRightIcon className="h-3.5 w-3.5 text-muted" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  <DocumentIcon className="h-4 w-4" />
                  Resume
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing beat: a ghost wordmark rises and settles as the page ends */}
      <div className="overflow-hidden">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal>
            <p
              aria-hidden="true"
              className="select-none whitespace-nowrap text-[clamp(3.5rem,13vw,11rem)] font-bold leading-none tracking-tight text-fg/[0.05]"
            >
              {site.name.toLowerCase()}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-6 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>Next.js · TypeScript · Tailwind · GSAP · deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
