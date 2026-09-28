import type { ImpactData } from '../types/content';

/**
 * THE FOUR NUMBERS — §3.2
 *
 * Deliberately the most conventional element on the site. It exists so the
 * reader who leaves after 20 seconds still leaves with the four best facts.
 *
 * Every figure here is self-evidenced. The 50% labour / 30% electricity
 * figures from the IEW abstract are deliberately absent — no internal proof,
 * so they do not appear. The published Urja Varta figures are the one
 * exception to "synthetic data only", because they are public record.
 */
export const impact: ImpactData = {
  lede: 'Where the work is, in four numbers.',
  metrics: [
    {
      value: 300,
      suffix: '+',
      label: 'manual hours / year',
      sublabel: 'Automated production reporting on my field',
      visibility: 'public',
    },
    {
      value: 20,
      prefix: '~',
      suffix: '%',
      label: 'SRP efficiency gain',
      sublabel: 'ML-driven skin, load and cycle optimisation',
      visibility: 'public',
    },
    {
      value: 60,
      prefix: 'USD ',
      suffix: 'k+',
      label: 'cost savings',
      sublabel: 'Four reservoir studies, JV advisory',
      visibility: 'public',
    },
    {
      value: 120,
      prefix: 'USD ',
      suffix: 'k',
      label: 'revenue gained',
      sublabel: 'Annually, on a USD 40M asset',
      visibility: 'public',
    },
  ],
};
