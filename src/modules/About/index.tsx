import Stratum from '../../components/Stratum';
import Pop from '../../components/Pop';
import { about } from '../../data/about.data';

export default function About() {

  return (
    <Stratum
      id="about"
      index="02"
      title="About"
      lede={about.opener}
    >
      <div className="grid gap-5 md:grid-cols-3 md:gap-4">
        {about.paragraphs.map((p, i) => (
          <Pop
            key={p.heading}
            delay={i}
            className="rounded-[20px] p-5"
          >
            <div
              className="h-full rounded-[20px] p-5"
              style={{ background: '#fff', boxShadow: 'var(--shadow-sm)' }}
            >
              <h3 className="mb-2.5 text-base" style={{ color: 'var(--color-accent)' }}>
                {p.heading}
              </h3>
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {p.body}
              </p>
            </div>
          </Pop>
        ))}
      </div>

      {/* Languages — being visibly *working on it* beats a claim of competence. */}
      <div className="mt-8">
        <h3
          className="mb-4 font-mono text-[10px] font-medium tracking-[0.2em] uppercase"
          style={{ color: 'var(--color-muted)' }}
        >
          Languages
        </h3>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {about.languages.map((lang) => (
            <li
              key={lang.name}
              className="flex items-center justify-between gap-4 rounded-[14px] px-4 py-3"
              style={{ background: 'var(--color-bg-tint)', boxShadow: 'inset 0 0 0 1px var(--color-line-soft)' }}
            >
              <span className="text-sm" style={{ color: 'var(--color-ink)' }}>
                {lang.name}
              </span>
              <span className="flex items-center gap-3">
                {typeof lang.progress === 'number' ? (
                  <span
                    className="hidden h-1.5 w-16 rounded-full sm:block"
                    style={{ background: 'var(--color-line)' }}
                    aria-hidden="true"
                  >
                    <span
                      className="block h-1.5 rounded-full"
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
