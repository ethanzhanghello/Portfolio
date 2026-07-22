/**
 * Single source of truth for every word on the site.
 *
 * Edit copy here - components only render what this file exports.
 *
 * Bullet syntax: wrap a phrase in **double asterisks** to render it
 * highlighted (semibold, accent color). Use it to make metrics pop.
 */

export interface Stat {
  /** The loud number, rendered big in monospace (e.g. "10M+", "<20ms"). */
  value: string;
  /** Short caption under the number. */
  label: string;
}

export interface Role {
  company: string;
  title: string;
  location: string;
  dates: string;
  /** Marks the role with a "Now" badge. */
  current?: boolean;
  /** Two or three headline metrics, rendered as big accent numbers. */
  stats: Stat[];
  /**
   * A short first-person story: the problem, what I owned, what shipped.
   * The stats row carries the numbers, so the story shouldn't repeat
   * them. Supports **highlight** syntax.
   */
  story: string;
}

export interface Project {
  name: string;
  role: string;
  dates: string;
  /** One-line outcome. Supports **highlight** syntax. */
  outcome: string;
  tags: string[];
  /** Optional links, e.g. { label: "Live demo", href: "https://..." }. */
  links: { label: string; href: string }[];
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export const site = {
  name: "Ethan Zhang",
  headline: "Software Engineer · UC Berkeley CS + Applied Math, Class of 2028",
  pitch:
    "I build production data and backend systems (observability, ELT pipelines, low latency services) that ship real, measurable impact.",
  email: "ethanyzhang@berkeley.edu",
  github: "https://github.com/ethanzhanghello",
  linkedin: "https://www.linkedin.com/in/ethan-zhang-693100270/",
  location: "Berkeley / SF Bay Area",
  status: "Open to Summer 2027 SWE internships",
  currently: ["SWE Intern @ Workday", "Founding SWE @ Lumo", "Berkeley CS + Math '28"],
  headshot: {
    src: "/headshot.jpg",
    alt: "Ethan Zhang, wearing a suit, in front of Doe Library at UC Berkeley",
  },
  /** PLACEHOLDER: drop your resume PDF into /public/resume.pdf. */
  resumeUrl: "/resume.pdf",
  /** PLACEHOLDER: set to the deployed domain (used for sitemap + Open Graph). */
  url: "https://ethanzhang.dev",
};

export const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const roles: Role[] = [
  {
    company: "Workday",
    title: "Software Engineer Intern",
    location: "Pleasanton, CA",
    dates: "May 2026 – Present",
    current: true,
    stats: [
      { value: "10M+", label: "exports instrumented" },
      { value: "<20ms", label: "benchmarked latency" },
      { value: "9%", label: "low-confidence estimates caught" },
    ],
    story:
      "Export-time estimates were reaching customers with no accuracy story behind them. I instrumented the production export pipeline with **Micrometer metrics comparing predicted vs. actual duration** on a live monitoring dashboard, then built an offline evaluation pipeline that computes mean absolute error across historical runs and **suppresses low-confidence estimates before customers ever see them**. I carried the feature all the way out: benchmarked the latency, rolled it out with the on-call engineers, and wrote the runbook.",
  },
  {
    company: "Lumo",
    title: "Founding Software Engineer",
    location: "San Francisco, CA",
    dates: "Mar 2025 – Present",
    current: true,
    stats: [
      { value: "$1.2M", label: "annual inefficiency identified" },
      { value: "6 wk", label: "enterprise POC → signed LOI" },
      { value: "0", label: "PII reaching the LLM" },
    ],
    story:
      "As the founding engineer I architected a **CMMS-agnostic ELT data platform**: every new customer system onboards as an isolated transform instead of a custom rewrite. Maintenance data is sensitive, so I designed an anonymization layer that **strips PII before anything reaches the LLM** and hardened the system with prompt injection mitigation and LDAP/AD access control. A six week enterprise proof of concept with Applied Materials quantified the labor inefficiency sitting in their workflows and ended in a **signed Letter of Intent** for pilot deployment.",
  },
  {
    company: "Blueberry AI",
    title: "Software Engineer Intern",
    location: "Burlingame, CA",
    dates: "Oct 2025 – Dec 2025",
    stats: [
      { value: "40%", label: "query latency cut" },
      { value: "4M", label: "design assets served" },
      { value: "90%+", label: "test coverage" },
    ],
    story:
      "I built real time retrieval, processing, and rendering for **100+ 3D model formats** in a browser based asset viewer, writing C++ parsing modules and integrating them through RESTful APIs, AWS S3, and Node.js microservices. The latency win across a catalog serving 1K+ customers came from containerizing the backend (Docker, Kubernetes, MongoDB) and integrating **OpenAI and CLIP for AI tagging**. I also streamlined the CI/CD pipeline, so releases went out with fewer production errors and much stronger test coverage.",
  },
  {
    company: "Toyota (Contract)",
    title: "Software Engineer Consultant",
    location: "Berkeley, CA",
    dates: "Jan 2026 – May 2026",
    stats: [
      { value: "6h → <1h", label: "weekly scheduling time" },
      { value: "25%", label: "fewer understaffed shifts" },
      { value: "~200", label: "shifts normalized / week" },
    ],
    story:
      "Staff scheduling lived in three disconnected sources and ate the better part of a workday every week. I unified it into a **normalized PostgreSQL schema**, then wrote a **greedy heuristic optimizer**, fast and cheap to rerun whenever the schedule changes, to build it automatically. Validated against eight weeks of historical data, it produced fewer understaffed shifts than the manual baseline ever did.",
  },
];

export const projects: Project[] = [
  {
    name: "Equivalence Systems",
    role: "AI Researcher",
    dates: "Aug – Dec 2025",
    outcome:
      "Distributed NLP pipeline that cut manual review **90%** across **36M+ academic records**, plus a parallelized OCR-to-JSON parser that got 10K+ transcripts down to **sub-5-second** processing.",
    tags: ["Python", "HuggingFace", "GCP", "OCR"],
    // PLACEHOLDER: add live demo / repo links when available.
    links: [],
  },
  {
    name: "SMCCD Hackathon",
    role: "1st Place · ML Track",
    dates: "Apr 2025",
    outcome:
      "Real time music recommender over **3M+ plays** with sub-second suggestions. **MAP@20 = 0.89 (+34%)** from tuned collaborative filtering and caching. Won among **100+ teams**.",
    tags: ["Collaborative Filtering", "Redis Caching", "Real-time"],
    // PLACEHOLDER: add live demo / repo links when available.
    links: [],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages & Frameworks",
    items: [
      "C++",
      "Go",
      "Java",
      "Python",
      "C",
      "TypeScript",
      "JavaScript (ES6+)",
      "React",
      "Node.js",
      "Flask",
      "FastAPI",
      "SQL",
    ],
  },
  {
    name: "Cloud & Infra",
    items: [
      "AWS (EC2, S3, Lambda)",
      "GCP (Firebase, Cloud Run)",
      "Docker",
      "Kubernetes",
      "CI/CD (GitHub Actions)",
      "Git",
      "Linux",
    ],
  },
  {
    name: "Databases & Systems",
    items: [
      "PostgreSQL",
      "MySQL",
      "Redis",
      "API architecture",
      "Distributed systems",
      "Real-time & embedded",
    ],
  },
  {
    name: "Debugging & Observability",
    items: [
      "Micrometer metrics & monitoring",
      "Root cause analysis & triage",
      "Incident runbooks",
      "On-call tooling",
    ],
  },
];

export const about = [
  "Berkeley CS and Applied Math student who likes working close to production: data pipelines, observability, backend performance.",
  "Comfortable owning a feature end to end, from design through on call rollout.",
  "Looking for Summer 2027 SWE internships.",
];
