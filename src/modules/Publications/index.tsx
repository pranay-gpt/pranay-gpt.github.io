import Stratum from '../../components/Stratum';
import { publications } from '../../data/publications.data';
import { moduleById } from '../../data/moduleById';
import type { Publication } from '../../types/content';

/**
 * PUBLICATIONS — a subsurface panel reads this before almost anything else.
 *
 * Presented accurately: presented poster, co-authored, with the specific role
 * stated. Neither entry is described as a peer-reviewed publication, because
 * neither is.
 */
export default function Publications() {
  const m = moduleById('publications');
  const items = publications.items.filter((p) => p.visibility === 'public');

  return (
    <Stratum
      id="publications"
      depth={m.depth}
      index="04"
      title="Publications & Presentations"
      lede="Conference work, presented and co-authored. Both below were delivered as poster presentations."
    >
      <ol className="flex flex-col gap-10 md:gap-12">
        {items.map((p) => (
          <PublicationCard key={p.id} pub={p} />
        ))}
      </ol>
    </Stratum>
  );
}

function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <li>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[11px]">
        <span
          className="rounded-full px-2 py-0.5 uppercase tracking-wider"
          style={{ background: 'rgba(76,194,255,0.10)', color: 'var(--color-accent)' }}
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
                className="mt-2 h-1 w-1 shrink-0 rounded-full"
                style={{ background: 'var(--color-accent-2)' }}
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
    </li>
  );
}
