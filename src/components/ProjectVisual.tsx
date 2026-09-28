import type { Project } from '../types/content';

/**
 * PROJECT VISUAL — original constructs only.
 *
 * Hard rule from the plan (§5.4): no employer screenshots, no reproduction of
 * internal tooling, no real reservoir data. Everything here is either the
 * project's own open-source imagery (yours to publish) or a synthetic figure
 * built in SVG to demonstrate the *method*.
 *
 * A designed mockup beats a screenshot: it shows UI skill, which a capture of
 * internal tooling does not.
 */
export default function ProjectVisual({ project }: { project: Project }) {
  switch (project.visual) {
    case 'screenshot':
      return <ScreenshotFrame project={project} />;
    case 'contour':
      return <ContourTransform />;
    case 'srp':
      return <SrpDiagnostic />;
    case 'architecture':
      return <AgentArchitecture />;
    case 'decision':
      return <DecisionMatrix />;
    case 'pta':
      return <DerivativePlot />;
    default:
      return null;
  }
}

function Frame({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <figure
      className="mt-5 overflow-hidden rounded-md"
      style={{ background: 'var(--color-bg)', boxShadow: 'inset 0 0 0 1px var(--color-line)' }}
    >
      <div className="aspect-[16/10] w-full">{children}</div>
      <figcaption
        className="px-3 py-2 font-mono text-[10px] tracking-wide"
        style={{ color: 'var(--color-muted)' }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

/** Open-source projects: a device frame. Screenshots attach in Phase 5. */
function ScreenshotFrame({ project }: { project: Project }) {
  return (
    <Frame caption={`${project.title} — illustrative. Real screenshots wired up in Phase 5.`}>
      <div className="flex h-full items-center justify-center p-4">
        <div
          className="flex h-full w-full flex-col gap-2 rounded-md p-3"
          style={{ background: 'var(--color-surface-2)', boxShadow: 'inset 0 0 0 1px var(--color-line)' }}
        >
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full" style={{ background: 'var(--color-line)' }} />
            <span className="h-2 w-2 rounded-full" style={{ background: 'var(--color-line)' }} />
            <span className="h-2 w-2 rounded-full" style={{ background: 'var(--color-line)' }} />
          </div>
          <div className="grid flex-1 grid-cols-3 gap-1.5" aria-hidden="true">
            <div className="rounded" style={{ background: 'var(--color-surface)' }} />
            <div className="col-span-2 rounded" style={{ background: 'var(--color-surface)' }} />
            <div className="rounded" style={{ background: 'var(--color-surface)' }} />
            <div className="rounded" style={{ background: 'var(--color-surface)' }} />
            <div className="rounded" style={{ background: 'var(--color-surface)' }} />
          </div>
        </div>
      </div>
    </Frame>
  );
}

/** F-1: legacy contour map resolving into a simulation-ready surface. */
function ContourTransform() {
  return (
    <Frame caption="Contour map → simulation-ready surface. Synthetic data.">
      <svg viewBox="0 0 320 200" className="h-full w-full" role="img" aria-label="Contour lines resolving into a mesh">
        {/* Left: crude legacy scan */}
        <g>
          <rect x="0" y="0" width="160" height="200" fill="#0d1119" />
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M ${8 + i * 3} ${100 + i * 7} Q ${80} ${70 + i * 9}, ${152 - i * 3} ${104 + i * 7}`}
              fill="none"
              stroke="#3d4a5c"
              strokeWidth="0.9"
              strokeDasharray={i % 2 ? '2 3' : undefined}
            />
          ))}
          <text x="10" y="188" fill="#8b9ab0" fontSize="7" fontFamily="monospace">LEGACY JPEG</text>
        </g>
        {/* Right: reconstructed surface */}
        <g transform="translate(160,0)">
          <rect x="0" y="0" width="160" height="200" fill="#0a0e14" />
          {Array.from({ length: 10 }).map((_, r) =>
            Array.from({ length: 10 }).map((_, c) => {
              const z = 34 + Math.sin(c * 0.7) * 12 + Math.cos(r * 0.8) * 9;
              return (
                <rect
                  key={`${r}-${c}`}
                  x={c * 15 + 6}
                  y={r * 15 + 6}
                  width={13}
                  height={13}
                  fill={`rgba(76,194,255,${(z / 100).toFixed(3)})`}
                />
              );
            }),
          )}
          <text x="10" y="188" fill="#4cc2ff" fontSize="7" fontFamily="monospace">3D SURFACE</text>
        </g>
      </svg>
    </Frame>
  );
}

/** F-3: three-stage SRP diagnostic. */
function SrpDiagnostic() {
  return (
    <Frame caption="Load imbalance · skin index · cycle optimum. Synthetic data.">
      <svg viewBox="0 0 320 200" className="h-full w-full" role="img" aria-label="Pumping unit load curve, skin index comparison, and cycle optimisation">
        {/* (a) pumping-unit load curve with imbalance */}
        <g transform="translate(6,10)">
          <text x="0" y="0" fill="#8b9ab0" fontSize="7" fontFamily="monospace">A · LOAD</text>
          <polyline
            points="0,60 20,22 40,60 60,66 80,30 100,66 120,72 140,36 160,72"
            fill="none"
            stroke="#4cc2ff"
            strokeWidth="1.4"
          />
          <line x1="100" y1="0" x2="100" y2="78" stroke="#ffb454" strokeWidth="1" strokeDasharray="3 3" />
          <text x="103" y="10" fill="#ffb454" fontSize="6" fontFamily="monospace">IMBALANCE</text>
          <line x1="0" y1="72" x2="160" y2="72" stroke="#1e2a3a" strokeWidth="1" />
        </g>
        {/* (b) skin index before/after */}
        <g transform="translate(180,10)">
          <text x="0" y="0" fill="#8b9ab0" fontSize="7" fontFamily="monospace">B · SKIN</text>
          {[
            { h: 46, label: 'W1' },
            { h: 62, label: 'W2' },
            { h: 30, label: 'W3' },
            { h: 54, label: 'W4' },
          ].map((d, i) => (
            <g key={d.label} transform={`translate(${i * 26}, 12)`}>
              <rect x="0" y={62 - d.h} width="9" height={d.h} fill="#3d4a5c" />
              <rect x="11" y={62 - d.h * 0.55} width="9" height={d.h * 0.55} fill="#4cc2ff" />
              <text x="4" y="74" fill="#8b9ab0" fontSize="6" fontFamily="monospace">{d.label}</text>
            </g>
          ))}
        </g>
        {/* (c) ML predicted vs actual cycle optimum */}
        <g transform="translate(6,110)">
          <text x="0" y="0" fill="#8b9ab0" fontSize="7" fontFamily="monospace">C · CYCLE OPTIMUM</text>
          <path d="M 0 70 C 40 70, 60 20, 130 16 S 240 14, 310 14" fill="none" stroke="#ffb454" strokeWidth="1.4" />
          <path d="M 0 70 C 40 68, 62 28, 130 24 S 240 22, 310 22" fill="none" stroke="#4cc2ff" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="0" y1="70" x2="310" y2="70" stroke="#1e2a3a" strokeWidth="1" />
        </g>
      </svg>
    </Frame>
  );
}

/** F-4: agent architecture with an explicit human-in-the-loop boundary. */
function AgentArchitecture() {
  const box = (x: number, y: number, w: number, h: number, label: string, tone: 'in' | 'agent' | 'out' | 'human') => {
    const fill = tone === 'agent' ? 'rgba(76,194,255,0.10)' : tone === 'human' ? 'rgba(255,180,84,0.10)' : 'var(--color-surface-2)';
    const stroke = tone === 'agent' ? 'rgba(76,194,255,0.35)' : tone === 'human' ? 'rgba(255,180,84,0.35)' : 'var(--color-line)';
    return (
      <g key={label}>
        <rect x={x} y={y} width={w} height={h} rx="3" fill={fill} stroke={stroke} strokeWidth="1" />
        <text x={x + w / 2} y={y + h / 2 + 3} fill="#e8edf4" fontSize="7" fontFamily="monospace" textAnchor="middle">
          {label}
        </text>
      </g>
    );
  };

  return (
    <Frame caption="Agent loop with the human-in-the-loop boundary marked. Synthetic data.">
      <svg viewBox="0 0 320 200" className="h-full w-full" role="img" aria-label="Agent architecture: inputs, agent loop, autonomous actions, human boundary">
        {box(4, 14, 62, 22, 'SCADA', 'in')}
        {box(4, 42, 62, 22, 'SQL / API', 'in')}
        {box(4, 70, 62, 22, 'PYTHON', 'in')}

        <path d="M 66 25 L 92 25 L 92 60 L 104 60" fill="none" stroke="#4cc2ff" strokeWidth="1" />
        <path d="M 66 53 L 104 53" fill="none" stroke="#4cc2ff" strokeWidth="1" />
        <path d="M 66 81 L 92 81 L 92 60 L 104 60" fill="none" stroke="#4cc2ff" strokeWidth="1" />

        {box(104, 34, 74, 40, 'AGENT LOOP', 'agent')}

        <path d="M 178 48 L 200 48" fill="none" stroke="#4cc2ff" strokeWidth="1" markerEnd="" />
        {box(200, 26, 66, 22, 'REPORTS', 'out')}
        {box(200, 58, 66, 22, 'ALARMS', 'out')}

        {/* Autonomous action */}
        <path d="M 141 74 L 141 100 L 92 100 L 92 128" fill="none" stroke="#4cc2ff" strokeWidth="1" />
        {box(20, 128, 68, 24, 'PLC ACTION', 'out')}

        {/* The boundary. This is what makes the diagram credible. */}
        <line x1="100" y1="112" x2="292" y2="112" stroke="#ffb454" strokeWidth="1" strokeDasharray="4 3" />
        <text x="296" y="115" fill="#ffb454" fontSize="6" fontFamily="monospace" textAnchor="end">
          HUMAN
        </text>
        {box(200, 128, 66, 24, 'ENGINEER', 'human')}

        <text x="20" y="176" fill="#8b9ab0" fontSize="7" fontFamily="monospace">
          300+ manual hours / year eliminated
        </text>
      </svg>
    </Frame>
  );
}

/** F-5: options vs risk decision matrix. */
function DecisionMatrix() {
  return (
    <Frame caption="Opportunity against capital at risk. Illustrative — no real project data.">
      <svg viewBox="0 0 320 200" className="h-full w-full" role="img" aria-label="Exploration options plotted against capital at risk and uncertainty">
        <line x1="34" y1="176" x2="308" y2="176" stroke="#1e2a3a" strokeWidth="1" />
        <line x1="34" y1="176" x2="34" y2="14" stroke="#1e2a3a" strokeWidth="1" />
        <text x="34" y="190" fill="#8b9ab0" fontSize="7" fontFamily="monospace">CAPITAL AT RISK →</text>
        <text x="10" y="24" fill="#8b9ab0" fontSize="7" fontFamily="monospace">SIZE</text>
        {/* Quadrant guides */}
        <line x1="170" y1="176" x2="170" y2="14" stroke="#1e2a3a" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="34" y1="96" x2="308" y2="96" stroke="#1e2a3a" strokeWidth="1" strokeDasharray="3 4" />
        {/* Risked options, sized by uncertainty */}
        {[
          { x: 92, y: 62, r: 7 },
          { x: 142, y: 44, r: 9 },
          { x: 196, y: 78, r: 6 },
          { x: 236, y: 40, r: 11 },
          { x: 264, y: 118, r: 8 },
        ].map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill="rgba(76,194,255,0.22)"
            stroke="#4cc2ff"
            strokeWidth="1.2"
          />
        ))}
        <text x="200" y="30" fill="#ffb454" fontSize="7" fontFamily="monospace">SCREEN ZONE</text>
      </svg>
    </Frame>
  );
}

/** F-6: log-log derivative with flow-regime boundaries. */
function DerivativePlot() {
  return (
    <Frame caption="Pressure transient with the buildup interval identified. Synthetic data.">
      <svg viewBox="0 0 320 200" className="h-full w-full" role="img" aria-label="Log-log derivative plot showing pressure buildup interval and flow regimes">
        <line x1="24" y1="176" x2="308" y2="176" stroke="#1e2a3a" strokeWidth="1" />
        <line x1="24" y1="14" x2="24" y2="176" stroke="#1e2a3a" strokeWidth="1" />
        {/* Highlighted PBU interval */}
        <rect x="96" y="14" width="150" height="162" fill="rgba(76,194,255,0.05)" />
        <text x="100" y="26" fill="#4cc2ff" fontSize="6" fontFamily="monospace">PBU</text>
        {/* Pressure decline */}
        <path d="M 28 34 C 60 40, 84 66, 96 96 L 246 168" fill="none" stroke="#4cc2ff" strokeWidth="1.5" />
        {/* Derivative */}
        <path d="M 96 96 L 110 118 L 124 128 L 138 132 L 200 136 L 246 138" fill="none" stroke="#ffb454" strokeWidth="1.3" />
        <circle cx="124" cy="128" r="2.5" fill="#ffb454" />
        <text x="128" y="124" fill="#ffb454" fontSize="6" fontFamily="monospace">RADIAL</text>
        <text x="30" y="46" fill="#8b9ab0" fontSize="6" fontFamily="monospace">WELLBORE STORAGE</text>
        <text x="186" y="26" fill="#8b9ab0" fontSize="6" fontFamily="monospace">BOUNDARY</text>
        <text x="30" y="192" fill="#8b9ab0" fontSize="7" fontFamily="monospace">LOG TIME →</text>
      </svg>
    </Frame>
  );
}
