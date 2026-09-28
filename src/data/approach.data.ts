/**
 * "How I work" — the strongest structural idea borrowed from the reference
 * layout: a short list of principles, each a bold term with one line of
 * explanation.
 *
 * It works because it answers a question a CV never does. Anyone can claim to
 * be competent; a short, specific set of working principles is much harder to
 * fake and much easier to picture someone inside.
 */
export interface Principle {
  term: string;
  body: string;
}

export interface ApproachData {
  intro: string;
  principles: Principle[];
}

export const approach: ApproachData = {
  intro:
    'Seven years in, mostly inside Indian upstream and a global service company, with a technical scope that spans reservoir and production engineering. These are the habits that took me there.',

  principles: [
    {
      term: 'Make it defensible, not just correct',
      body:
        'A model nobody can defend is a model that will not survive a technical review. Equally probable realisations, traceable runs, and stating the uncertainty are not extra work — they are the work.',
    },
    {
      term: 'Reconcile before you decide',
      body:
        'On exploration, I bring operator, in-house, third-party and regulatory resource estimates into one view before recommending anything. The spread between them is information, not noise.',
    },
    {
      term: 'Build the tool, then hand it over',
      body:
        'The contour-map pipeline and the production reporting platform both exist because the manual step was the bottleneck. Both are still in use; the second one saves 300+ hours a year.',
    },
    {
      term: 'Ship outside the org chart too',
      body:
        'Two MIT-licensed open-source projects, built outside employer hours and now used by students who have no access to commercial simulation tooling. The work is better for having left the building.',
    },
    {
      term: 'Safety is a habit, not a checklist',
      body:
        'I have run field operations where HSE and structured risk management were simply how we worked. The agentic surveillance system takes the same view — it acts on a detected pump dry-run rather than waiting to be told.',
    },
  ],
};
