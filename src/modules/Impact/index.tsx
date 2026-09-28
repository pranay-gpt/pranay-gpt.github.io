import { useReveal } from '../../lib/useReveal';
import { impact } from '../../data/impact.data';
import CountUp from '../../components/CountUp';

/**
 * IMPACT — the 20-second verdict.
 *
 * Two columns on mobile, four on desktop. Nine coefficients is the most
 * conventional element on the site, deliberately: it exists so the reader who
 * leaves after 20 seconds still leaves with the four best facts.
 */
export default function Impact() {
  const { ref, className } = useReveal<HTMLDivElement>();
  const visible = impact.metrics.filter((m) => (m.visibility ?? 'public') === 'public');

  return (
    <section
      id="impact"
      className="relative"
      style={{
        paddingBlock: 'clamp(2rem, 5vw, 3.5rem)',
        background: 'var(--color-surface)',
        boxShadow: 'inset 0 1px 0 var(--color-line), inset 0 -1px 0 var(--color-line)',
      }}
      aria-label="Key figures"
    >
      <div className="shell">
        {impact.lede ? (
          <p
            className="mb-6 font-mono text-[10px] tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-muted)' }}
          >
            {impact.lede}
          </p>
        ) : null}

        <div
          ref={ref}
          className={`grid grid-cols-2 gap-px ${className}`}
          style={{ background: 'var(--color-line)' }}
        >
          {visible.map((m) => (
            <div
              key={m.label}
              className="flex flex-col justify-between gap-2 p-5 md:p-7"
              style={{ background: 'var(--color-bg)' }}
            >
              <div
                className="font-display text-3xl leading-none md:text-4xl"
                style={{ color: 'var(--color-accent)' }}
              >
                <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>
                  {m.label}
                </p>
                <p
                  className="mt-1 font-mono text-[11px] leading-snug"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {m.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
