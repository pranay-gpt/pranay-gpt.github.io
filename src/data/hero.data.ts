/**
 * The hero's structural idea, borrowed from a layout worth copying: lead with
 * a *thesis*, not a job title. The name and the role are the evidence, not
 * the headline. Then a short credibility strip, which is how a stranger
 * decides whether the thesis is worth reading in the first place.
 */
export interface HeroData {
  kicker: string;
  /** The statement. A point of view, in the reader's language. */
  thesis: string;
  name: string;
  role: string;
  location: string;
  summary: string;
  ctas: { label: string; href: string }[];
  /** "Previously at" strip. Employer names are cleared for publication. */
  credentials: { label: string; sub?: string }[];
  availability: string;
}

export const hero: HeroData = {
  kicker: 'Reservoir Engineer · Open to Norway',

  thesis: 'I build the subsurface tools that do not exist yet.',

  name: 'Pranay Gupta',
  role: 'Senior Officer (Exploration & Production)',
  location: 'GAIL India Ltd',

  summary:
    'Seven years across Schlumberger and GAIL India — reservoir simulation, assisted history matching, and DGH-approved field development plans. In charge of reservoir and production engineering. I also ship the tooling: an MIT-licensed open-source reservoir simulation workbench now used by university students.',

  ctas: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pranay-ism/' },
    { label: 'Email', href: 'mailto:pranayg498@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/pranay-gpt' },
  ],

  credentials: [
    { label: 'GAIL India', sub: 'E&P' },
    { label: 'Schlumberger', sub: '2019–2022' },
    { label: 'ONGC', sub: '8 months on site' },
    { label: 'IIT (ISM) Dhanbad', sub: 'Petroleum Eng.' },
  ],

  availability: 'Available for reservoir engineering roles in Norway and internationally.',
};
