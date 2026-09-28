import { useState } from 'react';
import Stratum from '../../components/Stratum';
import { contact } from '../../data/contact.data';
import { moduleById } from '../../data/moduleById';
import { useCopyToClipboard } from '../../lib/useCopyToClipboard';

/**
 * CONTACT — click-to-copy is the single most-used feature on any contact
 * section, especially on a phone. Every tile is a 44px+ tap target and
 * copying gives immediate feedback.
 *
 * The form renders but is disabled until you add a free Formspree /
 * Web3Forms endpoint in src/data/contact.data.ts. See HOW-TO-UPDATE.md.
 */
export default function Contact() {
  const m = moduleById('contact');
  const { copied, copy } = useCopyToClipboard();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const formReady = contact.form.enabled && contact.form.endpoint.length > 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formReady) return;
    setSending(true);
    try {
      const res = await fetch(contact.form.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setSent(true);
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch {
      // Swallow: the copy tiles above always work as a fallback, and a failed
      // fetch on a static host should not look like a broken page.
    } finally {
      setSending(false);
    }
  }

  return (
    <Stratum id="contact" depth={m.depth} index="08" title={contact.heading} lede={contact.blurb}>
      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        {/* Channels */}
        <div className="flex flex-col gap-px" style={{ background: 'var(--color-line)' }}>
          {contact.channels.map((c) => (
            <div
              key={c.id}
              className="flex flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center"
              style={{ background: 'var(--color-bg)' }}
            >
              <div className="min-w-0">
                <p
                  className="font-mono text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {c.label}
                </p>
                <p className="truncate text-sm" style={{ color: 'var(--color-ink)' }}>
                  {c.value}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                {c.copyable ? (
                  <button
                    type="button"
                    onClick={() => copy(c.value, c.id)}
                    className="inline-flex min-h-11 items-center rounded-full px-4 font-mono text-[11px] transition-colors"
                    style={{
                      background: 'var(--color-surface)',
                      color: copied === c.id ? 'var(--color-accent-2)' : 'var(--color-ink)',
                      boxShadow: 'inset 0 0 0 1px var(--color-line)',
                    }}
                  >
                    {copied === c.id ? 'Copied' : 'Copy'}
                  </button>
                ) : null}
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex min-h-11 items-center rounded-full px-4 font-mono text-[11px] transition-colors"
                  style={{
                    background: 'var(--color-surface)',
                    color: 'var(--color-ink)',
                    boxShadow: 'inset 0 0 0 1px var(--color-line)',
                  }}
                >
                  Open
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div>
          {sent ? (
            <div
              className="rounded-lg p-6"
              style={{ background: 'var(--color-surface)', boxShadow: 'inset 0 0 0 1px var(--color-accent)' }}
              role="status"
            >
              <p style={{ color: 'var(--color-ink)' }}>Message sent. I will get back to you.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <Field
                id="name"
                label="Name"
                value={name}
                onChange={setName}
                disabled={!formReady}
                required
              />
              <Field
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                disabled={!formReady}
                required
              />
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--color-muted)' }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={!formReady}
                  required
                  className="w-full rounded-md p-3 text-[15px] disabled:opacity-50"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-line)',
                    color: 'var(--color-ink)',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={!formReady || sending}
                className="inline-flex min-h-11 items-center justify-center rounded-full px-5 font-mono text-xs transition-opacity disabled:opacity-40"
                style={{ background: 'var(--color-accent)', color: 'var(--color-bg)' }}
              >
                {sending ? 'Sending…' : 'Send message'}
              </button>
              {!formReady ? (
                <p className="font-mono text-[10px]" style={{ color: 'var(--color-muted)' }}>
                  Form disabled — email me directly using the tile on the left.
                </p>
              ) : null}
            </form>
          )}

          <p
            className="mt-8 border-l-2 pl-4 text-[15px] leading-relaxed"
            style={{ borderColor: 'var(--color-accent)', color: 'var(--color-ink)' }}
          >
            {contact.closing}
          </p>
        </div>
      </div>
    </Stratum>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  disabled,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] uppercase"
        style={{ color: 'var(--color-muted)' }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        className="min-h-11 w-full rounded-md p-3 text-[15px] disabled:opacity-50"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-line)',
          color: 'var(--color-ink)',
          fontFamily: 'var(--font-body)',
        }}
      />
    </div>
  );
}
