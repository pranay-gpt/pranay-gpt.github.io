import type { HeroData } from '../types/content';
import { site } from './site.config';

export const hero: HeroData = {
  kicker: 'Reservoir Engineer',
  name: site.name,
  tagline: 'Simulation · Subsurface · Applied AI',
  summary:
    'Senior Officer (E&P) at GAIL India — in charge of reservoir and production engineering. Seven years across Schlumberger and GAIL. I also build the tooling: an MIT-licensed open-source reservoir simulation workbench now used by university students.',
  ctas: [
    { label: 'LinkedIn', href: site.social.linkedin ?? '', kind: 'link' },
    { label: 'Email', href: `mailto:${site.social.email}`, kind: 'link' },
    { label: 'GitHub', href: site.social.github ?? '', kind: 'link' },
  ],
  depthLabel: '0 m MD',
};
