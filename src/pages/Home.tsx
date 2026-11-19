import { Link } from 'react-router-dom';
import { event, images } from '../config/site';
import { combos, formatPrice } from '../content/menu';
import { usePageMeta } from '../hooks/usePageMeta';
import { useViewItemList } from '../hooks/useAnalytics';
import { mapsUrl, downloadIcs } from '../lib/links';
import { Marquee } from '../components/Marquee';
import { EventJsonLd } from '../components/EventJsonLd';
import { SpinSticker, Tag } from '../components/Sticker';
import {
  Burger,
  ComeTogether,
  Cup,
  Flame,
  GiveBack,
  Heart,
  HotDog,
  Pin,
  Sparkle,
  StaySafe,
  Tongs,
} from '../components/illustrations/Illustrations';

const experience = [
  { title: 'Come together', text: 'Meet fellow students and enjoy a BBQ in Rotterdam.', Art: ComeTogether },
  { title: 'Give back', text: 'Help us raise funds for 3FM Serious Request.', Art: GiveBack },
  { title: 'Stay safe', text: 'Enjoy the BBQ with care for each other and the park.', Art: StaySafe },
];

const listItems = combos.map((c, i) => ({
  item_id: c.id,
  item_name: c.name,
  price: c.priceCents / 100,
  index: i,
  quantity: 1,
}));

export default function Home() {
  usePageMeta('/');
  const previewRef = useViewItemList('home_menu_preview', 'Home menu preview', listItems);
  const hero = images.hero;

  return (
    <>
      <EventJsonLd />
      {/* ---------- HERO ---------- */}
      <section className="hero" aria-labelledby="hero-title">
        <picture className="hero__media">
          <source type="image/webp" srcSet={hero.srcSet.map((s) => `${s.src} ${s.width}w`).join(', ')} sizes="100vw" />
          <img
            src={hero.fallback}
            alt={hero.alt}
            width={hero.width}
            height={hero.height}
            {...({ fetchpriority: "high" } as Record<string, string>)}
            decoding="async"
          />
        </picture>
        <div className="hero__shade" aria-hidden="true" />

        <div className="container hero__content">
          <p className="hero__eyebrow">
            <Heart className="hero__eyebrow-icon" /> Student charity BBQ · Rotterdam
          </p>
          <h1 id="hero-title" className="hero__title">
            Cozy <span>BBQ</span>
          </h1>
          <p className="hero__tagline">{event.tagline}</p>
          <p className="hero__lead">Join us for a student BBQ in Kralingse Bos and help support 3FM Serious Request.</p>
          <ul className="hero__facts">
            <li>
              <strong>{event.dateLabel}</strong> · {event.timeLabel}
            </li>
            <li>
              {event.venue.name}, {event.venue.city}
            </li>
          </ul>
          <div className="hero__actions">
            <Link to="/menu" className="btn btn--primary btn--lg">
              Book your spot
            </Link>
            <Link to="/cause" className="btn btn--outline-light btn--lg">
              Discover the cause
            </Link>
          </div>
        </div>
        <SpinSticker text="Food that gives back" className="hero__sticker">
          <Flame />
        </SpinSticker>
        {hero.credit && <p className="hero__credit">Photo: {hero.credit}</p>}
      </section>

      <Marquee words={['Good food', 'Good company', 'Good cause']} />

      {/* ---------- EXPERIENCE ---------- */}
      <section className="section section--cream" aria-labelledby="experience-title">
        <div className="container">
          <div className="section-head">
            <Tag rotate={-3}>The vibe</Tag>
            <h2 id="experience-title" className="display display--xl">
              More than <br className="br-md" />a BBQ
            </h2>
          </div>
          <ul className="experience">
            {experience.map(({ title, text, Art }, i) => (
              <li className="experience__card" key={title} style={{ ['--tilt' as string]: `${[-1.5, 1, -0.5][i]}deg` }}>
                <Art className="experience__art" />
                <h3 className="display display--md">{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- MENU PREVIEW ---------- */}
      <section className="section section--orange menu-preview" aria-labelledby="menu-preview-title" ref={previewRef}>
        <Sparkle className="deco deco--sparkle-1" />
        <Tongs className="deco deco--tongs" />
        <div className="container">
          <div className="section-head section-head--split">
            <h2 id="menu-preview-title" className="display display--xl">
              Two combos. <br />
              Zero regrets.
            </h2>
            <p className="section-head__aside">Every combo comes with a drink — and your spot at the BBQ.</p>
          </div>
          <ul className="preview-grid">
            {combos.map((c, i) => (
              <li key={c.id} className="preview-card">
                <div className="preview-card__art">
                  {c.illustration === 'burger' ? <Burger className="art-main" /> : <HotDog className="art-main" />}
                  <Cup className="art-cup" />
                </div>
                <div className="preview-card__body">
                  <h3 className="display display--lg">{c.shortName}</h3>
                  <p className="price-badge" style={{ ['--rot' as string]: `${i ? 4 : -4}deg` }}>
                    {formatPrice(c.priceCents)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="center">
            <Link to="/menu" className="btn btn--dark btn--lg">
              Explore the menu
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- LOCATION ---------- */}
      <section id="location" className="section section--white location" aria-labelledby="location-title">
        <div className="container location__grid">
          <div className="location__photo">
            <img
              src="/images/kralingse-bos-sunset-640.webp"
              alt="The Kralingse Plas at sunset, seen from a wooden jetty."
              width={640}
              height={427}
              loading="lazy"
              decoding="async"
            />
            <Pin className="location__pin" />
          </div>
          <div className="location__info">
            <Tag tone="orange" rotate={3}>
              Save the date
            </Tag>
            <h2 id="location-title" className="display display--xl">
              Meet us at Kralingse Bos
            </h2>
            <dl className="details">
              <div>
                <dt>Date</dt>
                <dd>{event.dateLabel}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{event.timeLabel}</dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>
                  <address>
                    {event.venue.name}
                    <br />
                    {event.venue.postalCode} {event.venue.city}
                    <br />
                    {event.venue.country}
                  </address>
                </dd>
              </div>
            </dl>
            <div className="btn-row">
              <a className="btn btn--dark" href={mapsUrl} target="_blank" rel="noopener">
                Get directions<span className="visually-hidden"> (opens Google Maps in a new tab)</span>
                <span aria-hidden="true" className="btn__arrow">↗</span>
              </a>
              <button type="button" className="btn btn--outline" onClick={downloadIcs}>
                Add to calendar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CLOSING ---------- */}
      <section className="closing" aria-labelledby="closing-title">
        <div className="container closing__inner">
          <Flame className="closing__flame" />
          <h2 id="closing-title" className="display display--xxl">
            See you by <br />
            the grill.
          </h2>
          <Link to="/menu" className="btn btn--primary btn--lg">
            Book your spot
          </Link>
        </div>
      </section>
    </>
  );
}
