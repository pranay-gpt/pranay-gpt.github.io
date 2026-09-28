import type { AboutData } from '../types/content';

export const about: AboutData = {
  /** Four sentences. Discipline is the point — §3.3. */
  opener:
    'I am a reservoir engineer at GAIL India, where I am in charge of reservoir engineering and production engineering. My work runs from ensemble modelling and assisted history matching through to the DGH-approved field development plans and the daily production numbers. Before GAIL I spent two and a half years at Schlumberger, eight months of it on site at ONGC. I also build the tooling — which is the part I did not expect to become defining.',

  paragraphs: [
    {
      heading: 'Who, technically',
      body:
        'Specialist in ensemble reservoir modelling, assisted history matching, uncertainty analysis and field development planning. I generate equally probable realisations and run AHM workflows where every run is traceable and technically defensible, because a model nobody can defend is a model that will not survive a technical review. Eight months on site at ONGC as lead reservoir engineering consultant, personally owning history matching, PTA, forecasting and reserves estimation. Trained at IIT (ISM) Dhanbad in Petroleum Engineering, with a Computer Science minor — which is where the other half of this started.',
    },
    {
      heading: 'What makes me different from a pure reservoir engineer',
      body:
        'I build the tooling. OPM-AI, an MIT-licensed AI-assisted workbench on the open-source OPM Flow simulator, is now used by university students. Before that, a production reporting platform that eliminated 300+ manual hours a year and is still running; a machine learning model for sucker-rod-pump optimisation worth roughly USD 120k a year on one asset; and a conference paper on bringing a well back from the edge of permanent closure. None of that was assigned. It is the same subsurface instinct, pointed at the friction around the work instead of the physics inside it.',
    },
    {
      heading: 'Why Norway',
      body:
        'Because it is where I want to live and work, not because it is a stepping stone. I have already worked across France, Colombia and Ukraine, and I have seen how Norwegian operators hold subsurface work to account — the Equinor project taught me more about rigour than any standard I have read. I am learning Norwegian, currently at beginner level, with a target of B2 within six months of joining. I do not need sponsorship costs covered; I will handle that myself. Logistics should not be a reason to pass over this application.',
    },
  ],

  languages: [
    { name: 'English', level: 'Advanced · CEFR C1' },
    { name: 'Hindi', level: 'Native' },
    { name: 'Spanish', level: 'Intermediate', learning: true, progress: 45, note: 'learning' },
    { name: 'German', level: 'Beginner', learning: true, progress: 20, note: 'learning' },
    {
      name: 'Norwegian',
      level: 'Beginner',
      learning: true,
      progress: 20,
      note: 'learning · target B2 within 6 months of joining',
    },
  ],
};
