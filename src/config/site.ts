/**
 * COZY BBQ — CENTRAL CONFIGURATION
 * ------------------------------------------------------------------
 * Every event fact, external link and integration ID lives here.
 * Values marked `PENDING` are intentionally empty: the site shows a
 * graceful fallback until a real, verified value is added.
 *
 * External URLs/IDs can also be set through Netlify environment
 * variables (see .env.example). An env var always wins over the value
 * written in this file.
 */

const env = (key: string): string => {
  const value = (import.meta.env as Record<string, string | undefined>)[key];
  return typeof value === 'string' ? value.trim() : '';
};

export const event = {
  name: 'Cozy BBQ',
  tagline: 'Good food. Good company. Good cause.',
  /** Human-readable values (shown on the site). */
  dateLabel: '6 December 2026',
  timeLabel: '12:30–14:30',
  /** Machine-readable values (calendar file, structured data). */
  startISO: '2026-12-06T12:30:00+01:00',
  endISO: '2026-12-06T14:30:00+01:00',
  timeZone: 'Europe/Amsterdam',
  venue: {
    name: 'BBQ veld Kralingse Bos',
    postalCode: '3062 CJ',
    city: 'Rotterdam',
    country: 'The Netherlands',
  },
  audience: 'University and international students in Rotterdam',
} as const;

export const venueOneLine = `${event.venue.name}, ${event.venue.postalCode} ${event.venue.city}, ${event.venue.country}`;

export const links = {
  /**
   * PENDING — our own Weeztix shop, e.g. https://shop.weeztix.com/<shop-id>/tickets
   * Until set, booking buttons show "Tickets coming soon" (disabled).
   */
  weeztixShopUrl: env('VITE_WEEZTIX_SHOP_URL') || '',
  /**
   * PENDING — the page of OUR OWN fundraising action on the 3FM Serious Request
   * platform. Until set, the site shows "Learn about the cause" (official info page).
   */
  donationUrl: env('VITE_DONATION_URL') || '',
  /** Official 3FM page about starting/joining an action (informational fallback). */
  causeInfoUrl: 'https://www.npo3fm.nl/kominactie',
  /** PENDING — e.g. https://www.instagram.com/cozybbq.rotterdam */
  instagramUrl: env('VITE_INSTAGRAM_URL') || '',
  /**
   * PENDING — WhatsApp number in international format, digits only, no "+"
   * (e.g. 31612345678). Until set, WhatsApp links are hidden.
   */
  whatsappNumber: (env('VITE_WHATSAPP_NUMBER') || '').replace(/\D/g, ''),
  whatsappPrefill: 'Hi! I have a question about Cozy BBQ.',
} as const;

export const analytics = {
  /** PENDING — GA4 measurement ID, format G-XXXXXXXXXX. Empty = analytics fully inactive. */
  ga4MeasurementId: env('VITE_GA4_MEASUREMENT_ID') || '',
  /** Bump this to ask every visitor for consent again (e.g. after adding a new tool). */
  consentVersion: 1,
  /** Months before we ask again. */
  consentMaxAgeMonths: 12,
} as const;

export const fundraising = {
  currency: 'EUR',
  /** Net fundraising goal in euros. */
  goal: 200,
  /**
   * PENDING — only fill in with a REAL, VERIFIED net amount (after costs).
   * Never derive it from ticket sales. `null` = only the goal is shown.
   */
  raisedVerified: null as number | null,
  /** ISO date of the last verified update, e.g. '2026-12-10'. Required when raisedVerified is set. */
  raisedUpdatedAt: null as string | null,
} as const;

export const images = {
  hero: {
    /** Responsive sources generated from the original photo (see README). */
    srcSet: [
      { src: '/images/kralingse-bos-sunset-640.webp', width: 640 },
      { src: '/images/kralingse-bos-sunset-1024.webp', width: 1024 },
      { src: '/images/kralingse-bos-sunset-1536.webp', width: 1536 },
    ],
    fallback: '/images/kralingse-bos-sunset-1536.jpg',
    width: 1536,
    height: 1024,
    alt: 'Sunset over the Kralingse Plas: two friends sit on a wooden jetty with the Rotterdam skyline glowing orange behind them.',
    /** Photo credit, if the photographer requires one. PENDING: none was supplied with the file. */
    credit: '',
  },
  /** Optional custom logo file (e.g. '/brand/cozy-bbq-logo.svg'). Empty = built-in wordmark. */
  logoSrc: '',
  causeLogo: { src: '/brand/npo-3fm-logo-320.webp', width: 320, height: 214, alt: 'NPO 3FM logo' },
  ogImage: '/images/og-image.jpg',
} as const;

export const isWeeztixConfigured = /^https:\/\/\S+$/i.test(links.weeztixShopUrl);
export const isDonationConfigured = /^https:\/\/\S+$/i.test(links.donationUrl);
export const isInstagramConfigured = /^https:\/\/(www\.)?instagram\.com\/\S+$/i.test(links.instagramUrl);
export const isWhatsappConfigured = links.whatsappNumber.length >= 8;
export const isGa4Configured = /^G-[A-Z0-9]{4,}$/.test(analytics.ga4MeasurementId);
