import Stratum from '../../components/Stratum';
import { global } from '../../data/global.data';
import { moduleById } from '../../data/moduleById';

/**
 * INTERNATIONAL & EDUCATION.
 *
 * Geography as the visual. For a Norway-based role, having already worked
 * across France, Colombia and Ukraine is a concrete argument for integrating
 * with a distributed international team — much stronger than a sentence
 * claiming you will.
 */
export default function Global() {
  const m = moduleById('global');
  const education = global.education.filter((e) => e.visibility === 'public');
  const places = global.international.filter((i) => i.visibility === 'public');

  return (
    <Stratum
      id="global"
      depth={m.depth}
      index="07"
      title="Education & International Experience"
      lede="Where the work has taken me."
    >
      {/* Education */}
      <div className="mb-12">
        {education.map((e) => (
          <div key={e.id}>
            <h3 className="text-lg" style={{ color: 'var(--color-ink)' }}>
              {e.qualification}
            </h3>
            <p className="mt-1 text-sm" style={{ color: 'var(--color-accent)' }}>
              {e.institution}
              {e.location ? ` · ${e.location}` : ''}
            </p>
            <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--color-muted)' }}>
              {[e.grade, e.from && e.to ? `${e.from}–${e.to}` : e.from].filter(Boolean).join(' · ')}
            </p>
            {e.detail ? (
              <p
                className="mt-3 max-w-2xl text-[15px] leading-relaxed"
                style={{ color: 'var(--color-muted)' }}
              >
                {e.detail}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <hr className="rule mb-10" />

      {/* International — four location cards */}
      <div className="grid gap-px sm:grid-cols-2" style={{ background: 'var(--color-line)' }}>
        {places.map((p) => (
          <div
            key={p.id}
            className="p-5"
            style={{
              background: 'var(--color-surface)',
              ...(p.forwardLooking ? { boxShadow: 'inset 0 0 0 1px var(--color-accent)' } : {}),
            }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-base" style={{ color: 'var(--color-ink)' }}>
                {p.place}
              </h3>
              <span className="font-mono text-[10px] tracking-wider" style={{ color: 'var(--color-accent)' }}>
                {p.duration}
              </span>
            </div>
            <p className="mt-2 text-[15px] leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              {p.what}
            </p>
            {p.forwardLooking ? (
              <p className="mt-3 font-mono text-[10px] tracking-wider uppercase" style={{ color: 'var(--color-accent-2)' }}>
                Where I am heading
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </Stratum>
  );
}
