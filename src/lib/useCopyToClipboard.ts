import { useCallback, useState } from 'react';

/**
 * Click-to-copy. The most-used feature on any contact section, especially on a
 * phone. Falls back to a hidden textarea where the async Clipboard API is
 * unavailable (older iOS Safari over http).
 */
export function useCopyToClipboard(resetMs = 1600) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback(
    async (value: string, id: string) => {
      let ok = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
          ok = true;
        }
      } catch {
        ok = false;
      }

      if (!ok) {
        try {
          const ta = document.createElement('textarea');
          ta.value = value;
          ta.setAttribute('readonly', '');
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          ok = document.execCommand('copy');
          document.body.removeChild(ta);
        } catch {
          ok = false;
        }
      }

      if (ok) {
        setCopied(id);
        window.setTimeout(() => setCopied((cur) => (cur === id ? null : cur)), resetMs);
      }
      return ok;
    },
    [resetMs],
  );

  return { copied, copy };
}
