import type { GlobalData } from '../types/content';

export const global: GlobalData = {
  education: [
    {
      id: 'iit',
      institution: 'Indian Institute of Technology (ISM)',
      location: 'Dhanbad, India',
      qualification: 'Bachelor of Technology, Petroleum Engineering',
      detail: 'Minor in Computer Science and Engineering — the origin of the digital half of this career, not a bolt-on.',
      grade: 'CGPA 8 / 10',
      from: '2015',
      to: '2019',
      visibility: 'public',
    },
  ],

  international: [
    {
      id: 'france',
      place: 'France',
      country: 'France',
      what: 'Technical seminar for field engineers and geoscientists, Schlumberger.',
      duration: '10 days',
      visibility: 'public',
    },
    {
      id: 'colombia',
      place: 'Colombia',
      country: 'Colombia',
      what: 'Field internship with the CSS team — steam injection parameter optimisation supporting thermal recovery operations.',
      duration: '5 weeks',
      visibility: 'public',
    },
    {
      id: 'ukraine',
      place: 'Ukraine',
      country: 'Ukraine',
      what: 'Global volunteering internship — partnered with 20+ schools and NGOs to drive waste-management awareness.',
      duration: '5 weeks',
      visibility: 'public',
    },
    {
      id: 'norway',
      place: 'Norway',
      country: 'Norway',
      what: 'Working knowledge of the Norwegian continental shelf through client work. Norwegian study in progress.',
      duration: 'ongoing',
      forwardLooking: true,
      visibility: 'public',
    },
  ],
};
