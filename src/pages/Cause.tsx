import { Link } from 'react-router-dom';
import { images, links, isDonationConfigured } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';
import { track } from '../lib/analytics';
import { FundraisingProgress } from '../components/FundraisingProgress';
import { Tag } from '../components/Sticker';
import { Burger, GiveBack, Heart, Sparkle } from '../components/illustrations/Illustrations';

export default function Cause() {
  usePageMeta('/cause');

  return (
    <>
      <section className="page-hero page-hero--black" aria-labelledby="cause-title">
        <Heart className="deco deco--heart" />
        <div className="container">
          <Tag tone="orange" rotate={-3}>
            The Cause
          </Tag>
          <h1 id="cause-title" className="display display--hero">
            A small BBQ. <br />
            <span className="text-orange">A bigger purpose.</span>
          </h1>
          <p className="page-hero__sub page-hero__sub--light">
            Cozy BBQ is a student-led fundraiser supporting 3FM Serious Request and the Nederlandse Brandwonden
            Stichting.
          </p>
        </div>
      </section>

      {/* Our initiative */}
      <section className="section section--cream" aria-labelledby="initiative-title">
        <div className="container split">
          <div>
            <Tag rotate={2}>Our initiative</Tag>
            <h2 id="initiative-title" className="display display--xl">
              Students. <br />
              A grill. <br />
              A good reason.
            </h2>
            <p className="lead">
              We're a group of students who wanted to do something simple and meaningful: bring people together in
              Rotterdam over good food, and raise money for a cause that matters.
            </p>
            <p>
              Cozy BBQ is an independent initiative. We organise it ourselves, and every combo you book helps us reach
              our fundraising goal.
            </p>
          </div>
          <div className="split__art">
            <GiveBack className="split__illustration" />
          </div>
        </div>
      </section>

      {/* The cause */}
      <section className="section section--white" aria-labelledby="the-cause-title">
        <div className="container split split--reverse">
          <div className="cause-logo-card">
            <img
              src={images.causeLogo.src}
              alt={images.causeLogo.alt}
              width={images.causeLogo.width}
              height={images.causeLogo.height}
              loading="lazy"
            />
            <p>We support 3FM Serious Request</p>
          </div>
          <div>
            <Tag tone="orange" rotate={-2}>
              3FM Serious Request 2026
            </Tag>
            <h2 id="the-cause-title" className="display display--xl">
              Better care for children with burns
            </h2>
            <p className="lead">
              This year, the 3FM Serious Request campaign supports the{' '}
              <strong>Nederlandse Brandwonden Stichting</strong> (Dutch Burns Foundation), to improve care for children
              with severe burns.
            </p>
            <p>
              Cozy BBQ is not organised by NPO 3FM. We're one of the independent actions raising money for the
              campaign.
            </p>
            <a className="text-link" href={links.causeInfoUrl} target="_blank" rel="noopener">
              Read more on the official 3FM website ↗<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section--orange" aria-labelledby="money-title">
        <Sparkle className="deco deco--sparkle-1" />
        <div className="container">
          <h2 id="money-title" className="display display--xl">
            How every combo helps
          </h2>
          <ol className="flow">
            <li>
              <span className="flow__num" aria-hidden="true">01</span>
              <h3>You book a combo</h3>
              <p>Grab a burger or hot dog combo for yourself and your friends.</p>
            </li>
            <li>
              <span className="flow__num" aria-hidden="true">02</span>
              <h3>We cover the costs</h3>
              <p>Ticket income first covers the costs of running the event.</p>
            </li>
            <li>
              <span className="flow__num" aria-hidden="true">03</span>
              <h3>The rest goes to the cause</h3>
              <p>The net proceeds from our BBQ will be donated to 3FM Serious Request.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Goal + donate */}
      <section className="section section--cream" aria-labelledby="goal-title">
        <div className="container goal-grid">
          <div className="goal-card">
            <h2 id="goal-title" className="visually-hidden">
              Our fundraising goal: €200
            </h2>
            <FundraisingProgress />
            <Burger className="goal-card__art" />
          </div>
          <div className="donate-card">
            <h2 className="display display--lg">Can’t join? You can still make a difference.</h2>
            {isDonationConfigured ? (
              <>
                <p>Donate directly through our own fundraising page for 3FM Serious Request.</p>
                <a
                  className="btn btn--primary btn--lg"
                  href={links.donationUrl}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track('donate_click', { source_page: '/cause', link_location: 'cause_donate_card' })}
                >
                  Donate to the cause<span className="visually-hidden"> (opens in a new tab)</span>
                  <span aria-hidden="true" className="btn__arrow">↗</span>
                </a>
              </>
            ) : (
              <>
                <p>Our direct donation page is coming soon. Meanwhile, find out more about the campaign.</p>
                <a className="btn btn--outline-light btn--lg" href={links.causeInfoUrl} target="_blank" rel="noopener">
                  Learn about the cause<span className="visually-hidden"> (opens in a new tab)</span>
                  <span aria-hidden="true" className="btn__arrow">↗</span>
                </a>
              </>
            )}
            <p className="donate-card__alt">
              Coming along? <Link to="/menu">Book your spot →</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
