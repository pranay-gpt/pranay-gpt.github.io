/**
 * THE CONTENT CONTRACT
 *
 * This file is the boundary between data and modules. Every field a module
 * can render is declared here, so `src/data/*.ts` is type-checked against it
 * and a module can never silently miss a field.
 *
 * Rule: if you want to add something to the site, add it here first, then
 * add it to the relevant data file. You should never need to touch a .tsx.
 */

/** Controls what renders, per item. */
export type Visibility =
  /** Rendered in full on the public site. */
  | 'public'
  /** Rendered as a summary only, details withheld. For sensitive items. */
  | 'link-only'
  /** Not rendered at all. Data stays here, ready to switch on later. */
  | 'private';

/** Registry entry — one per module. Order here is page order. */
export interface ModuleEntry {
  id: string;
  enabled: boolean;
  /** Metres at the top of this stratum, for the core-sample depth gauge. */
  depth: number;
  /** Show in the left nav? Hero and impact are above the fold, so no. */
  nav: boolean;
}

export type CtaKind = 'link' | 'copy' | 'download';

export interface Cta {
  label: string;
  href: string;
  kind: CtaKind;
  visibility?: Visibility;
}

/* ---------------------------------------------------------------- Hero -- */

export interface HeroData {
  kicker: string;
  name: string;
  tagline: string;
  summary: string;
  ctas: Cta[];
  /** Mono readout in the corner: e.g. "0 m MD". */
  depthLabel: string;
}

/* -------------------------------------------------------------- Impact -- */

export interface ImpactMetric {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
  /** Defaults to 'public'. */
  visibility?: Visibility;
}

export interface ImpactData {
  /** Optional lede above the grid. Keep it to one short line. */
  lede?: string;
  metrics: ImpactMetric[];
}

/* --------------------------------------------------------------- About -- */

export interface AboutParagraph {
  heading: string;
  body: string;
}

export interface Language {
  name: string;
  level: string;
  /** 0–100. Only meaningful when `learning` is true. */
  progress?: number;
  learning?: boolean;
  note?: string;
}

export interface AboutData {
  /** Four sentences, maximum. See §3.3. */
  opener: string;
  paragraphs: AboutParagraph[];
  languages: Language[];
}

/* ---------------------------------------------------------- Experience -- */

export interface Bullet {
  text: string;
  /** IDs this bullet is evidence for, used by the Skills module. */
  evidence?: string[];
  /** Defaults to 'public'. Omit it unless you are deliberately hiding a bullet. */
  visibility?: Visibility;
}

export interface RoleGroup {
  heading: string;
  bullets: Bullet[];
}

export interface Role {
  id: string;
  company: string;
  title: string;
  location: string;
  from: string;
  to: string;
  /** One line, shown before expansion. */
  summary: string;
  /** Optional scope statement, set in a blockquote under the header. */
  scope?: string;
  groups: RoleGroup[];
  tags: string[];
  visibility: Visibility;
}

export interface ExperienceData {
  roles: Role[];
}

/* -------------------------------------------------------- Publications -- */

export type PublicationKind = 'poster' | 'paper' | 'talk' | 'patent';

export interface PublicationLink {
  label: string;
  href: string;
}

export interface Publication {
  id: string;
  title: string;
  venue: string;
  date: string;
  kind: PublicationKind;
  /** Your role, stated precisely: "Submitter, Author, Presenter". */
  role: string;
  coAuthors: string[];
  abstract?: string;
  highlights: string[];
  links?: PublicationLink[];
  visibility: Visibility;
}

export interface PublicationsData {
  items: Publication[];
}

/* ------------------------------------------------------------ Projects -- */

export type ProjectVisual =
  | 'dashboard'
  | 'contour'
  | 'srp'
  | 'architecture'
  | 'decision'
  | 'pta'
  | 'report'
  | 'screenshot';

export interface ProjectImage {
  src: string;
  /** Required. An image with no alt text is worse than no image. */
  alt: string;
  /** Optional caption shown under the frame. */
  caption?: string;
}

export type ProjectTier = 'open-source' | 'field';

export interface Project {
  id: string;
  tier: ProjectTier;
  title: string;
  /** One line: your role on it. */
  role: string;
  repo?: string;
  liveUrl?: string;
  /**
   * Real screenshots. Only ever used for your own open-source repos.
   * Employer work carries no images — its visuals are original synthetic
   * figures, selected by `visual` instead.
   */
  images?: ProjectImage[];
  problem: string;
  approach: string;
  outcome: string;
  visual: ProjectVisual;
  /** Featured cards render large and image-led, above the standard grid. */
  featured?: boolean;
  /** Short verifiable proof points: "MIT", "513 tests", "3 stars". */
  badges?: string[];
  tags: string[];
  metrics?: ImpactMetric[];
  visibility: Visibility;
}

export interface ProjectsData {
  /** Grouped headings. Tier order here is tier order on the page. */
  tiers: { id: ProjectTier; label: string; note?: string }[];
  projects: Project[];
}

/* -------------------------------------------------------------- Skills -- */

export interface SkillItem {
  label: string;
  /** Evidence IDs: 'exp:gail:production', 'proj:opm-ai', 'pub:urvarta'. */
  evidence: string[];
  /** Highlighted chips — the terms a job description actually uses. */
  highlight?: boolean;
  visibility?: Visibility;
}

export interface SkillGroup {
  id: string;
  label: string;
  items: SkillItem[];
}

export interface SkillsData {
  /** The ordering IS the argument: reservoir first, digital as the multiplier. */
  order: string[];
  groups: SkillGroup[];
}

/* -------------------------------------------------- Education & global -- */

export interface Education {
  id: string;
  institution: string;
  location: string;
  qualification: string;
  detail?: string;
  grade?: string;
  from?: string;
  to?: string;
  visibility: Visibility;
}

export interface InternationalItem {
  id: string;
  place: string;
  country: string;
  what: string;
  duration: string;
  /** Forward-looking entries (e.g. Norway) render with a different treatment. */
  forwardLooking?: boolean;
  visibility: Visibility;
}

export interface GlobalData {
  education: Education[];
  international: InternationalItem[];
}

/* ------------------------------------------------------------- Contact -- */

export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href: string;
  /** Whether tapping copies the value. */
  copyable: boolean;
}

export interface ContactData {
  heading: string;
  blurb: string;
  channels: ContactChannel[];
  form: {
    enabled: boolean;
    /** Formspree / Web3Forms endpoint. Empty string disables the form. */
    endpoint: string;
  };
  /** Link to the CV PDF you have approved. */
  cvHref?: string;
  closing: string;
}

/* ----------------------------------------------------------- Site-wide -- */

export interface SiteConfig {
  name: string;
  title: string;
  role: string;
  description: string;
  domain: string;
  locale: string;
  social: { linkedin?: string; github?: string; email?: string; phone?: string };
  /** JSON-LD Person schema, emitted in index.html at build time. */
  jsonLd: Record<string, unknown>;
}
