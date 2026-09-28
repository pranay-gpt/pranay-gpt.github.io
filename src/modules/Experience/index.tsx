import { useState } from 'react';
import Stratum from '../../components/Stratum';
import Tag from '../../components/Tag';
import { experience } from '../../data/experience.data';
import { moduleById } from '../../data/moduleById';
import type { Role } from '../../types/content';

/**
 * EXPERIENCE — work history first, not side projects.
 *
 * Desktop: 130px mono date column + content, hairline rules, dim highlight.
 * Mobile: date becomes one line above the entry. Content unchanged.
 *
 * Each role shows a one-line summary and expands on tap into the full card,
 * so the default view is scannable and the detail is on demand. No hover-only
 * information anywhere — this is a touch-first rule.
 */
export default function Experience() {
  const m = moduleById('experience');
  const roles = experience.roles.filter((r) => r.visibility === 'public');

  return (
    <Stratum
      id="experience"
      depth={m.depth}
      index="03"
      title="Experience"
      lede="Seven years across two companies, in the order they happened."
    >
      <ol className="flex flex-col">
        {roles.map((role, i) => (
          <li key={role.id}>
            {i > 0 && <hr className="rule my-8 md:my-10" />}
            <RoleCard role={role} />
          </li>
        ))}
      </ol>
    </Stratum>
  );
}

function RoleCard({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);

  return (
    <article>
      {/* Two-column grid on desktop; single column on mobile. */}
      <div className="grid gap-3 md:grid-cols-[130px_1fr] md:gap-8">
        {/* Dates — muted mono column on desktop, line above on mobile */}
        <div
          className="order-1 font-mono text-xs tracking-wide md:pt-1"
          style={{ color: 'var(--color-muted)' }}
        >
          <span className="md:block">{role.from}</span>
          <span className="md:hidden"> — </span>
          <span className="md:block">{role.to}</span>
        </div>

        <div className="order-2">
          <h3 className="text-lg md:text-xl" style={{ color: 'var(--color-ink)' }}>
            {role.company}
          </h3>
          <p
            className="mt-1 text-sm font-medium"
            style={{ color: 'var(--color-accent)' }}
          >
            {role.title}
          </p>
          <p
            className="mt-1 font-mono text-[11px]"
            style={{ color: 'var(--color-muted)' }}
          >
            {role.location}
          </p>

          {/* Scope — the statement that reframes everything beneath it. */}
          {role.scope ? (
            <blockquote
              className="mt-4 border-l-2 py-1 pl-4 text-sm leading-relaxed"
              style={{
                borderColor: 'var(--color-accent)',
                color: 'var(--color-ink)',
                background: 'transparent',
              }}
            >
              {role.scope}
            </blockquote>
          ) : null}

          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            {role.summary}
          </p>

          {/* Tap to expand. Always available, never hover-only. */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={`${role.id}-detail`}
            className="mt-4 inline-flex min-h-11 items-center gap-2 font-mono text-xs tracking-wide"
            style={{ color: 'var(--color-accent)' }}
          >
            <span>{open ? '− Hide detail' : '+ Show detail'}</span>
            <span aria-hidden="true">{open ? '↑' : '↓'}</span>
          </button>

          <div id={`${role.id}-detail`} hidden={!open}>
            <div className="mt-5 flex flex-col gap-7">
              {role.groups.map((group) => {
                const bullets = group.bullets.filter((b) => (b.visibility ?? 'public') === 'public');
                if (!bullets.length) return null;
                return (
                  <div key={group.heading}>
                    <h4
                      className="mb-2 font-mono text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: 'var(--color-accent-2)' }}
                    >
                      {group.heading}
                    </h4>
                    <ul className="flex flex-col gap-2.5">
                      {bullets.map((b, bi) => (
                        <li
                          key={bi}
                          className="flex gap-3 text-[15px] leading-relaxed"
                          style={{ color: 'var(--color-ink)' }}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full"
                            style={{ background: 'var(--color-accent)' }}
                          />
                          <span>{b.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              <div className="flex flex-wrap gap-1.5 pt-1">
                {role.tags.map((t) => (
                  <Tag key={t} tone="muted">
                    {t}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
