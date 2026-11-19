import { Link } from 'react-router-dom';
import { isWeeztixConfigured, event, links } from '../config/site';
import { combos, drinks, formatPrice } from '../content/menu';
import { usePageMeta } from '../hooks/usePageMeta';
import { useViewItemList } from '../hooks/useAnalytics';
import { TicketButton } from '../components/TicketButton';
import { Tag } from '../components/Sticker';
import { Burger, Cup, Flame, HotDog, Sparkle } from '../components/illustrations/Illustrations';

const listItems = combos.map((c, i) => ({
  item_id: c.id,
  item_name: c.name,
  price: c.priceCents / 100,
  index: i,
  quantity: 1,
}));

export default function Menu() {
  usePageMeta('/menu');
  const listRef = useViewItemList<HTMLUListElement>('menu_combos', 'Menu & Tickets combos', listItems);

  const hasFoodInfo =
    drinks.confirmed || combos.some((c) => c.ingredients.confirmed || c.allergens.confirmed);

  return (
    <>
      <section className="page-hero page-hero--orange" aria-labelledby="menu-title">
        <Sparkle className="deco deco--sparkle-2" />
        <div className="container">
          <Tag rotate={-3}>Menu &amp; Tickets</Tag>
          <h1 id="menu-title" className="display display--hero">
            Pick your combo.
          </h1>
          <p className="page-hero__sub">Good food for a good cause.</p>
          <p className="page-hero__meta">
            {event.dateLabel} · {event.timeLabel} · {event.venue.name}
          </p>
        </div>
      </section>

      <section id="combos" className="section section--cream" aria-label="Combos">
        <div className="container">
          <div className="included-note">
            <Flame className="included-note__icon" />
            <p>
              <strong>Your combo includes your spot at the BBQ.</strong>{' '}
              Choose your combo and complete your booking in our ticket shop.
            </p>
          </div>

          <ul className="combo-grid" ref={listRef}>
            {combos.map((c, i) => (
              <li key={c.id} className={`combo-card combo-card--${i % 2 ? 'dark' : 'orange'}`}>
                <div className="combo-card__art">
                  {c.illustration === 'burger' ? <Burger className="art-main" /> : <HotDog className="art-main" />}
                  <Cup className="art-cup" />
                  <p className="combo-card__price" aria-hidden="true">
                    {formatPrice(c.priceCents)}
                  </p>
                </div>
                <div className="combo-card__body">
                  <h2 className="display display--lg">{c.name}</h2>
                  <ul className="combo-card__list">
                    <li>{c.contents}</li>
                    <li>{c.includesSpot}</li>
                  </ul>
                  {c.ingredients.confirmed && c.ingredients.items.length > 0 && (
                    <p className="combo-card__info">
                      <strong>Ingredients:</strong> {c.ingredients.items.join(', ')}
                    </p>
                  )}
                  {c.allergens.confirmed && c.allergens.items.length > 0 && (
                    <p className="combo-card__info">
                      <strong>Allergens:</strong> {c.allergens.items.join(', ')}
                    </p>
                  )}
                  <div className="combo-card__footer">
                    <p className="combo-card__price-text">
                      <span className="visually-hidden">Price: </span>
                      {formatPrice(c.priceCents)}
                    </p>
                    <TicketButton combo={c} />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {!isWeeztixConfigured && (
            <p className="status-note" role="status">
              <strong>Tickets coming soon.</strong> Our ticket shop isn't open yet — check back shortly to book your
              combo.
            </p>
          )}

          {drinks.confirmed && drinks.items.length > 0 && (
            <div className="drinks">
              <h2 className="display display--md">Pick your drink</h2>
              <ul className="chips">
                {drinks.items.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          )}
          {!hasFoodInfo && (
            <p className="muted-note">
              Drink options, ingredients and allergen information will be added here once confirmed.
            </p>
          )}
        </div>
      </section>

      <section className="section section--white" aria-labelledby="how-title">
        <div className="container">
          <h2 id="how-title" className="display display--xl">
            How booking works
          </h2>
          <ol className="steps">
            <li>
              <span className="steps__num" aria-hidden="true">1</span>
              <h3>Pick your combo</h3>
              <p>Burger or hot dog — each comes with a drink and your spot at the BBQ.</p>
            </li>
            <li>
              <span className="steps__num" aria-hidden="true">2</span>
              <h3>Book in our ticket shop</h3>
              <p>
                You'll continue to our ticket shop, powered by {links.ticketShopProvider}. Choose how many combos you need, add your
                details and pay there.
              </p>
            </li>
            <li>
              <span className="steps__num" aria-hidden="true">3</span>
              <h3>Bring your friends</h3>
              <p>One ticket = one combo + one spot. Booking for friends? Just pick one per person.</p>
            </li>
          </ol>
          <p className="steps__more">
            More questions? <Link to="/faq" className="text-link">Read the FAQs →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
