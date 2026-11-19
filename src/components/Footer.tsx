import { Link } from 'react-router-dom';
import { event, links, isInstagramConfigured, isWhatsappConfigured } from '../config/site';
import { whatsappUrl } from '../lib/links';
import { track } from '../lib/analytics';
import { navItems } from './Header';
import { Logo } from './Logo';
import { openCookieSettings } from './CookieConsent';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo inverted />
          <p className="site-footer__tagline">{event.tagline}</p>
          <p>
            <strong>{event.dateLabel}</strong> · {event.timeLabel}
            <br />
            {event.venue.name}, {event.venue.postalCode} {event.venue.city}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="site-footer__heading">Explore</h2>
          <ul className="site-footer__list">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link to={n.to}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="site-footer__heading">Say hi</h2>
          <ul className="site-footer__list">
            {isInstagramConfigured && (
              <li>
                <a href={links.instagramUrl} target="_blank" rel="noopener">
                  Instagram<span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
            )}
            {isWhatsappConfigured && (
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track('whatsapp_click', { source_page: window.location.pathname, link_location: 'footer' })}
                >
                  WhatsApp<span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
            )}
            <li>
              <Link to="/faq">Questions? Read the FAQs</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="site-footer__heading">Your privacy</h2>
          <ul className="site-footer__list">
            <li>
              <Link to="/privacy">Privacy &amp; cookies</Link>
            </li>
          </ul>
          <button type="button" className="btn btn--outline-light btn--sm" onClick={openCookieSettings}>
            Cookie settings
          </button>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <p>
          © {new Date().getFullYear()} {event.name}. A student-led fundraiser supporting 3FM Serious Request. Not
          organised by NPO 3FM.
        </p>
      </div>
    </footer>
  );
}
