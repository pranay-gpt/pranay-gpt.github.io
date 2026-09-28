# How to update this site

You never need to touch a `.tsx` file. **Everything you will ever change lives in
`src/data/`.**

---

## The one rule

| You want to… | You edit |
|---|---|
| Change a number, a bullet, a project | the matching file in `src/data/` |
| Reorder, hide, or add a whole section | `src/data/modules.ts` |
| Change your name, links, SEO | `src/data/site.config.ts` |
| Add a certificate or award | see *Adding a new section* below |

The `.tsx` files under `src/modules/` and `src/components/` are presentation only.
They read your data and render it. They contain no content of their own.

---

## The most common edits

### Change a number in the impact grid

`src/data/impact.data.ts` → find the metric → edit `value`, `label` or `sublabel`.

```ts
{
  value: 300,          // the number
  suffix: '+',         // what follows it
  label: 'manual hours / year',
  sublabel: 'Automated production reporting on my field',
  visibility: 'public',
}
```

### Edit a job

`src/data/experience.data.ts`. Each role has `groups`, and each group has `bullets`.
Add or remove a bullet by adding or removing one object:

```ts
{
  text: 'What you did, in one line.',
  evidence: ['skill:pta'],     // optional: links this to a skill
  // visibility omitted = public. Only add it to HIDE something.
}
```

### Edit the hero

`src/data/hero.data.ts` — `kicker`, `name`, `tagline`, `summary`, and the `ctas` list.

### Change your email or LinkedIn

`src/data/site.config.ts` → `social`. The contact tiles, hero buttons and the
`mailto:` links all read from there. Change it once.

### Add a project

`src/data/projects.data.ts` → append to `projects`:

```ts
{
  id: 'my-project',              // unique, used for anchors
  tier: 'field',                 // 'open-source' or 'field'
  title: 'Project name',
  role: 'What you did on it',
  repo: 'https://github.com/…',   // optional
  problem: '…',
  approach: '…',
  outcome: '… include a number …',
  visual: 'dashboard',           // see the list below
  images: [                      // optional; open-source repos only
    { src: './img/screenshot.png', alt: 'What the screen shows' },
  ],
  badges: ['MIT', '3★'],
  tags: ['Python', 'React'],
  visibility: 'public',
}
```

**`visual` options:** `contour` · `srp` · `architecture` · `decision` · `pta` ·
`dashboard`. Each maps to a hand-built SVG figure in
`src/components/ProjectVisual.tsx`. If you want a new one, tell me and I'll add it.

**Adding a screenshot:** drop the file in `src/public/img/` and add it to the project's
`images` array. `alt` text is required — an image without it is worse than no image.
Set `featured: true` to give a card the large image-led treatment at the top of the
section. **Employer work carries no images**; its figures are the synthetic SVGs.

---

## Hiding something without deleting it

Every content item takes a `visibility` flag:

| Value | Effect |
|---|---|
| `'public'` | Shown in full. **This is the default — you can omit the field entirely.** |
| `'link-only'` | Shown as a summary only, details withheld. Use for something sensitive. |
| `'private'` | Not rendered at all. The data stays in the file, ready to switch on. |

This is how the certificates work: add them as `'private'`, and flip one word when
you're ready. Nothing else changes.

**Example — the exploration bullet that hides the commercial details:**

```ts
{
  text: 'Prospect names, project economics and bid outcomes withheld as commercially confidential.',
  // no visibility field = public
}
```

---

## Adding a whole new section

Six steps, all copy-and-edit. No component changes, ever.

```bash
# 1. Copy an existing module
cp -r src/modules/Publications src/modules/Awards

# 2. Point it at your new id
#    in src/modules/Awards/index.tsx, change id="publications" → id="awards"

# 3. Copy the data file
cp src/data/publications.data.ts src/data/awards.data.ts

# 4. Edit the data — delete what you don't want, add your awards

# 5. Register it
#    in src/data/modules.ts add:
#    { id: 'awards', enabled: true, depth: 1290, nav: true },

# 6. Add the route
#    in src/App.tsx, add to REGISTRY:
#    awards: Awards,
#    and import it at the top.
```

