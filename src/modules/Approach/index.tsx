import Stratum from '../../components/Stratum';
import Pop from '../../components/Pop';
import { approach } from '../../data/approach.data';

/**
 * HOW I WORK
 *
 * Term + one line each. Deliberately short: five principles is the most a
 * reader will absorb, and a sixth would turn a position into a list.
 */
export default function Approach() {
  return (
    <Stratum
      id="approach"
      index="04"
      title="How I work"
      lede={approach.intro}
    >
      <ul className="flex flex-col gap-2.5">
        {approach.principles.map((p, i) => (
          <Pop
            key={p.term}
            as="li"
            delay={Math.min(i, 4)}
            className="rounded-[20px]"
          >
            <div
              className="grid gap-1.5 rounded-[20px] p-5 sm:grid-cols-[minmax(180px,26%)_1fr] sm:gap-6 md:p-6"
              style={{ background: '#fff', boxShadow: 'var(--shadow-sm)' }}
            >
              <h3 className="text-[15px] leading-snug" style={{ color: 'var(--color-accent)' }}>
                {p.term}
              </h3>
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {p.body}
              </p>
            </div>
          </Pop>
        ))}
      </ul>
    </Stratum>
  );
}
