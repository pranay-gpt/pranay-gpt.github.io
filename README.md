# Pranay Gupta — Portfolio

A personal site built as a **core sample**: a unified scrolling page where each
section is a stratum of a drill core, and a depth gauge tracks your descent.

Live: **https://pranay-gpt.github.io/**

<!-- Add your OG image here once generated -->

## Why it's built this way

Reservoir engineers send flat PDFs. This is an argument, not a brochure — and it's
phone-first, because most people will open the link on a phone, on mobile data, from
inside a message.

Three decisions worth knowing about:

- **Phone-first.** Designed at 390px. Desktop is the adaptation, not the reverse. Total
  page weight is under 100 KB gzipped, because a WebGL hero dies on a mid-range
  Android and takes the content down with it.
- **Modular.** All content lives in `src/data/*.ts`, wired through one registry. You
  reorder, hide, add or remove a section without touching a single component. See
  [`HOW-TO-UPDATE.md`](./HOW-TO-UPDATE.md).
- **Legible above all.** Every visual is decorative; every claim is real selectable
  text. It works with JavaScript off, prints as a clean black-on-white document, and
  reads at 200% zoom.

## Stack

React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · GitHub Actions → GitHub Pages

No animation library, no chart library, no CMS. Scroll reveals are a single
IntersectionObserver; every field-work figure is hand-built SVG; the open-source
projects use their own real screenshots. That is most of why the bundle stays small.

The palette is a white canvas with one mid blue and soft blue-tinted shadows, carried
on rounded 20px cards. There is no animated background — the first version had one and
it was uncomfortable.

## Sections

| Section | What it carries |
|---|---|
| Hero | Role, scope, four ways to reach me |
| Impact | Four numbers, no scroll required |
| About | Who, technically · what makes me different · why Norway · languages |
| Experience | GAIL India · Schlumberger, grouped by competency |
| Publications | Urja Varta 2025 · India Energy Week 2026 |
| Projects | Open source (OPM-AI, StrataBench) · field work |
| Skills | Reservoir → digital → agentic → tooling, tap a skill to see the evidence |
| Education & International | IIT (ISM) Dhanbad · France, Colombia, Ukraine, Norway |
| Contact | Click-to-copy channels, form, CV |

## Accessibility

- All 14 text/background pairs meet **WCAG AA** (lowest is 4.86:1).
- `prefers-reduced-motion` is honoured: strata become static bands, reveals become
  instant, the canvas stops. Full content parity, not a degraded version.
- Keyboard navigable, visible focus rings, 44px minimum tap targets, no hover-only
  information.
- The depth gauge is `aria-hidden` — it is decoration, not navigation.

## Content notes

Field-work data is **synthetic**. Exploration and economics content is described as
capability, not disclosed as data. The one exception is the Urja Varta 2025 case study,
which is published, co-authored, and presented with GSPC's written permission.

## Local development

```bash
npm install
npm run dev
npm run build      # typecheck + production build
```

Push to `main` and GitHub Actions deploys it.

## Licence

MIT.
