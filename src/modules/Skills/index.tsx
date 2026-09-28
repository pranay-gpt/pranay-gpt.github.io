import { useState } from 'react';
import Stratum from '../../components/Stratum';
import Tag from '../../components/Tag';
import { skills } from '../../data/skills.data';
import { moduleById } from '../../data/moduleById';

/**
 * SKILLS — ordered reservoir → digital → agentic → tooling → languages.
 *
 * That ordering IS the argument: reservoir is the foundation, digital is the
 * multiplier. Any other order reads as "engineer who dabbles in Python."
 *
 * Collapsible groups, and tapping a skill shows where it is evidenced. The
 * evidence panel is the interaction that actually helps a reviewer moving
 * between "can he do this?" and "where's the proof?" — on mobile it scrolls
 * you to the relevant section.
 */
export default function Skills() {
  const m = moduleById('skills');
  const [active, setActive] = useState<string | null>(null);

  const ordered = skills.order
    .map((id) => skills.groups.find((g) => g.id === id))
    .filter((g): g is (typeof skills.groups)[number] => Boolean(g));

  return (
    <Stratum
      id="skills"
      depth={m.depth}
      index="06"
      title="Skills"
      lede="Tap any skill to see where it is evidenced."
    >
      <div className="flex flex-col gap-3">
        {ordered.map((group) => {
          const open = active === group.id;
          return (
            <div
              key={group.id}
              className="overflow-hidden rounded-lg"
              style={{ background: 'var(--color-surface)', boxShadow: 'inset 0 0 0 1px var(--color-line)' }}
            >
              <button
                type="button"
                onClick={() => setActive(open ? null : group.id)}
                aria-expanded={open}
                aria-controls={`skills-${group.id}`}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-base font-medium" style={{ color: 'var(--color-ink)' }}>
                  {group.label}
                </span>
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[11px]" style={{ color: 'var(--color-muted)' }}>
                    {group.items.length}
                  </span>
                  <span aria-hidden="true" style={{ color: 'var(--color-accent)' }}>
                    {open ? '−' : '+'}
                  </span>
                </span>
              </button>

              <div id={`skills-${group.id}`} hidden={!open} className="px-5 pb-5">
                <div className="flex flex-wrap gap-1.5">
                  {group.items
                    .filter((i) => (i.visibility ?? 'public') === 'public')
                    .map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setActive(item.label)}
                        aria-label={`Where is ${item.label} evidenced?`}
                        className="text-left"
                      >
                        <Tag highlight={item.highlight}>{item.label}</Tag>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Evidence panel. Unknown evidence IDs simply render nothing, so adding
          a module later can never break this. */}
      {active && !ordered.some((g) => g.id === active) ? (
        <EvidencePanel
          skillLabel={active}
          onClose={() => setActive(null)}
        />
      ) : null}
    </Stratum>
  );
}

/**
 * Resolves an evidence ID back to a human-readable pointer. The ID scheme is
 * `kind:owner:topic` — e.g. `proj:opm-ai`, `exp:gail:sub`, `skill:ahm`.
 */
function EvidencePanel({ skillLabel, onClose }: { skillLabel: string; onClose: () => void }) {
  const item = skills.groups.flatMap((g) => g.items).find((i) => i.label === skillLabel);
  const evidence = item?.evidence ?? [];

  return (
    <div
      className="mt-6 rounded-lg p-5"
      style={{ background: 'var(--color-surface)', boxShadow: 'inset 0 0 0 1px var(--color-accent)' }}
      role="status"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-muted)' }}>
            Evidenced in
          </p>
          <p className="mt-1 text-base" style={{ color: 'var(--color-ink)' }}>
            {skillLabel}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 px-2 font-mono text-xs"
          style={{ color: 'var(--color-accent)' }}
        >
          Close
        </button>
      </div>

      {evidence.length ? (
        <ul className="mt-4 flex flex-col gap-1.5">
          {evidence.map((e) => (
            <li key={e} className="font-mono text-[11px]" style={{ color: 'var(--color-muted)' }}>
              <span style={{ color: 'var(--color-accent)' }}>›</span> {describeEvidence(e)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm" style={{ color: 'var(--color-muted)' }}>
          Demonstrated throughout the work above rather than in one place.
        </p>
      )}
    </div>
  );
}

const EVIDENCE_LABELS: Record<string, string> = {
  'proj:opm-ai': 'Projects → Open Source → OPM-AI',
  'proj:stratabench': 'Projects → Open Source → StrataBench',
  'proj:opencv': 'Projects → Field Work → Legacy map digitisation pipeline',
  'proj:reporting': 'Projects → Field Work → Production reporting platform',
  'proj:srp': 'Projects → Field Work → ML-driven sucker-rod-pump optimisation',
  'proj:agentic': 'Projects → Field Work → Agentic AI production surveillance',
  'proj:pta': 'Projects → Field Work → Automated pressure transient analysis',
  'exp:gail:sub': 'Experience → GAIL India → Subsurface & Advisory',
  'exp:gail:production': 'Experience → GAIL India → Field Management & Contracts',
  'exp:slb:sim': 'Experience → Schlumberger → Simulation & Uncertainty',
  'exp:slb:onsite': 'Experience → Schlumberger → On-Site, ONGC',
  'exp:intl:colombia': 'International & Education → Colombia',
  'skill:ahm': 'Experience → GAIL India → assisted history matching',
  'skill:ensemble': 'Experience → equally probable realisations and ensemble studies',
  'skill:uq': 'Experience → uncertainty quantification and risk assessment',
  'skill:traceability': 'Experience → traceable, defensible technical work',
  'skill:pta': 'Experience → Schlumberger → pressure transient analysis',
  'skill:fdp': 'Experience → GAIL India → Field Development Planning',
  'skill:speprms': 'Experience → reserves and FDP to SPE-PRMS',
  'skill:economics': 'Experience → Exploration & Investment Analysis',
  'skill:leadership': 'Experience → GAIL India → Field Management & Contracts',
  'skill:reporting': 'Experience → Technical Reporting',
  'skill:dataviz': 'Experience → Technical Reporting',
  'skill:agentic': 'Projects → Agentic AI production surveillance',
  'skill:scada': 'Projects → Agentic AI production surveillance',
  'skill:llm': 'Projects → locally hosted LLM inference',
  'skill:ml': 'Projects → ML-driven sucker-rod-pump optimisation',
  'skill:python': 'Projects → Python tooling across several projects',
  'skill:opencv': 'Projects → Legacy map digitisation pipeline',
  'skill:sim': 'Experience → Schlumberger → dynamic simulation',
  'skill:eor': 'Experience → Schlumberger → EOR and infill drilling',
  'skill:reserves': 'Experience → Schlumberger → reserves estimation',
  'skill:dca': 'Experience → production forecasting and surveillance',
  'skill:surveillance': 'Experience → reservoir surveillance and depletion monitoring',
  'skill:streamlit': 'Projects → Production reporting platform',
};

function describeEvidence(id: string): string {
  return EVIDENCE_LABELS[id] ?? id;
}
