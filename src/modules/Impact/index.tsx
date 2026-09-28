import { impact } from '../../data/impact.data';
import CountUp from '../../components/CountUp';
import Pop from '../../components/Pop';

/**
 * IMPACT — the 20-second verdict.
 *
 * Two columns on mobile, four on desktop. This is the most conventional
 * element on the site, deliberately: it exists so the reader who leaves after
 * 20 seconds still leaves with the four best facts.
 */
export default function Impact() {
  const visible = impact.metrics.filter((m) => (m.visibility ?? 'public') === 'public');

  return (
    <section
      id="impact"
      className="relative"
      style={{ paddingBlock: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
      aria-label="Key figures"
    >
      <div className="shell">
        {impact.lede ? (
          <p
            className="mb-5 font-mono text-[10px] font-medium tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-muted)' }}
          >
            {impact.lede}
          </p>
        ) : null}

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {visible.map((m, i) => (
            <Pop key={m.label} delay={i} className="rounded-[20px]">
              <div
                className="flex h-full flex-col justify-between gap-2.5 rounded-[20px] p-5 md:p-6"
                style={{ background: '#fff', boxShadow: 'var(--shadow-sm)' }}
              >
                <div
                  className="font-display text-3xl leading-none tracking-tight md:text-4xl"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>
                    {m.label}
                  </p>
                  <p
                    className="mt-1.5 text-[12px] leading-snug"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {m.sublabel}
                  </p>
                </div>
              </div>
            </Pop>
          ))}
        </div>
      </div>
    </section>
  );
}
