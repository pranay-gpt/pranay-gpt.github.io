import type { SiteConfig } from '../types/content';

export const site: SiteConfig = {
  name: 'Pranay Gupta',
  title: 'Pranay Gupta — Reservoir Engineer',
  role: 'Reservoir Engineer',
  description:
    'Reservoir Engineer at GAIL India, in charge of reservoir and production engineering. Ensemble modelling, assisted history matching, field development planning — and the tooling to make it faster.',
  domain: 'pranay-gpt.github.io',
  locale: 'en',

  social: {
    linkedin: 'https://www.linkedin.com/in/pranay-ism/',
    github: 'https://github.com/pranay-gpt',
    email: 'pranayg498@gmail.com',
    phone: '+91-9525791068',
  },

  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Pranay Gupta',
    jobTitle: 'Reservoir Engineer',
    description:
      'Reservoir Engineer at GAIL India Ltd, in charge of reservoir engineering and production engineering. Specialist in ensemble reservoir modelling, assisted history matching, uncertainty analysis and field development planning.',
    worksFor: {
      '@type': 'Organization',
      name: 'GAIL India Ltd',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Indian Institute of Technology (ISM), Dhanbad',
    },
    knowsAbout: [
      'Reservoir Simulation',
      'Assisted History Matching',
      'Ensemble Reservoir Modelling',
      'Uncertainty Quantification',
      'Field Development Planning',
      'SPE-PRMS',
      'Pressure Transient Analysis',
      'Material Balance',
      'Nodal Analysis',
      'Python',
      'Machine Learning',
      'Agentic AI',
      'Automation',
    ],
  },
};
