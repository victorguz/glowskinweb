declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

let scriptReady = false;

function ensureScript(): void {
  if (typeof window === 'undefined' || scriptReady) return;
  if (window.fbq) {
    scriptReady = true;
    return;
  }
  const f = window;
  const b = document;
  const e = 'script';
  const v = 'https://connect.facebook.net/en_US/fbevents.js';
  // Meta base pixel bootstrap (same behavior as official snippet)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let n: any;
  if (f.fbq) return;
  n = f.fbq = function (this: unknown, ...args: unknown[]) {
    n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];
  const t = b.createElement(e);
  t.async = true;
  t.src = v;
  const s = b.getElementsByTagName(e)[0];
  s?.parentNode?.insertBefore(t, s);
  scriptReady = true;
}

export const facebookPixel = {
  init(pixelId: string): void {
    if (typeof window === 'undefined') return;
    ensureScript();
    window.fbq?.('init', pixelId);
    window.fbq?.('track', 'PageView');
  },

  emitEvent(opts: {
    eventName: string;
    eventSourceUrl: string;
    customData?: Record<string, unknown>;
  }): void {
    if (typeof window === 'undefined' || !window.fbq) return;
    const { eventName, customData } = opts;
    window.fbq('track', eventName, customData);
  },
};
