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
 *
 * Depths are metres down the core sample. They are illustrative spacing
 * anchors, not measurements — adjust them freely to taste.
 */
export const modules: ModuleEntry[] = [
  { id: 'hero', enabled: true, depth: 0, nav: false },
  { id: 'impact', enabled: true, depth: 100, nav: false },
  { id: 'about', enabled: true, depth: 340, nav: true },
  { id: 'experience', enabled: true, depth: 720, nav: true },
  { id: 'publications', enabled: true, depth: 1180, nav: true },
  { id: 'projects', enabled: true, depth: 1560, nav: true },
  { id: 'skills', enabled: true, depth: 2040, nav: true },
  { id: 'global', enabled: true, depth: 2320, nav: true },
  { id: 'contact', enabled: true, depth: 2600, nav: true },

  // Ready to switch on later, without touching anything else:
  // { id: 'certifications', enabled: false, depth: 2210, nav: true },
  // { id: 'speaking', enabled: false, depth: 1190, nav: true },
];

export const enabledModules = modules.filter((m) => m.enabled);

export const navModules = enabledModules.filter((m) => m.nav);

/** Deepest point on the core, for the gauge's scale. */
export const maxDepth = enabledModules.reduce((max, m) => Math.max(max, m.depth), 0);