Then `git push`. The nav, the depth gauge, the anchors and the render order all pick
it up automatically.

**To hide a section** instead: set `enabled: false`. Nothing else.

---

## Enable the contact form

The form is built but switched off, because it needs a free endpoint.

1. Sign up at [formspree.io](https://formspree.io) (free tier) or
   [web3forms.com](https://web3forms.com).
2. Copy the endpoint URL you get.
3. In `src/data/contact.data.ts`:

```ts
form: {
  enabled: true,
  endpoint: 'https://formspree.io/f/YOUR_ID',
},
```

Done. The form renders and delivers.

---

## Run it locally

```bash
cd site
npm install     # first time only
npm run dev     # http://localhost:5173
```

**Check it on your phone** — this is the primary target, and testing on a laptop is how
you ship a site that dies on the device it will be read on. On the same Wi-Fi:

```bash
npm run dev -- --host
# then open http://<your-mac's-LAN-IP>:5173 on your phone
```

---

## Publish

Every push to `main` deploys automatically.

```bash
cd site
npm run build   # must pass before you push
git add -A
git commit -m "content: update project outcomes"
git push
```

Live in about two minutes at `https://pranay-gpt.github.io/`.

**Run `npm run build` before every commit.** A failed build fails the deploy rather
than taking the site down, but it's better to catch it locally.

---

## What not to publish

Hard rules, from the confidentiality review. These are not stylistic preferences:

- **No exploration, economics or bid data.** No block identifiers, no IRR/NPV/CAPEX,
  no production profiles, no prospect names, no bid outcomes. The capability is
  described; the numbers are not shown.
- **No GAIL, Schlumberger, GSPC or ONGC screenshots** of any kind, including the E&P
  newsletter.
- **All chart and dashboard data is synthetic.** One fictional field across the whole
  site.
- **The exceptions:** the Urja Varta 2025 ANK-XX figures (published, co-authored, GSPC
  gave written permission) and your own open-source repos' screenshots.

If you're unsure whether something is safe, ask before adding it.

---

## Adding a principle to "How I work"

`src/data/approach.data.ts` → append to `principles`. Keep it to a short term and one
line of body text. Five is already the limit; a sixth turns a position into a list.

---

## The design rules, so edits stay consistent

- **Light theme.** White canvas (`--color-bg`). Never reintroduce a dark background.
- **One accent colour.** `--accent` mid blue (`#1D5FD0`). If you're using it on more
  than five things, you're using it too much.
- **Rounded.** Cards 20px, images 14px, buttons fully round. Match the existing radii
  rather than inventing new ones.
- **Elevation, not outlines.** Cards get `--shadow-sm`, not a border. A border-only card
  reads as flat.
- **No looping background animation.** Static gradients only. The earlier animated
  strata background was uncomfortable and has been removed for good.
- **Scroll motion is one-shot.** `Pop` fires once, then leaves the element alone. No
  loops, no re-triggering.
- **Mobile first.** Designed at 390px. If something looks right on desktop and cramped
  on a phone, it's wrong.
- **Tap targets ≥ 44px.** No exceptions.
- **No hover-only information.** Anything revealed on hover must also be reachable by
  tap.
- **Every claim carries a number** or a named outcome. "Improved efficiency" is not a
  claim; "20% SRP efficiency gain on a USD 40M asset" is.

---

## Project structure

```
site/src/
├── data/          ← YOU EDIT THIS. Nothing else.
├── modules/       ← one folder per section. Presentation only.
├── components/    ← shared building blocks (Stratum, Tag, CountUp, ProjectVisual)
├── lib/           ← hooks (useReveal, useCopyToClipboard, …)
├── types/         ← content.ts, the contract between data and modules
└── styles/        ← index.css, design tokens
```

If you need something that isn't here, add it to `types/content.ts` first, then to the
data file. You should never need to open a module.
