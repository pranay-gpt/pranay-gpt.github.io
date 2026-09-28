import { useEffect, useState } from 'react';
import { hero } from '../../data/hero.data';
import { useScrollProgress } from '../../lib/useScrollProgress';
import Pop from '../../components/Pop';
import Portrait from '../../components/Portrait';

/**
 * HERO
 *
 * Type does the work. No canvas, no particle field, no looping background —
 * the previous version's animated strata were the uncomfortable part and they
 * are gone for good. What is left is a soft static wash, a thesis, a
 * credibility strip, and a portrait.
 *
 * Portrait is layout-split rather than size-split: a 4:5 image on a phone
 * would eat the entire first screen, so mobile gets a 44px chip beside the
 * name and desktop gets the full image in its own column.
 */
export default function Hero() {
  const { progress } = useScrollProgress();
  const [past, setPast] = useState(false);

  useEffect(() => setPast(progress > 0.03), [progress]);

  return (
    <header
      id="top"
      className="relative overflow-hidden"
      style={{ paddingBlock: 'clamp(4rem, 11vh, 7rem) clamp(3rem, 7vh, 5rem)' }}
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
        <div className="grid items-start gap-8 md:grid-cols-[1fr_minmax(280px,340px)] md:gap-12">
          {/* ------------------------------------------------ copy column -- */}
          <div>
            <Pop>
              <p
                className="mb-5 font-mono text-[11px] font-medium tracking-[0.18em] uppercase"
                style={{ color: 'var(--color-accent)' }}
              >
                {hero.kicker}
              </p>
            </Pop>

            <Pop delay={1}>
              <h1 className="max-w-2xl text-4xl md:text-5xl" style={{ color: 'var(--color-ink)' }}>
                {hero.thesis}
              </h1>
            </Pop>

            {/* Mobile: 44px portrait beside the name. Desktop: plain lines. */}
            <Pop delay={2} className="mt-6 flex items-center gap-3.5 md:hidden">
              <Portrait variant="chip" />
              <div className="min-w-0">
                <p
                  className="text-[1.6rem] leading-tight font-semibold md:text-3xl"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {hero.name}
                </p>
                <p className="mt-0.5 text-sm" style={{ color: 'var(--color-ink-2)' }}>
                  {hero.role}
                </p>
                <p className="mt-0.5 font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
                  {hero.location}
                </p>
              </div>
            </Pop>

            <Pop delay={2} className="mt-6 hidden md:block">
              <p
                className="text-2xl leading-tight font-semibold md:text-[2rem]"
                style={{ color: 'var(--color-ink)' }}
              >
                {hero.name}
              </p>
              <p className="mt-1.5 text-base" style={{ color: 'var(--color-ink-2)' }}>
                {hero.role}
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

            {/* Credibility strip — the fastest answer to "should I keep reading?" */}
            <Pop delay={5} className="mt-10">
              <div
                className="rounded-[20px] p-4 md:p-5"
                style={{ background: 'var(--color-bg-tint)', boxShadow: 'inset 0 0 0 1px var(--color-line)' }}
              >
                <p
                  className="mb-3 font-mono text-[10px] font-medium tracking-[0.18em] uppercase"
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

          {/* ------------------------------------------- portrait column -- */}
          <Pop delay={3} className="hidden md:block">
            <div className="sticky top-24">
              <Portrait variant="hero" />
            </div>
          </Pop>
        </div>
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
