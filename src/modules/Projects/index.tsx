import Stratum from '../../components/Stratum';
import Tag from '../../components/Tag';
import ProjectVisual from '../../components/ProjectVisual';
import { projects } from '../../data/projects.data';
import { moduleById } from '../../data/moduleById';
import type { Project, ProjectTier } from '../../types/content';

/**
 * PROJECTS — two tiers, and the order matters.
 *
 * Open Source leads. Those repos are public, MIT-licensed, verifiable and
 * carry no employer material, so they are the only tier that needs no
 * confidentiality caveat at all. Field work follows, with numbers and
 * outcomes real but data and visuals synthetic or withheld.
 *
 * Card structure: Title · role · Problem / Approach / Outcome · tags · links.
 * Outcome always carries a number or a named outcome.
 */
export default function Projects() {
  const m = moduleById('projects');
  const visible = projects.projects.filter((p) => p.visibility === 'public');

  return (
    <Stratum
      id="projects"
      depth={m.depth}
      index="05"
      title="Projects"
      lede="Open source first, because it is verifiable. Then field work, where the numbers are real but the data is not mine to show."
    >
      <div className="flex flex-col gap-14">
        {projects.tiers.map((tier) => {
          const items = visible.filter((p) => p.tier === tier.id);
          if (!items.length) return null;

          return (
            <section key={tier.id} aria-labelledby={`tier-${tier.id}`}>
              <div className="mb-6 flex flex-wrap items-baseline gap-x-3">
                <h3
                  id={`tier-${tier.id}`}
                  className="font-mono text-xs tracking-[0.2em] uppercase"
                  style={{ color: 'var(--color-accent-2)' }}
                >
                  {tier.label}
                </h3>
                {tier.note ? (
                  <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
                    {tier.note}
                  </span>
                ) : null}
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {items.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Stratum>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="flex flex-col rounded-lg p-5 transition-colors md:p-6"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h4 className="text-lg" style={{ color: 'var(--color-ink)' }}>
          {project.title}
        </h4>
        <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: 'var(--color-muted)' }}>
          {project.tier === ('open-source' satisfies ProjectTier) ? 'Open source' : 'Field'}
        </span>
      </div>

      <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--color-accent)' }}>
        {project.role}
      </p>

      {/* Visual. For screenshots we show the repo's own image; everything else
          is an original synthetic construct (see §5.4 of the plan). */}
      <ProjectVisual project={project} />

      <dl className="mt-5 flex flex-col gap-3">
        <Field term="Problem" text={project.problem} />
        <Field term="Approach" text={project.approach} />
        <Field term="Outcome" text={project.outcome} accent />
      </dl>

      {project.badges?.length ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.badges.map((b) => (
            <Tag key={b} tone="accent">
              {b}
            </Tag>
          ))}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <Tag key={t} tone="muted">
            {t}
          </Tag>
        ))}
      </div>

      {project.repo || project.liveUrl ? (
        <div className="mt-5 flex flex-wrap gap-4">
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-mono text-xs"
              style={{ color: 'var(--color-accent)' }}
            >
              View repository →
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-mono text-xs"
              style={{ color: 'var(--color-accent)' }}
            >
              Live demo →
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
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
        className="font-mono text-[10px] tracking-[0.2em] uppercase"
        style={{ color: accent ? 'var(--color-accent)' : 'var(--color-muted)' }}
      >
        {term}
      </dt>
      <dd
        className="mt-1 text-[15px] leading-relaxed"
        style={{ color: accent ? 'var(--color-ink)' : 'var(--color-muted)' }}
      >
        {text}
      </dd>
    </div>
  );
}
