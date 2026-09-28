import type { ReactNode } from 'react';
import Pop from './Pop';
import { moduleById } from '../data/moduleById';

/**
 * STRATUM — one section of the page.
 *
 * Reads its own depth and index from the registry so a module never has to
 * know either. The depth annotation is the core-sample idea, kept small and
 * in the top-left so it reads as a stratigraphic mark rather than a label.
 */
export default function Stratum({
  id,
  index,
  title,
  lede,
  children,
}: {
  id: string;
  index: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  const { depth } = moduleById(id);

  return (
    <section
      id={id}
      className="stratum relative scroll-mt-20"
      style={{ paddingBlock: 'clamp(2.75rem, 5.5vw, 4.75rem)' }}
      aria-labelledby={`${id}-heading`}
    >
      <div className="shell">
        <Pop className="mb-6 flex items-center gap-3" >
          <span className="font-mono text-[11px] font-medium" style={{ color: 'var(--color-accent)' }}>
            {index}
          </span>
          <span className="font-mono text-[11px]" style={{ color: 'var(--color-muted)' }}>
            {depth} m
          </span>
          <span className="h-px flex-1" style={{ background: 'var(--color-line)' }} />
        </Pop>

        <header className="mb-7 md:mb-9">
          <h2 id={`${id}-heading`} className="text-2xl md:text-3xl">
            {title}
          </h2>
          {lede ? (
            <p
              className="mt-3 max-w-2xl text-[15px] leading-relaxed md:text-base"
              style={{ color: 'var(--color-muted)' }}
            >
              {lede}
            </p>
          ) : null}
        </header>

        {children}
      </div>
    </section>
  );
}
