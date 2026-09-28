import { navModules, maxDepth } from '../data/modules';
import { useScrollProgress } from '../lib/useScrollProgress';

/**
 * DEPTH GAUGE — the core-sample meter.
 *
 * Desktop: a fixed left rail with a mono depth reading that advances as you
 * scroll, and a mark per stratum boundary.
 *
 * Mobile: collapses to a 3px spine at the left screen edge, labels dropped.
 * Anything more would compete with the content on a 5" screen.
 */
export default function DepthGauge() {
  const { progress, depth } = useScrollProgress();
  const scaleDepth = maxDepth || 1;

  return (
    <>
      {/* ---- Mobile: thin spine, no labels ---- */}
      <div
        className="depth-gauge fixed left-0 top-0 z-30 h-full w-[3px] md:hidden"
        aria-hidden="true"
      >
        {/* Track, so the spine reads as a gauge rather than a stray sliver. */}
        <div className="absolute inset-0 w-full" style={{ background: 'var(--color-line)' }} />
        <div
          className="w-full transition-[height] duration-150 ease-out"
          style={{
            height: `${Math.max(2, progress * 100)}%`,
            background: 'linear-gradient(180deg, var(--color-accent), var(--color-accent-2))',
          }}
        />
      </div>

      {/* ---- Desktop: full rail with depth marks ---- */}
      <div
        className="depth-gauge pointer-events-none fixed left-0 top-0 z-30 hidden h-full w-16 md:block"
        aria-hidden="true"
      >
        {/* The wellbore itself */}
        <div
          className="absolute top-0 left-7 w-px bg-[var(--color-line)]"
          style={{ height: '100%' }}
        />

        {/* Progress fill */}
        <div
          className="absolute left-7 w-px transition-[height] duration-150 ease-out"
          style={{
            height: `${Math.max(1, progress * 100)}%`,
            background: 'linear-gradient(180deg, var(--color-accent), var(--color-accent-2))',
          }}
        />

        {/* Stratum boundary marks */}
        {navModules.map((m) => {
          const pct = (m.depth / scaleDepth) * 100;
          return (
            <div
              key={m.id}
              className="absolute left-4 flex items-center"
              style={{ top: `${pct}%` }}
            >
              <span
                className="block h-px w-3"
                style={{ background: 'var(--color-line)' }}
              />
            </div>
          );
        })}

        {/* Live depth readout, pinned near the middle */}
        <div className="absolute top-1/2 left-7 -translate-y-1/2">
          <span
            className="block pl-3 font-mono text-[10px] tracking-widest whitespace-nowrap"
            style={{ color: 'var(--color-muted)' }}
          >
            {depth} m MD
          </span>
        </div>
      </div>
    </>
  );
}
