import type { PublicationsData } from '../types/content';

export const publications: PublicationsData = {
  items: [
    {
      id: 'urvarta',
      title: 'Revival of Production in a 100% Water Producing Well in a Marginal Field',
      venue: 'Urja Varta 2025 — Directorate General of Hydrocarbons, Bharat Mandapam, New Delhi',
      date: '23 June 2025',
      kind: 'paper',
      role: 'Co-author and speaker · reservoir modelling',
      coAuthors: ['Sanjay Kumar', 'Somenath Ghosh', 'Niral Patel'],
      abstract:
        'A marginal gas field facing permanent closure after a monsoon shut-in left the well producing 100% water. Salinity analysis ruled out the suspected near-zone channeling and pointed to a failed isolation in a deeper zone; pressure analysis confirmed the crossflow mechanism. I built the reservoir model that quantified the water to be drained, giving the field team the confidence to keep producing instead of abandoning the well.',
      highlights: [
        'Channeling ruled out by salinity analysis: 4,400 ppm produced water against 30,000 ppm from the overlying formation — a decisive clue pointing deeper.',
        'A >950 psi differential across zones proved natural crossflow into the depleted interval during shut-in.',
        'Reservoir model estimated ~560 m³ of water injected into the producing zone — my specific contribution, and the number that changed the decision.',
        'Water knock-out: 120 m³ at 7 days → gas shows, 277 m³ at 17 days → oil traces, 427 m³ at 30 days → first measurable oil.',
        'Well restored to its original production rate in around 45 days. A well facing closure came back.',
      ],
      visibility: 'public',
    },
    {
      id: 'iew',
      title: 'Agentic AI for Autonomous Oil Production Surveillance: From DPR Generation to Safe Operations',
      venue: 'India Energy Week 2026',
      date: '2026',
      kind: 'poster',
      role: 'Submitter, Author, Presenter',
      // Co-authors are named in the published abstract, but the public page
      // does not name them. Two of the three are senior enough that listing
      // them alongside a candidate's portfolio reads as borrowed credibility
      // rather than as attribution, and one is a General Manager — naming a GM
      // on someone's portfolio is not the candidate's to offer.
      coAuthors: [],
      abstract:
        'An agentic AI workflow for autonomous production surveillance, combining data integration, anomaly detection, report generation and automated well control in a single system. It retrieves data from plant databases via SCADA, SQL, APIs and Python workflows, validates sensor data, and generates two daily production reports with field overview, production insights, well performance indicators and detected anomalies.',
      highlights: [
        'Deployed on a live onshore facility: 300+ manual hours a year eliminated through automated reporting.',
        'Beyond conventional SCADA alarms — the system flags anomalies, generates full production reports, and executes corrective actions.',
        'Acted on detection: autonomous shutdown on identified pump dry-run, preventing equipment damage.',
        'Diagnosed flowline obstruction from energy-consumption trends before critical failure, avoiding a wellhead stuffing-box rupture and the safety hazard behind it.',
        'Scoped to onshore oil wells and portable to gas wells, offshore environments and artificial lift systems, using standard field sensor infrastructure.',
      ],
      visibility: 'public',
    },
  ],
};
