import { event, links, isWeeztixConfigured, images } from '../config/site';
import { combos } from '../content/menu';

/** schema.org Event structured data, generated from the central config. */
export function EventJsonLd() {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: `${event.tagline} A student charity BBQ supporting 3FM Serious Request.`,
    startDate: event.startISO,
    endDate: event.endISO,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: [origin + images.ogImage],
    location: {
      '@type': 'Place',
      name: event.venue.name,
      address: {
        '@type': 'PostalAddress',
        postalCode: event.venue.postalCode,
        addressLocality: event.venue.city,
        addressCountry: 'NL',
      },
    },
    ...(isWeeztixConfigured
      ? {
          offers: combos.map((c) => ({
            '@type': 'Offer',
            name: c.name,
            price: (c.priceCents / 100).toFixed(2),
            priceCurrency: 'EUR',
            url: c.shopUrl || links.weeztixShopUrl,
          })),
        }
      : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
