import { useEffect, useState } from 'react';
import { enabledModules, navModules, NAV_LABELS } from './data/modules';
import { site } from './data/site.config';
import DepthGauge from './components/DepthGauge';

import Hero from './modules/Hero';
import Impact from './modules/Impact';
import About from './modules/About';
import Experience from './modules/Experience';
import Publications from './modules/Publications';
import Projects from './modules/Projects';
import Approach from './modules/Approach';
import Skills from './modules/Skills';
import Global from './modules/Global';
import Contact from './modules/Contact';

/**
 * APP SHELL — the registry is the single source of page order.
 *
 * Adding, removing or reordering a section is an edit to
 * src/data/modules.ts and nothing else.
 *
 * Rule that keeps the architecture honest: no module imports another module.
 * Only components/, lib/ and types/.
 */
const REGISTRY: Record<string, () => React.ReactElement | null> = {
  top: Hero,
  impact: Impact,
  about: About,
  experience: Experience,
  publications: Publications,
  projects: Projects,
  approach: Approach,
  skills: Skills,
  global: Global,
  contact: Contact,
};

export default function App() {
  useJsonLd();

  return (
    <>
      <DepthGauge />
      <SiteHeader />

      <main className="relative">
        {enabledModules.map((m) => {
          const Component = REGISTRY[m.id];
          if (!Component) return null;
          return <Component key={m.id} />;
        })}
      </main>

      <footer style={{ borderTop: '1px solid var(--color-line)' }}>
        <div className="shell py-8">
          <div
            className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
            style={{ color: 'var(--color-muted)' }}
          >
            <p className="text-sm">
              <span style={{ color: 'var(--color-ink)' }}>{site.name}</span> — {site.role}
            </p>
            <p className="font-mono text-[11px]">Built to be read on a phone.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

/**
 * Sticky header. Desktop shows nav; mobile collapses to name + contact,
 * because a 5" screen has no room for eight nav items without eating the fold.
 */
function SiteHeader() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-print="hide"
      className="site-header fixed inset-x-0 top-0 z-40 transition-all duration-200"
      style={{
        background: solid ? 'rgba(255,255,255,0.86)' : 'transparent',
        backdropFilter: solid ? 'blur(12px)' : 'none',
        borderBottom: solid ? '1px solid var(--color-line)' : '1px solid transparent',
      }}
    >
      <div className="shell flex min-h-16 items-center justify-between gap-3">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="-my-2 inline-flex min-h-11 items-center py-2 text-sm font-medium"
          style={{ color: 'var(--color-ink)' }}
        >
          {site.name}
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Sections">
          {navModules.map((m) => (
            <a
              key={m.id}
              href={`#${m.id}`}
              className="rounded-full px-3 py-2 text-[13px] transition-colors"
              style={{ color: 'var(--color-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent)';
                e.currentTarget.style.background = 'var(--color-accent-soft)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-muted)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {NAV_LABELS[m.id] ?? m.id}
            </a>
          ))}
        </nav>

        {/* Mobile: one button. A hamburger hiding seven items is worse. */}
        <a
          href="#contact"
          className="inline-flex min-h-11 items-center rounded-full px-5 text-sm font-medium md:hidden"
          style={{ background: 'var(--color-accent)', color: '#fff' }}
        >
          Contact
        </a>
      </div>
    </header>
  );
}

/**
 * JSON-LD Person schema, emitted at runtime so it lives in site.config.ts
 * alongside everything else — one place to edit.
 */
function useJsonLd() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(site.jsonLd);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);
}
