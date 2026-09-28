import type { ExperienceData } from '../types/content';

export const experience: ExperienceData = {
  roles: [
    {
      id: 'gail',
      company: 'GAIL India Ltd',
      title: 'Senior Officer (Exploration & Production)',
      location: 'India',
      from: 'Mar 2022',
      to: 'Present',
      summary:
        'In charge of reservoir engineering and production engineering — exploration evaluation, DGH-approved field development plans, and field operations.',
      scope:
        'Technical in-charge of reservoir engineering and production engineering for the E&P portfolio.',
      tags: [
        'Reservoir Engineering',
        'Production Engineering',
        'Field Development Planning',
        'Techno-Economic Evaluation',
        'Petrel',
        'Eclipse',
        'Machine Learning',
        'Agentic AI',
      ],
      visibility: 'public',
      groups: [
        {
          heading: 'Subsurface & Advisory',
          bullets: [
            {
              text: 'Four reservoir studies for a JV partner, taking each one from scope through delivery to a shared activity plan both parties signed up to.',
              evidence: ['skill:ahm', 'skill:ensemble'],
            },
            {
              text: 'Ensembles of equally probable realisations and assisted history matching workflows for a producing gas field, with every run traceable and technically consistent.',
              evidence: ['skill:ahm', 'skill:ensemble', 'skill:uq', 'skill:traceability'],
            },
            {
              text: 'Rig and rigless intervention optimisation, structured reservoir surveillance and depletion monitoring feeding directly into annual forecasting and business planning.',
              evidence: ['skill:surveillance', 'skill:dca'],
            },
            {
              text: 'Subsurface uncertainty and risk assessments strengthening verification of FDP proposals before they reached decision makers.',
              evidence: ['skill:uq', 'skill:traceability'],
            },
          ],
        },
        {
          heading: 'Field Development Planning',
          bullets: [
            {
              text: 'DGH-approved Field Development Plans at GAIL India — predominantly for a JV partner’s fields — written to SPE-PRMS and taken through regulatory review, with approval secured on scope and schedule.',
              evidence: ['skill:fdp', 'skill:speprms', 'skill:uq'],
            },
            {
              text: 'Full depletion and area development strategies, covering volumetrics, well placement, phasing and deliverability.',
              evidence: ['skill:fdp'],
            },
          ],
        },
        {
          heading: 'Exploration & Investment Analysis',
          bullets: [
            {
              text: 'End-to-end exploration-to-production evaluation and techno-economic screening of new prospects for both bidding and maturation decisions, screening investments from USD 200M to USD 2–4B.',
              evidence: ['skill:economics'],
              visibility: 'public',
            },
            {
              text: 'Reconciled in-place resource across four independent estimates — operator, in-house, third-party consultant and regulatory — and produced a hurdle-based bid/no-bid recommendation.',
              evidence: ['skill:uq', 'skill:traceability', 'skill:economics'],
              visibility: 'public',
            },
            {
              text: 'Prospect names, project economics and bid outcomes withheld as commercially confidential.',
              visibility: 'public',
            },
          ],
        },
        {
          heading: 'Digital & Automation',
          bullets: [
            {
              text: 'Agentic AI production surveillance framework — autonomous daily production report generation, real-time anomaly detection, and PLC-integrated automated well control. Deployed on a live onshore facility; 300+ manual hours a year eliminated.',
              evidence: ['proj:opm-ai', 'skill:agentic', 'skill:scada'],
            },
            {
              text: 'Production reporting platform built in Python, integrated with a data platform and managed in GitHub, automating daily production reporting and surveillance dashboards.',
              evidence: ['skill:python', 'skill:streamlit'],
            },
            {
              text: 'Private agents for real-time production monitoring, running against locally hosted LLM inference on my own hardware.',
              evidence: ['skill:agentic', 'skill:llm'],
            },
          ],
        },
        {
          heading: 'Field Management & Contracts',
          bullets: [
            {
              text: 'Field manager and in-charge for multiple contracts — technical and manpower — on a producing asset of approximately USD 40M, leading a team of 9.',
              evidence: ['skill:leadership'],
            },
            {
              text: 'ML-driven sucker-rod-pump optimisation across three stages — skin diagnosis, dynamometer load balancing and SRP cycle optimisation — delivering roughly 20% improvement in artificial-lift efficiency and recovering several underperforming wells.',
              evidence: ['proj:srp', 'skill:ml', 'skill:python'],
            },
            {
              text: 'Roughly USD 120k revenue improvement, annually, on that asset.',
              evidence: ['skill:leadership'],
            },
            {
              text: 'Cross-functional field leadership of 9, with HSE and structured risk management as how we worked rather than a checklist.',
              evidence: ['skill:leadership'],
            },
          ],
        },
        {
          heading: 'Technical Reporting',
          bullets: [
            {
              text: 'Designed and contributed to a quarterly upstream newsletter for the E&P department — seven-page layout, production and revenue charts, block and basin mapping, and sector analysis — distributed company-wide. Anonymised on request; internal publication.',
              evidence: ['skill:dataviz', 'skill:reporting'],
            },
          ],
        },
      ],
    },

    {
      id: 'slb',
      company: 'Schlumberger (SLB)',
      title: 'Reservoir Simulation Engineer',
      location: 'France & India',
      from: 'Oct 2019',
      to: 'Mar 2022',
      summary:
        'Dynamic simulation and ensemble uncertainty studies for international and Indian operators; eight months on site at ONGC as lead reservoir engineering consultant.',
      tags: [
        'Reservoir Simulation',
        'Ensemble Modelling',
        'History Matching',
        'Reserves Estimation',
        'EOR',
        'Python',
        'OpenCV',
      ],
      visibility: 'public',
      groups: [
        {
          heading: 'Simulation & Uncertainty',
          bullets: [
            {
              text: 'Dynamic reservoir simulation and ensemble uncertainty studies for international and Indian oil & gas operators across Europe and Asia, feeding real FDP, recovery and investment decisions.',
              evidence: ['skill:sim', 'skill:ensemble', 'skill:uq'],
            },
            {
              text: 'EOR option evaluation and infill drilling targets, assembling geology, petrophysics and production data into multi-scenario uncertainty frameworks that gave the client a clear view of risk and opportunity.',
              evidence: ['skill:eor', 'skill:uq'],
            },
          ],
        },
        {
          heading: 'On-Site, ONGC',
          bullets: [
            {
              text: 'Eight months on site at a national oil corporation as lead reservoir engineering consultant — personally owning history matching, PTA, production forecasting and reserves estimation, and presenting findings directly to senior client leadership.',
              evidence: ['skill:pta', 'skill:ahm', 'skill:reserves', 'exp:slb:onsite'],
            },
            {
              text: 'Assets ranged from approximately USD 200M to 800M producing fields in a western Indian state basin.',
              evidence: ['exp:slb:onsite'],
            },
          ],
        },
        {
          heading: 'Tooling & Automation',
          bullets: [
            {
              text: 'Built a Python + OpenCV automated workflow that converted legacy JPEG contour maps into 3D simulation-ready surfaces, cutting turnaround by around 70%. It became a reusable tool other people on the team picked up too.',
              evidence: ['proj:opencv', 'skill:python', 'skill:opencv'],
            },
            {
              text: 'Presented technical findings, FDP documentation and recovery proposals to senior client management, facilitating high-stakes decisions.',
              evidence: ['skill:reporting'],
            },
          ],
        },
      ],
    },
  ],
};
