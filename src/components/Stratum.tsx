import type { ReactNode } from 'react';
import { useReveal } from '../lib/useReveal';

interface StratumProps {
  id: string;
  depth: number;
  index: string;
  title: string;
  lede?: string;
  children: ReactNode;
}

/**
 * STRATUM — one band of the core sample.
 *
 * The single wrapper every module renders inside. Owns the depth annotation,
 * the stratigraphic rule, the heading, and the reveal. Modules never
 * reimplement any of this.
 *
 * The rule: content belongs in src/data. This component is presentation only.
 */
export default function Stratum({ id, depth, index, title, lede, children }: StratumProps) {
  const { ref, className } = useReveal<HTMLDivElement>();

  return (
    <section
      id={id}
      className={`stratum relative scroll-mt-20 ${className}`}
      style={{ paddingBlock: 'clamp(3.5rem, 9vw, 7rem)' }}
      aria-labelledby={`${id}-heading`}
    >
      <div className="shell">
        {/* Depth annotation in mono — the way a core description is logged. */}
        <div className="mb-6 flex items-baseline gap-4 font-mono text-[10px] tracking-widest uppercase">
          <span style={{ color: 'var(--color-accent)' }}>{index}</span>
          <span style={{ color: 'var(--color-muted)' }}>{depth} m</span>
          <span className="h-px flex-1" style={{ background: 'var(--color-line)' }} />
        </div>

        <header className="mb-8 md:mb-12">
          <h2
            id={`${id}-heading`}
            className="text-2xl md:text-3xl"
            style={{ color: 'var(--color-ink)' }}
          >
            {title}
          </h2>
          {lede ? (
            <p
              className="mt-3 max-w-2xl text-base md:text-lg"
              style={{ color: 'var(--color-muted)' }}
            >
              {lede}
            </p>
          ) : null}
        </header>

        <div ref={ref}>{children}</div>
      </div>
    </section>
  );
}
