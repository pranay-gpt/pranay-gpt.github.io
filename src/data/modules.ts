import type { ModuleEntry } from '../types/content';

/**
 * THE REGISTRY — the single most important file for maintenance.
 *
 * Reorder the page ....... change the array order
 * Hide a section ......... set enabled: false
 * Add one later .......... uncomment the line + create the folder + data file
 *
 * The depth gauge, nav, progress spine and print stylesheet all derive from
 * this file. Nothing else needs to know a module exists.
 */
export const modules: ModuleEntry[] = [
  { id: 'top', enabled: true, depth: 0, nav: false },
  { id: 'impact', enabled: true, depth: 90, nav: false },
  { id: 'about', enabled: true, depth: 280, nav: true },
  { id: 'experience', enabled: true, depth: 620, nav: true },
  { id: 'publications', enabled: true, depth: 1080, nav: true },
  { id: 'projects', enabled: true, depth: 1440, nav: true },
  { id: 'approach', enabled: true, depth: 1900, nav: true },
  { id: 'skills', enabled: true, depth: 2180, nav: true },
  { id: 'global', enabled: true, depth: 2420, nav: true },
  { id: 'contact', enabled: true, depth: 2680, nav: true },

  // Ready to switch on later, without touching anything else:
  // { id: 'certifications', enabled: false, depth: 2350, nav: true },
  // { id: 'speaking', enabled: false, depth: 1090, nav: true },
];

export const enabledModules = modules.filter((m) => m.enabled);

export const navModules = enabledModules.filter((m) => m.nav);

/** Human labels for the nav, so `id` never leaks into the UI. */
export const NAV_LABELS: Record<string, string> = {
  about: 'About',
  experience: 'Experience',
  publications: 'Papers',
  projects: 'Work',
  approach: 'Approach',
  skills: 'Skills',
  global: 'Education',
  contact: 'Contact',
};

/** Deepest point on the core, for the gauge's scale. */
export const maxDepth = enabledModules.reduce((max, m) => Math.max(max, m.depth), 0);
