import { modules } from './modules';
import type { ModuleEntry } from '../types/content';

/**
 * Convenience lookup so a module can ask for its own depth from the registry
 * without duplicating the number. Keeps the registry as the single source.
 */
export function moduleById(id: string): ModuleEntry {
  const found = modules.find((m) => m.id === id);
  if (!found) {
    throw new Error(
      `Module "${id}" is not in the registry. Add it to src/data/modules.ts — that is all.`,
    );
  }
  return found;
}
