import Stratum from '../../components/Stratum';
import { about } from '../../data/about.data';
import { moduleById } from '../../data/moduleById';

export default function About() {
  const m = moduleById('about');

  return (
    <Stratum
      id="about"
      depth={m.depth}
      index="02"
      title="About"
      lede={about.opener}
    >
      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {about.paragraphs.map((p) => (
          <div key={p.heading}>
            <h3
              className="mb-3 text-base font-semibold"
              style={{ color: 'var(--color-accent)' }}
            >
              {p.heading}
            </h3>
            <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-ink)' }}>
              {p.body}
            </p>
          </div>
        ))}
      </div>

      {/* Languages — being visibly *working on it* beats a claim of competence. */}
      <div className="mt-12">
        <h3
          className="mb-4 font-mono text-[10px] tracking-[0.2em] uppercase"
          style={{ color: 'var(--color-muted)' }}
        >
          Languages
        </h3>
        <ul className="grid gap-px sm:grid-cols-2" style={{ background: 'var(--color-line)' }}>
          {about.languages.map((lang) => (
            <li
              key={lang.name}
              className="flex items-center justify-between gap-4 px-4 py-3"
              style={{ background: 'var(--color-bg)' }}
            >
              <span className="text-sm" style={{ color: 'var(--color-ink)' }}>
                {lang.name}
              </span>
              <span className="flex items-center gap-3">
                {typeof lang.progress === 'number' ? (
                  <span
                    className="hidden h-1 w-16 rounded-full sm:block"
                    style={{ background: 'var(--color-line)' }}
                    aria-hidden="true"
                  >
                    <span
                      className="block h-1 rounded-full"
                      style={{
                        width: `${lang.progress}%`,
                        background: 'var(--color-accent)',
                      }}
                    />
                  </span>
                ) : null}
                <span className="font-mono text-[11px]" style={{ color: 'var(--color-muted)' }}>
                  {lang.level}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Stratum>
  );
}
