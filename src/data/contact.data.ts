import type { ContactData } from '../types/content';
import { site } from './site.config';

export const contact: ContactData = {
  heading: 'Get in touch',
  blurb:
    'Open to reservoir engineering roles in Norway and internationally. Tap to copy any detail — that is usually the fastest way to reach me.',
  channels: [
    {
      id: 'email',
      label: 'Email',
      value: site.social.email ?? '',
      href: `mailto:${site.social.email}`,
      copyable: true,
    },
    {
      id: 'phone',
      label: 'Phone',
      value: site.social.phone ?? '',
      href: `tel:${(site.social.phone ?? '').replace(/[^\d+]/g, '')}`,
      copyable: true,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/pranay-ism',
      href: site.social.linkedin ?? '',
      copyable: true,
    },
    {
      id: 'github',
      label: 'GitHub',
      value: 'github.com/pranay-gpt',
      href: site.social.github ?? '',
      copyable: true,
    },
  ],
  form: {
    // Endpoint left empty: the form is designed and rendered, but disabled
    // until you add a free Formspree / Web3Forms endpoint. See HOW-TO-UPDATE.md.
    enabled: false,
    endpoint: '',
  },
  closing: 'Thanks for reading this far.',
};
