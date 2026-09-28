import Stratum from '../../components/Stratum';
import Pop from '../../components/Pop';
import { publications } from '../../data/publications.data';
import type { Publication } from '../../types/content';

/**
 * PUBLICATIONS — a subsurface panel reads this before almost anything else.
 *
 * Presented accurately: presented poster, co-authored, with the specific role
 * stated. Neither entry is described as a peer-reviewed publication, because
 * neither is.
 */
export default function Publications() {
  const items = publications.items.filter((p) => p.visibility === 'public');

  return (
    <Stratum
      id="publications"
      index="04"
      title="Publications & Presentations"
      lede="Conference work, presented and co-authored. Both below were delivered as poster presentations."
    >
      <div className="flex flex-col gap-5">
        {items.map((p, i) => (
          <PublicationCard key={p.id} pub={p} delay={i} />
        ))}
      </div>
    </Stratum>
  );
}

function PublicationCard({ pub, delay }: { pub: Publication; delay: number }) {
  return (
    <Pop as="article" delay={delay} className="rounded-[20px]">
      <div
        className="rounded-[20px] p-5 md:p-7"
        style={{ background: '#fff', boxShadow: 'var(--shadow-sm)' }}
      >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[11px]">
        <span
          className="rounded-full px-2.5 py-1 uppercase tracking-wider"
          style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent-deep)' }}
        >
          {pub.kind}
        </span>
        <span style={{ color: 'var(--color-muted)' }}>{pub.venue}</span>
        <span style={{ color: 'var(--color-muted)' }}>· {pub.date}</span>
      </div>

      <h3 className="mt-3 text-xl md:text-2xl" style={{ color: 'var(--color-ink)' }}>
        {pub.title}
      </h3>

      <p className="mt-2 font-mono text-[11px]" style={{ color: 'var(--color-muted)' }}>
        {pub.role}
        {pub.coAuthors.length ? ` · with ${pub.coAuthors.join(', ')}` : ''}
      </p>

      {pub.abstract ? (
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: 'var(--color-ink)' }}>
          {pub.abstract}
        </p>
      ) : null}

      {pub.highlights.length ? (
        <ul className="mt-5 flex flex-col gap-2">
          {pub.highlights.map((h, i) => (
            <li
              key={i}
              className="flex gap-3 text-[15px] leading-relaxed"
              style={{ color: 'var(--color-ink)' }}
            >
              <span
                aria-hidden="true"
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: 'var(--color-accent)' }}
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {pub.links?.length ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {pub.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-mono text-xs"
              style={{ color: 'var(--color-accent)' }}
            >
              {l.label} →
            </a>
          ))}
        </div>
      ) : null}
      </div>
    </Pop>
  );
}
