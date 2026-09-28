import { useState } from 'react';
import Stratum from '../../components/Stratum';
import Pop from '../../components/Pop';
import Tag from '../../components/Tag';
import { experience } from '../../data/experience.data';
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
  const roles = experience.roles.filter((r) => r.visibility === 'public');

  return (
    <Stratum
      id="experience"
      index="03"
      title="Experience"
      lede="Seven years across two companies, in the order they happened."
    >
      <div className="flex flex-col gap-5">
        {roles.map((role, i) => (
          <RoleCard key={role.id} role={role} delay={i} />
        ))}
      </div>
    </Stratum>
  );
}

function RoleCard({ role, delay }: { role: Role; delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Pop as="article" delay={delay} className="rounded-[20px]">
      <div
        className="rounded-[20px] p-5 md:p-7"
        style={{ background: '#fff', boxShadow: 'var(--shadow-sm)' }}
      >
        {/* Two-column grid on desktop; single column on mobile. */}
        <div className="grid gap-2 md:grid-cols-[124px_1fr] md:gap-7">
        {/* Dates — muted mono column on desktop, line above on mobile */}
        <div
          className="order-1 font-mono text-[11px] tracking-wide md:pt-1"
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
              className="mt-4 rounded-[14px] py-3 pl-4 pr-3 text-sm leading-relaxed"
              style={{
                background: 'var(--color-accent-soft)',
                color: 'var(--color-ink)',
                boxShadow: 'inset 3px 0 0 var(--color-accent)',
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
            className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
            style={{
              background: 'var(--color-accent-soft)',
              color: 'var(--color-accent-deep)',
            }}
          >
            <span>{open ? 'Hide detail' : 'Show detail'}</span>
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
                      className="mb-2 font-mono text-[10px] font-medium tracking-[0.2em] uppercase"
                      style={{ color: 'var(--color-accent)' }}
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
    </div>
    </Pop>
  );
}
