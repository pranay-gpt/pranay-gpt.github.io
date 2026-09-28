import { useEffect, useState } from 'react';
import { hero } from '../../data/hero.data';
import { useScrollProgress } from '../../lib/useScrollProgress';
import Pop from '../../components/Pop';

/**
 * HERO
 *
 * Type does the work. No canvas, no particle field, no looping background —
 * the previous version's animated strata were the uncomfortable part and they
 * are gone for good. What is left is a soft static wash, a thesis, and a
 * credibility strip, which is the structure the reference layout gets right.
 */
export default function Hero() {
  const { progress } = useScrollProgress();
  const [past, setPast] = useState(false);

  useEffect(() => setPast(progress > 0.03), [progress]);

  return (
    <header
      id="top"
      className="relative overflow-hidden"
      style={{ paddingBlock: 'clamp(5rem, 13vh, 8.5rem) clamp(3rem, 7vh, 5rem)' }}
    >
      {/* Static, soft, and out of the way. No animation, no flicker. */}
      <div
        className="hero-wash pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(70% 55% at 78% 8%, rgba(29,95,208,0.09) 0%, rgba(29,95,208,0) 62%), radial-gradient(52% 44% at 8% 88%, rgba(29,95,208,0.06) 0%, rgba(29,95,208,0) 60%)',
        }}
      />

      <div className="shell">
        <Pop>
          <p
            className="mb-5 font-mono text-[11px] font-medium tracking-[0.18em] uppercase"
            style={{ color: 'var(--color-accent)' }}
          >
            {hero.kicker}
          </p>
        </Pop>

        <Pop delay={1}>
          <h1
            className="max-w-3xl text-4xl md:text-5xl"
            style={{ color: 'var(--color-ink)' }}
          >
            {hero.thesis}
          </h1>
        </Pop>

        <Pop delay={2} className="mt-6">
          <p className="text-base font-medium" style={{ color: 'var(--color-ink-2)' }}>
            {hero.name} · {hero.role}
          </p>
          <p className="mt-1 font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
            {hero.location}
          </p>
        </Pop>

        <Pop delay={3} className="mt-7 max-w-2xl">
          <p className="text-[15px] leading-relaxed md:text-lg" style={{ color: 'var(--color-muted)' }}>
            {hero.summary}
          </p>
        </Pop>

        <Pop delay={4} className="mt-8 flex flex-wrap gap-2.5">
          {hero.ctas.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex min-h-11 items-center rounded-full px-5 text-sm font-medium transition-all"
              style={{ background: 'var(--color-accent)', color: '#fff', boxShadow: 'var(--shadow-sm)' }}
            >
              {c.label}
            </a>
          ))}
        </Pop>

        {/* Credibility strip — the fastest possible answer to "should I keep reading?" */}
        <Pop delay={5} className="mt-10">
          <div
            className="rounded-[20px] p-4 md:p-5"
            style={{ background: 'var(--color-bg-tint)', boxShadow: 'inset 0 0 0 1px var(--color-line)' }}
          >
            <p
              className="mb-3 font-mono text-[10px] tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-muted)' }}
            >
              Experience at
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
              {hero.credentials.map((c) => (
                <li key={c.label}>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>
                    {c.label}
                  </p>
                  {c.sub ? (
                    <p className="font-mono text-[10px]" style={{ color: 'var(--color-muted)' }}>
                      {c.sub}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </Pop>
      </div>

      <div
        className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-2 transition-opacity duration-500"
        style={{ opacity: past ? 0 : 1 }}
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-muted)' }}>
          Scroll
        </span>
        <div className="h-6 w-px" style={{ background: 'linear-gradient(180deg, var(--color-accent), transparent)' }} />
      </div>
    </header>
  );
}
