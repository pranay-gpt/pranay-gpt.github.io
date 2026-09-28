/**
 * Tag — a small pill. Light theme, soft border, generous radius.
 *
 * The `accent` tone is the only place the blue appears as a fill, so the
 * accent count stays inside the five-item discipline from the plan.
 */
export default function Tag({
  children,
  tone = 'default',
  highlight = false,
}: {
  children: React.ReactNode;
  tone?: 'default' | 'muted' | 'accent' | 'outline';
  highlight?: boolean;
}) {
  const base =
    'inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[11px] leading-none';

  if (highlight || tone === 'accent') {
    return (
      <span
        className={base}
        style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent-deep)' }}
      >
        {children}
      </span>
    );
  }

  if (tone === 'outline') {
    return (
      <span
        className={base}
        style={{ background: '#fff', color: 'var(--color-accent-deep)', boxShadow: 'inset 0 0 0 1px var(--color-accent-line)' }}
      >
        {children}
      </span>
    );
  }

  if (tone === 'muted') {
    return (
      <span className={base} style={{ background: 'var(--color-surface)', color: 'var(--color-muted)' }}>
        {children}
      </span>
    );
  }

  return (
    <span
      className={base}
      style={{ background: '#fff', color: 'var(--color-ink-2)', boxShadow: 'inset 0 0 0 1px var(--color-line)' }}
    >
      {children}
    </span>
  );
}
