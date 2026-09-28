import type { SkillsData } from '../types/content';

export const skills: SkillsData = {
  /**
   * The ordering IS the argument. Reservoir is the foundation; digital is the
   * multiplier. Any other order reads as "engineer who dabbles in Python."
   */
  order: ['reservoir', 'digital', 'agentic', 'tooling', 'languages'],

  groups: [
    {
      id: 'reservoir',
      label: 'Reservoir Engineering',
      items: [
        {
          label: 'Dynamic Simulation — Eclipse, Petrel, Intersect',
          evidence: ['exp:gail:sub', 'exp:slb:sim'],
          highlight: true,
        },
        { label: 'CMG', evidence: ['exp:slb:sim'] },
        { label: 'OPM Flow', evidence: ['proj:opm-ai'], highlight: true },
        { label: 'Material Balance (MBAL)', evidence: ['exp:gail:sub'] },
        { label: 'Nodal Analysis — Prosper, PETEX IPM', evidence: ['exp:gail:sub'] },
        {
          label: 'Ensemble Reservoir Modelling',
          evidence: ['skill:ensemble', 'exp:slb:sim'],
          highlight: true,
        },
        { label: 'Assisted History Matching', evidence: ['skill:ahm'], highlight: true },
        { label: 'Equally Probable Realisations', evidence: ['skill:ensemble'] },
        {
          label: 'Uncertainty Quantification & Post-processing',
          evidence: ['skill:uq', 'exp:slb:sim'],
          highlight: true,
        },
        {
          label: 'Traceability & Technical Robustness',
          evidence: ['skill:traceability', 'proj:stratabench'],
          highlight: true,
        },
        { label: 'Production Forecasting (DCA)', evidence: ['skill:dca', 'exp:gail:sub'] },
        { label: 'Pressure Transient Analysis (PTA)', evidence: ['skill:pta', 'proj:pta'] },
        { label: 'Reserves Estimation (SPE-PRMS)', evidence: ['skill:speprms', 'exp:slb:onsite'] },
        { label: 'Field Development Plan (FDP)', evidence: ['skill:fdp'], highlight: true },
        { label: 'Reservoir Surveillance & Depletion Monitoring', evidence: ['skill:surveillance'] },
        { label: 'EOR & Infill Drilling', evidence: ['skill:eor', 'exp:slb:sim'] },
        { label: 'Thermal Recovery / Steam Injection', evidence: ['exp:intl:colombia'] },
      ],
    },
    {
      id: 'digital',
      label: 'Digital & Data',
      items: [
        { label: 'Python — Pandas, NumPy, Scikit-learn', evidence: ['skill:python'], highlight: true },
        { label: 'OpenCV (Computer Vision)', evidence: ['proj:opencv', 'skill:opencv'] },
        { label: 'Machine Learning', evidence: ['proj:srp', 'skill:ml'], highlight: true },
        { label: 'Generative AI — SLM/LLM Fine-tuning', evidence: ['skill:llm'] },
        { label: 'Power BI', evidence: ['proj:reporting'] },
        { label: 'Production Dashboards', evidence: ['proj:reporting'] },
        {
          label: 'Data Visualisation & Technical Reporting',
          evidence: ['skill:dataviz', 'skill:reporting'],
          highlight: true,
        },
        { label: 'Quality Control & Data Consistency', evidence: ['proj:reporting'] },
        { label: 'Wellsite & Facility Management', evidence: ['exp:gail:production'] },
      ],
    },
    {
      id: 'agentic',
      label: 'Agentic & Automation',
      items: [
        { label: 'n8n Autonomous Agents', evidence: ['proj:agentic', 'skill:agentic'] },
        { label: 'Local LLM Inference, Consumer GPU', evidence: ['skill:llm'] },
        { label: 'SCADA / SQL / API Integration', evidence: ['proj:agentic', 'skill:scada'] },
        { label: 'PLC-Integrated Automated Well Control', evidence: ['proj:agentic'] },
        { label: 'Sensor Data Validation', evidence: ['proj:agentic'] },
        { label: 'Real-Time Production Monitoring', evidence: ['proj:agentic'] },
        { label: 'GitHub-Managed Delivery Pipelines', evidence: ['proj:reporting'] },
      ],
    },
    {
      id: 'tooling',
      label: 'Tooling',
      items: [
        { label: 'Docker', evidence: ['proj:opm-ai'] },
        { label: 'GitHub Actions CI', evidence: ['proj:opm-ai'] },
        { label: 'FastAPI', evidence: ['proj:opm-ai'] },
        { label: 'React', evidence: ['proj:opm-ai'] },
        { label: 'LLM Evaluation & Benchmarking', evidence: ['proj:stratabench'] },
        { label: 'Reproducibility & Audit-Trail Design', evidence: ['proj:stratabench'] },
        { label: 'Streamlit', evidence: ['proj:reporting'] },
        { label: 'Technology Selection — commercial & open-source', evidence: ['proj:opm-ai'] },
      ],
    },
    {
      id: 'languages',
      label: 'Languages',
      items: [
        { label: 'English — C1 Advanced', evidence: [] },
        { label: 'Hindi — Native', evidence: [] },
        { label: 'Spanish — Intermediate', evidence: [] },
        { label: 'German — Beginner, learning', evidence: [] },
        { label: 'Norwegian — Beginner, learning', evidence: [] },
      ],
    },
  ],
};
