import { navModules, maxDepth } from '../data/modules';
import { useScrollProgress } from '../lib/useScrollProgress';

/**
 * DEPTH GAUGE — the core-sample meter.
 *
 * Desktop: a fixed left rail with a mono depth reading and a mark per stratum.
 * Mobile: a 3px spine at the left screen edge with a visible track, labels
 * dropped. Anything more would compete with the content on a 5" screen.
 */
export default function DepthGauge() {
  const { progress, depth } = useScrollProgress();
  const scaleDepth = maxDepth || 1;
  const accent = 'var(--color-accent)';

  return (
    <>
      {/* ---- Mobile spine ---- */}
      <div
        className="depth-gauge fixed top-0 left-0 z-30 h-full w-[4px] md:hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0" style={{ background: 'var(--color-line-soft)' }} />
        <div
          className="w-full transition-[height] duration-150 ease-out"
          style={{
            height: `${Math.max(1.5, progress * 100)}%`,
            background: `linear-gradient(180deg, ${accent}, var(--color-accent-deep))`,
          }}
        />
      </div>

      {/* ---- Desktop rail ---- */}
      <div
        className="depth-gauge pointer-events-none fixed top-0 left-0 z-30 hidden h-full w-16 md:block"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-7 w-px" style={{ height: '100%', background: 'var(--color-line)' }} />
        <div
          className="absolute left-7 w-0.5 transition-[height] duration-150 ease-out"
          style={{
            height: `${Math.max(1, progress * 100)}%`,
            background: `linear-gradient(180deg, ${accent}, var(--color-accent-deep))`,
          }}
        />

        {navModules.map((m) => (
          <div
            key={m.id}
            className="absolute left-4 h-px w-3"
            style={{ top: `${(m.depth / scaleDepth) * 100}%`, background: 'var(--color-accent-line)' }}
          />
        ))}

        <div className="absolute top-1/2 left-7 -translate-y-1/2">
          <span
            className="block pl-3 font-mono text-[10px] tracking-widest whitespace-nowrap"
            style={{ color: 'var(--color-muted)' }}
          >
            {depth} m
          </span>
        </div>
      </div>
    </>
  );
}
