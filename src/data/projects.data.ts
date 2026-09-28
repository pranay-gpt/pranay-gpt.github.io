import type { ProjectsData } from '../types/content';

/**
 * Field-work visuals are the original synthetic SVG figures.
 * Open-source projects use the repos' own screenshots — yours to publish.
 */
export const projects: ProjectsData = {
  tiers: [
    {
      id: 'open-source',
      label: 'Open Source',
      note: 'MIT-licensed, built and released free. You can click through and run them.',
    },
    {
      id: 'field',
      label: 'Field Work',
      note: 'Employer projects. The outcomes are real; the data and figures are synthetic or withheld.',
    },
  ],

  projects: [
    /* ---------------------------------------------- TIER 1: OPEN SOURCE -- */
    {
      id: 'opm-ai',
      tier: 'open-source',
      title: 'OPM-AI',
      role: 'Developer and author',
      repo: 'https://github.com/pranay-gpt/opm-ai',
      images: [
        { src: './img/opmai-home.png', alt: 'OPM-AI workbench home screen with the deck generation flow' },
        { src: './img/opmai-kpis.png', alt: 'Results viewer showing a 16-panel KPI grid of simulation results' },
        { src: './img/opmai-plots.png', alt: 'Interactive result plots with a control rail' },
      ],
      problem:
        'Reservoir simulation is bottlenecked by legacy workflows, not by governing equations. OPM Flow gives away an industry-grade three-phase black-oil solver, but the unforgiving Eclipse-style .DATA deck — one misplaced slash and it fails to converge — locks practical reservoir engineering behind a steep learning curve.',
      approach:
        'An intelligent layer between the user and the millions of coupled equations being solved. Plain-English reservoir description in, a valid transparent .DATA deck out, with automated QA/QC before you burn CPU time on an ill-posed model. The run executes, the grid renders, and a chat explains what the numbers mean. The output is a standard .DATA file, not a proprietary binary.',
      outcome:
        'In use by university students and educators who have no access to commercial simulation tooling. Built as free community development, outside employer hours.',
      visual: 'screenshot',
      featured: true,
      badges: ['MIT', '513 tests', 'Used by university students'],
      tags: ['Python', 'FastAPI', 'React 18', 'OPM Flow', 'TypeScript', 'Docker', 'CI'],
      visibility: 'public',
    },
    {
      id: 'stratabench',
      tier: 'open-source',
      title: 'StrataBench',
      role: 'Developer and author',
      repo: 'https://github.com/pranay-gpt/stratabench',
      images: [
        { src: './img/sb-dashboard.png', alt: 'Leaderboard of complete 505-question model evaluations' },
        { src: './img/sb-results.png', alt: 'Run diagnostics with accuracy by domain and answer-behaviour breakdown' },
      ],
      problem:
        'A model can look excellent on a general-purpose leaderboard and still fail on formation evaluation, petrophysics or drilling concepts. Specialist evaluation needs more than a percentage — it needs a pinned dataset, a versioned prompt, transparent failure semantics and question-level evidence.',
      approach:
        'A local-first workbench around the official 505-question FormationEval v0.1 benchmark, pinned to an upstream commit and verified by SHA-256 at startup. Point it at any OpenAI- or Anthropic-compatible endpoint. Every run and every question result persists in local SQLite with a versioned audit export.',
      outcome:
        'Only 505/505 scorable runs count as final. Parse failures count as incorrect and API failures lower coverage — a benchmark that refuses to flatter itself. Ships a full ATTRIBUTION.md crediting the benchmark author.',
      visual: 'screenshot',
      featured: true,
      badges: ['MIT', 'TypeScript', 'Auditable', 'Properly attributed'],
      tags: ['TypeScript', 'Node 22', 'LLM evaluation', 'Benchmarking', 'SQLite', 'Vitest'],
      visibility: 'public',
    },

    /* --------------------------------------------------- TIER 2: FIELD -- */
    {
      id: 'opencv',
      tier: 'field',
      title: 'Legacy map digitisation pipeline',
      role: 'Built and deployed as a team tool',
      problem:
        'Reservoir engineers were still working from scanned JPEG contour maps — a format nobody automates. The maps had to be digitised by hand into something a simulator could consume, and the turnaround was dominated by that manual step.',
      approach:
        'A Python + OpenCV workflow that detects and traces contours in the legacy images and reconstructs them as 3D simulation-ready surfaces, written straight out in a form the simulation tools accept.',
      outcome:
        'Around a 70% cut in turnaround. It became a reusable tool that others on the team picked up without me.',
      visual: 'contour',
      badges: ['~70% turnaround cut', 'Team-wide adoption'],
      tags: ['Python', 'OpenCV', 'Computer Vision', 'Automation'],
      visibility: 'public',
    },
    {
      id: 'reporting',
      tier: 'field',
      title: 'Production reporting platform',
      role: 'Built, integrated and maintained',
      problem:
        'Daily production reporting was manual, slow and error-prone, and the surveillance dashboards that fed it were rebuilt by hand. The team was spending hundreds of hours a year on a process that produced the same numbers every day.',
      approach:
        'A Python reporting platform integrated with a data platform, with the whole codebase managed in GitHub. It automated daily production reports and the surveillance dashboards behind them, and improved data quality in the process.',
      outcome:
        '300+ manual hours a year eliminated, and meaningfully better data quality for ongoing monitoring. Still running in production.',
      visual: 'dashboard',
      badges: ['300+ hrs/yr saved', 'Still in production'],
      tags: ['Python', 'Pandas', 'Streamlit', 'GitHub', 'Dashboards'],
      visibility: 'public',
    },
    {
      id: 'srp',
      tier: 'field',
      title: 'ML-driven sucker-rod-pump optimisation',
      role: 'Field manager and engineer behind the model',
      problem:
        'Sucker-rod-pump wells were underperforming and nobody could say why. Lift efficiency was low on a set of wells, and the usual suspects — skin damage, an unbalanced rod string, a badly set cycle — each needed a different fix, but the diagnosis was manual and slow.',
      approach:
        'Three-stage method. Skin diagnosis to identify positive skin damage as the cause of underperformance. Dynamometer-based load balancing to distribute rod-string load. Then machine learning over cycle timing and production data to find the optimal cycle per well.',
      outcome:
        'Roughly 20% improvement in artificial-lift efficiency, recovering several underperforming wells. On a USD 40M asset I was managing, that work is worth about USD 120k a year.',
      visual: 'srp',
      badges: ['~20% efficiency gain', '~USD 120k/yr', 'USD 40M asset'],
      tags: ['Python', 'Machine Learning', 'Scikit-learn', 'Dynamometer', 'Artificial Lift'],
      visibility: 'public',
    },
    {
      id: 'agentic',
      tier: 'field',
      title: 'Agentic AI production surveillance',
      role: 'Co-author, presenter and builder',
      problem:
        'Daily production reporting and anomaly detection were manual, slow and prone to delay. Conventional SCADA alarms flag a threshold but do not diagnose, do not explain, and do not act — and some of the most serious failures on a facility announce themselves first in the energy data.',
      approach:
        'An agentic workflow pulling from plant databases via SCADA, SQL, APIs and Python, analysing pressure, temperature, flow, pump status, SRP cycle behaviour and energy per cycle. It validates sensor data, generates two production reports a day, and closes the loop by acting on what it finds through PLC integration.',
      outcome:
        '300+ manual hours a year eliminated on my field. Autonomously halted production on a detected pump dry-run, and diagnosed a flowline obstruction from energy trends before critical failure — avoiding a stuffing-box rupture.',
      visual: 'architecture',
      badges: ['300+ hrs/yr', 'Deployed on a live facility', 'Human-in-the-loop'],
      tags: ['n8n', 'Agentic AI', 'LLM', 'SCADA', 'PLC', 'Python', 'SQL'],
      visibility: 'public',
    },
    {
      id: 'exploration',
      tier: 'field',
      title: 'Exploration & investment evaluation',
      role: 'Evaluation and recommendation',
      problem:
        'Exploration opportunities arrive with wildly different resource estimates depending on who produced them, and the bidding decision has to be made on a defensible number rather than the most optimistic one.',
      approach:
        'End-to-end exploration-to-production evaluation. Reconciled in-place resource across four independent estimates — operator, in-house, third-party consultant and regulatory — then built development concepts and production profiles, and screened each prospect against the investment criteria to produce a bid/no-bid recommendation.',
      outcome:
        'Screening investments from USD 200M to USD 2–4B. Prospect names, project economics and bid outcomes withheld as commercially confidential.',
      visual: 'decision',
      badges: ['USD 200M – 2–4B', '4-source reconciliation'],
      tags: ['Techno-Economic Evaluation', 'Volumetrics', 'Risked Resources', 'Decision Analysis'],
      visibility: 'public',
    },
    {
      id: 'pta',
      tier: 'field',
      title: 'Automated pressure transient analysis',
      role: 'Implementation of a published method',
      problem:
        'Pressure buildup interpretation was manual and slow — finding the right interval and identifying flow regimes by eye, one curve at a time, before any of the reservoir properties could be estimated.',
      approach:
        'Implemented the method published in US 20180100948A1 (inventor: Satomi Suzuki, Schlumberger): pattern recognition to identify pressure-buildup intervals, then log-log derivative analysis for flow-regime identification, rather than manual curve interpretation. Credit to the original inventor — this is an implementation, not an invention.',
      outcome:
        'Interval identification and flow-regime interpretation made repeatable rather than subjective, on continuously measured pressure data.',
      visual: 'pta',
      badges: ['Implementation of a published method', 'Credited to the inventor'],
      tags: ['PTA', 'Pattern Recognition', 'Derivative Analysis', 'Well Testing'],
      visibility: 'public',
    },
  ],
};
