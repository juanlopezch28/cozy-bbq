import { links, isWeeztixConfigured } from '../config/site';
import type { Combo } from '../content/menu';
import { track } from '../lib/analytics';
import { useLocation } from 'react-router-dom';

interface Props {
  combo?: Combo;
  label?: string;
  className?: string;
}

/**
 * Opens OUR Weeztix shop. Registers `ticket_shop_click` only — never
 * add_to_cart / begin_checkout / purchase (those happen in the shop).
 * Without a configured shop URL it renders a disabled "Tickets coming soon".
 */
export function TicketButton({ combo, label = 'Book your combo', className = '' }: Props) {
  const { pathname } = useLocation();

  if (!isWeeztixConfigured) {
    return (
      <span className={`btn btn--primary btn--lg is-disabled ${className}`} role="link" aria-disabled="true">
        Tickets coming soon
      </span>
    );
  }

  const href = combo?.shopUrl || links.weeztixShopUrl;
  return (
    <a
      className={`btn btn--primary btn--lg ${className}`}
      href={href}
      target="_blank"
      rel="noopener"
      onClick={() =>
        track('ticket_shop_click', {
          combo_id: combo?.id ?? 'none',
          source_page: pathname,
          link_url: href,
          outbound: true,
        })
      }
    >
      {label}
      {combo ? <span className="visually-hidden"> — {combo.name}</span> : null}
      <span className="visually-hidden"> (opens our ticket shop in a new tab)</span>
      <span aria-hidden="true" className="btn__arrow">↗</span>
    </a>
  );
}
