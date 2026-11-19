import { event, links, venueOneLine } from '../config/site';

/** Google Maps search for the real address (no invented coordinates). */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueOneLine)}`;

export const whatsappUrl = links.whatsappNumber
  ? `https://wa.me/${links.whatsappNumber}?text=${encodeURIComponent(links.whatsappPrefill)}`
  : '';

/** iCalendar file with the exact UTC instants derived from the ISO dates in config. */
export function buildIcs(): string {
  const toUtc = (iso: string) =>
    new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n');
  const url = typeof window !== 'undefined' ? window.location.origin : '';
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Cozy BBQ//Event//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-TIMEZONE:${event.timeZone}`,
    'BEGIN:VEVENT',
    `UID:cozy-bbq-${toUtc(event.startISO)}@cozybbq`,
    `DTSTAMP:${toUtc(new Date().toISOString())}`,
    `DTSTART:${toUtc(event.startISO)}`,
    `DTEND:${toUtc(event.endISO)}`,
    `SUMMARY:${esc(event.name)}`,
    `DESCRIPTION:${esc(`${event.tagline} Student charity BBQ supporting 3FM Serious Request.${url ? ` ${url}` : ''}`)}`,
    `LOCATION:${esc(venueOneLine)}`,
    url ? `URL:${url}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean);
  return lines.join('\r\n') + '\r\n';
}

export function downloadIcs() {
  const blob = new Blob([buildIcs()], { type: 'text/calendar;charset=utf-8' });
  const href = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = href;
  a.download = 'cozy-bbq.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}

/**
 * UTM convention (see README). Use these to build links for Instagram,
 * Meta campaigns and partners — they are not used on the site itself.
 */
export const utmPresets = {
  instagramBio: { utm_source: 'instagram', utm_medium: 'social', utm_campaign: 'cozy_bbq_2026', utm_content: 'bio' },
  instagramStory: { utm_source: 'instagram', utm_medium: 'social', utm_campaign: 'cozy_bbq_2026', utm_content: 'story' },
  metaAds: { utm_source: 'meta', utm_medium: 'paid_social', utm_campaign: 'cozy_bbq_2026' },
  partner: (partner: string) => ({ utm_source: partner, utm_medium: 'partner', utm_campaign: 'cozy_bbq_2026' }),
};

export function withUtm(url: string, params: Record<string, string>) {
  const u = new URL(url);
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
  return u.toString();
}
