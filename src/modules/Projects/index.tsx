import Stratum from '../../components/Stratum';
import Pop from '../../components/Pop';
import Tag from '../../components/Tag';
import ProjectVisual from '../../components/ProjectVisual';
import { projects } from '../../data/projects.data';
import type { Project } from '../../types/content';

/**
 * PROJECTS
 *
 * Featured (open source) cards lead and are image-led — a real screenshot
 * carries more than any figure I could design, and these are your repos, so
 * there is nothing confidential in them. Field work follows in a denser
 * two-column grid with the original synthetic figures.
 */
export default function Projects() {
  const visible = projects.projects.filter((p) => p.visibility === 'public');
  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

  return (
    <Stratum
      id="projects"
      index="05"
      title="Selected work"
      lede="Open source first, because you can verify it. Then field work, where the outcomes are real but the data is not mine to show."
    >
      {/* ---------------- Featured, image-led ---------------- */}
      {featured.length ? (
        <div className="flex flex-col gap-6">
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} project={p} delay={i} />
          ))}
        </div>
      ) : null}

      {/* ---------------- Field work, dense grid ---------------- */}
      {rest.length ? (
        <div className="mt-12">
          <TierRule />
          {projects.tiers
            .filter((t) => t.id === 'field')
            .map((tier) => {
              const items = rest.filter((p) => p.tier === tier.id);
              if (!items.length) return null;
              return (
                <div key={tier.id}>
                  <div className="mb-5 flex flex-wrap items-baseline gap-x-3">
                    <h3
                      className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {tier.label}
                    </h3>
                    {tier.note ? (
                      <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
                        {tier.note}
                      </span>
                    ) : null}
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    {items.map((p, i) => (
                      <FieldCard key={p.id} project={p} delay={i % 2} />
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      ) : null}
    </Stratum>
  );
}

function TierRule() {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span
        className="h-px flex-1"
        style={{ background: 'linear-gradient(90deg, var(--color-line), transparent)' }}
      />
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-muted)' }}>
        Field work
      </span>
      <span
        className="h-px flex-1"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-line))' }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------------ */

function FeaturedCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Pop
      as="article"
      delay={delay}
      className="overflow-hidden rounded-[20px]"
      // eslint-disable-next-line react/forbid-dom-props
    >
      <div
        className="h-full overflow-hidden rounded-[20px]"
        style={{ background: '#fff', boxShadow: 'var(--shadow-md)' }}
      >
        {/* Image gallery — the first is the hero shot */}
        {project.images?.length ? (
          <div
            className="grid gap-1.5 border-b p-1.5"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-line)',
            }}
          >
            {project.images.slice(0, 2).map((img, i) => (
              <Shot
                key={img.src}
                src={img.src}
                alt={img.alt}
                caption={img.caption}
                first={i === 0}
              />
            ))}
          </div>
        ) : null}

        <div className="p-5 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xl md:text-2xl" style={{ color: 'var(--color-ink)' }}>
                {project.title}
              </h3>
              <p className="mt-1 text-sm" style={{ color: 'var(--color-accent)' }}>
                {project.role}
              </p>
            </div>
            <Tag tone="outline">Open source</Tag>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <Field term="Problem" text={project.problem} />
            <Field term="Approach" text={project.approach} />
          </div>

          <div
            className="mt-5 rounded-[14px] p-4"
            style={{ background: 'var(--color-accent-soft)' }}
          >
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-accent-deep)' }}>
              Outcome
            </p>
            <p className="mt-1.5 text-[15px] leading-relaxed" style={{ color: 'var(--color-ink)' }}>
              {project.outcome}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-1.5">
            {project.badges?.map((b) => (
              <Tag key={b} tone="accent">
                {b}
              </Tag>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {project.tags.map((t) => (
              <Tag key={t} tone="muted">
                {t}
              </Tag>
            ))}
          </div>

          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 items-center gap-1.5 py-2.5 text-sm font-medium"
              style={{ color: 'var(--color-accent)' }}
            >
              View repository
              <span aria-hidden="true">→</span>
            </a>
          ) : null}
        </div>
      </div>
    </Pop>
  );
}

function FieldCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Pop
      as="article"
      delay={delay}
      className="h-full overflow-hidden rounded-[20px]"
    >
      <div
        className="flex h-full flex-col overflow-hidden rounded-[20px] p-5 transition-shadow"
        style={{ background: '#fff', boxShadow: 'var(--shadow-sm)' }}
      >
        <h4 className="text-lg" style={{ color: 'var(--color-ink)' }}>
          {project.title}
        </h4>
        <p className="mt-1 text-sm" style={{ color: 'var(--color-accent)' }}>
          {project.role}
        </p>

        <div className="mt-4">
          <ProjectVisual project={project} />
        </div>

        <dl className="mt-4 flex flex-1 flex-col gap-3">
          <Field term="Problem" text={project.problem} />
          <Field term="Approach" text={project.approach} />
          <Field term="Outcome" text={project.outcome} accent />
        </dl>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.badges?.map((b) => (
            <Tag key={b} tone="accent">
              {b}
            </Tag>
          ))}
          {project.tags.map((t) => (
            <Tag key={t} tone="muted">
              {t}
            </Tag>
          ))}
        </div>
      </div>
    </Pop>
  );
}

/* ------------------------------------------------------------------------ */

function Shot({
  src,
  alt,
  caption,
  first,
}: {
  src: string;
  alt: string;
  caption?: string;
  first?: boolean;
}) {
  return (
    <figure
      className="overflow-hidden"
      style={{
        borderRadius: 'var(--radius-img)',
        boxShadow: 'inset 0 0 0 1px var(--color-line)',
      }}
    >
      <img
        src={src}
        alt={alt}
        loading={first ? 'eager' : 'lazy'}
        decoding="async"
        className="block w-full"
        style={{ aspectRatio: first ? '16 / 10' : '16 / 9', objectFit: 'cover' }}
      />
      {caption ? (
        <figcaption
          className="px-3 py-1.5 font-mono text-[10px]"
          style={{ background: 'var(--color-bg-tint)', color: 'var(--color-muted)' }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Field({
  term,
  text,
  accent = false,
}: {
  term: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <div>
      <dt
        className="font-mono text-[10px] font-medium tracking-[0.18em] uppercase"
        style={{ color: accent ? 'var(--color-accent)' : 'var(--color-muted)' }}
      >
        {term}
      </dt>
      <dd
        className="mt-1 text-[14px] leading-relaxed"
        style={{ color: accent ? 'var(--color-ink)' : 'var(--color-muted)' }}
      >
        {text}
      </dd>
    </div>
  );
}
