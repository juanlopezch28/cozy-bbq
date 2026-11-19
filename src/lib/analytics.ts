/**
 * GA4 integration — Basic Consent Mode.
 *
 *  - Nothing from Google is loaded or requested until the visitor accepts.
 *  - No GA4 ID configured  → this module never loads anything.
 *  - Consent withdrawn     → measurement stops (consent update + ga-disable
 *    flag) and first-party _ga cookies are deleted.
 *  - Never pass personal data (names, emails, phone numbers) to `track`.
 *
 * Page views are sent manually (send_page_view: false) once per effective
 * visit to a route, so in GA4 → Data streams → Enhanced measurement, turn OFF
 * "Page changes based on browser history events" to avoid duplicates.
 */
import { analytics, isGa4Configured } from '../config/site';

type GtagArgs = [string, ...unknown[]];
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const ID = analytics.ga4MeasurementId;
let scriptInjected = false;
let enabled = false;
let lastPageKey: string | null = null;
let lastPagePath: string | null = null;
let campaignApplied = false;
const sentOnce = new Set<string>();

/** UTM parameters from the landing URL, kept in memory only (no storage before consent). */
const landingCampaign: string = (() => {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  const utm = new URLSearchParams();
  params.forEach((value, key) => {
    if (key.startsWith('utm_') || key === 'gclid') utm.set(key, value);
  });
  return utm.toString();
})();

// gtag.js expects the native `arguments` object to be pushed, not an array.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: GtagArgs) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

export function isAnalyticsActive() {
  return enabled;
}

export function enableAnalytics() {
  if (!isGa4Configured) return;
  window[`ga-disable-${ID}`] = false;

  if (!scriptInjected) {
    scriptInjected = true;
    window.gtag = gtag;
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    gtag('consent', 'update', { analytics_storage: 'granted' });
    gtag('js', new Date());
    const debug = new URLSearchParams(window.location.search).has('ga_debug');
    gtag('config', ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ...(debug ? { debug_mode: true } : {}),
    });
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ID)}`;
    document.head.appendChild(s);
  } else {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
  enabled = true;
}

export function disableAnalytics() {
  const wasEnabled = enabled;
  enabled = false;
  if (!isGa4Configured) return;
  if (scriptInjected && wasEnabled) {
    gtag('consent', 'update', { analytics_storage: 'denied' });
  }
  window[`ga-disable-${ID}`] = true;
  deleteAnalyticsCookies();
}

function deleteAnalyticsCookies() {
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((n) => n === '_ga' || n.startsWith('_ga_') || n === '_gid' || n.startsWith('_gat'));
  if (!names.length) return;
  const parts = window.location.hostname.split('.');
  const domains: string[] = [''];
  for (let i = 0; i < parts.length - 1; i++) domains.push('.' + parts.slice(i).join('.'));
  const expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
  names.forEach((name) =>
    domains.forEach((d) => {
      document.cookie = `${name}=; expires=${expires}; path=/${d ? `; domain=${d}` : ''}`;
    }),
  );
}

/**
 * Sends one page_view per effective visit. `pageKey` must be unique per
 * navigation (React Router's location.key), so re-renders, StrictMode and
 * re-accepting consent on the same page never create duplicates.
 */
export function trackPageView(pageKey: string, path: string) {
  if (!enabled || pageKey === lastPageKey) return;
  lastPageKey = pageKey;
  // Same page again (e.g. tapping "Book your spot" while on /menu, or a #hash jump): not a new visit.
  if (path === lastPagePath) return;
  lastPagePath = path;
  let location = window.location.origin + path;
  if (!campaignApplied) {
    campaignApplied = true;
    // Visitor navigated before accepting: keep the landing campaign for attribution.
    if (landingCampaign && !/[?&]utm_/.test(path)) {
      location += (path.includes('?') ? '&' : '?') + landingCampaign;
    }
  }
  gtag('event', 'page_view', {
    page_location: location,
    page_path: path,
    page_title: document.title,
  });
}

/** Generic event. Pass `onceKey` to guarantee a single send (e.g. view_item_list per visit). */
export function track(name: string, params: Record<string, unknown> = {}, onceKey?: string) {
  if (!enabled) return;
  if (onceKey) {
    if (sentOnce.has(onceKey)) return;
    sentOnce.add(onceKey);
  }
  gtag('event', name, params);
}
