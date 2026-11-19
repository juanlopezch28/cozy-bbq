/**
 * FAQ CONTENT
 * Questions with `answer: null` are PENDING and are NOT shown on the site.
 * Only add an answer once the policy / option is confirmed by the team.
 */
import { event, links, isDonationConfigured, isWeeztixConfigured } from '../config/site';
import { combos, formatPrice } from './menu';

export interface FaqItem {
  id: string;
  question: string;
  answer: string | null;
  /** Optional link rendered under the answer. */
  link?: { label: string; to: string; external?: boolean; trackEvent?: 'donate_click' };
}

const [burger, hotdog] = combos;

export const faqs: FaqItem[] = [
  {
    id: 'when-where',
    question: 'When and where is Cozy BBQ?',
    answer: `On ${event.dateLabel} from ${event.timeLabel} at ${event.venue.name}, ${event.venue.postalCode} ${event.venue.city}.`,
    link: { label: 'See location details', to: '/#location' },
  },
  {
    id: 'combo-includes',
    question: 'What does my combo include?',
    answer: `There are two combos: ${burger.contents} for ${formatPrice(burger.priceCents)}, or ${hotdog.contents} for ${formatPrice(hotdog.priceCents)}. Every combo also includes your spot at the BBQ for one person.`,
    link: { label: 'View the menu', to: '/menu' },
  },
  {
    id: 'book-for-friends',
    question: 'Can I book for my friends?',
    answer:
      'Yes. One ticket equals one combo and one spot, so just choose how many combos you need in our ticket shop — one for each person.',
  },
  {
    id: 'how-booking-works',
    question: 'How does the booking work?',
    answer: isWeeztixConfigured
      ? 'Pick your combo on our Menu & Tickets page and complete your booking in our ticket shop, powered by Weeztix. You choose the number of tickets, fill in your details and pay there.'
      : 'Pick your combo on our Menu & Tickets page and complete your booking in our ticket shop, powered by Weeztix. You choose the number of tickets, fill in your details and pay there. The ticket shop opens soon.',
    link: { label: 'Go to Menu & Tickets', to: '/menu' },
  },
  {
    id: 'where-money-goes',
    question: 'Where does the money go?',
    answer:
      'The net proceeds from the BBQ — what is left after covering the event costs — will be donated to 3FM Serious Request, which this year supports the Nederlandse Brandwonden Stichting.',
    link: { label: 'Read about the cause', to: '/cause' },
  },
  {
    id: 'donate-without-attending',
    question: 'Can I donate without attending?',
    answer: isDonationConfigured
      ? 'Absolutely. You can donate directly through our own fundraising page for 3FM Serious Request.'
      : 'Yes — our direct donation page is on its way. In the meantime, you can read more about the campaign on the official 3FM website.',
    link: isDonationConfigured
      ? { label: 'Donate to the cause', to: links.donationUrl, external: true, trackEvent: 'donate_click' }
      : { label: 'Learn about the cause', to: '/cause' },
  },

  // ---- PENDING: add confirmed answers below (hidden while answer is null) ----
  { id: 'book-in-advance', question: 'Do I need to book in advance?', answer: null },
  { id: 'vegetarian', question: 'Are there vegetarian options?', answer: null },
  { id: 'allergens', question: 'What allergens should I know about?', answer: null },
  { id: 'rain', question: 'What happens if it rains?', answer: null },
  { id: 'refunds', question: 'What is the cancellation or refund policy?', answer: null },
];

export const publishedFaqs = faqs.filter((f) => typeof f.answer === 'string' && f.answer.trim() !== '');
