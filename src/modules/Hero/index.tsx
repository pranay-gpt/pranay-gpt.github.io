import { useEffect, useState } from 'react';
import { hero } from '../../data/hero.data';
import { useScrollProgress } from '../../lib/useScrollProgress';

/**
 * HERO — typographic, over a layered background.
 *
 * Deliberately not a 3D scene. Phone-first: the first viewport has to carry
 * the name, the role, one honest sentence, and four ways to reach me — on a
 * 5" screen, in sunlight, on mobile data.
 */
export default function Hero() {
  const { progress, depth } = useScrollProgress();
  const [past, setPast] = useState(false);

  useEffect(() => {
    setPast(progress > 0.04);
  }, [progress]);

  return (
    <header
      id="top"
      className="relative flex min-h-[80svh] items-end pb-16 md:min-h-[92svh] md:items-center md:pb-0"
      style={{ paddingTop: 'clamp(4.5rem, 12vh, 7rem)' }}
    >
      <div className="shell w-full">
        {/* Kicker — mono, accent, letterspaced */}
        <p
          className="mb-4 font-mono text-xs tracking-[0.2em] uppercase"
          style={{ color: 'var(--color-accent)' }}
        >
          {hero.kicker}
        </p>

        <h1
          className="text-4xl md:text-5xl"
          style={{ color: 'var(--color-ink)' }}
        >
          {hero.name}
        </h1>

        <p
          className="mt-3 font-mono text-sm tracking-wide md:text-base"
          style={{ color: 'var(--color-muted)' }}
        >
          {hero.tagline}
        </p>

        <hr className="rule my-7 max-w-md" />

        <p
          className="max-w-xl text-base leading-relaxed md:text-lg"
          style={{ color: 'var(--color-ink)' }}
        >
          {hero.summary}
        </p>

        {/* CTAs — 44px tap targets minimum */}
        <div className="mt-8 flex flex-wrap gap-3">
          {hero.ctas.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              target={cta.href.startsWith('http') ? '_blank' : undefined}
              rel={cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex min-h-11 items-center rounded-full px-5 font-mono text-xs tracking-wide transition-colors"
              style={{
                background: 'var(--color-surface)',
                color: 'var(--color-ink)',
                boxShadow: 'inset 0 0 0 1px var(--color-line)',
              }}
            >
              {cta.label}
            </a>
          ))}
        </div>
      </div>

      {/* Live depth readout — the signature detail */}
      <div
        className="pointer-events-none absolute right-5 bottom-6 font-mono text-[10px] tracking-widest md:right-10"
        style={{ color: 'var(--color-muted)' }}
        aria-hidden="true"
      >
        {depth} m MD
      </div>

      {/* Scroll cue, fades out as soon as you move */}
      <div
        className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-2 transition-opacity duration-500 md:left-auto md:right-10"
        style={{ opacity: past ? 0 : 1 }}
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-muted)' }}>
          Scroll
        </span>
        <div
          className="h-6 w-px"
          style={{ background: 'linear-gradient(180deg, var(--color-accent), transparent)' }}
        />
      </div>
    </header>
  );
}
