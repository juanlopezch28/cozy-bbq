import { isWhatsappConfigured } from '../config/site';
import { publishedFaqs } from '../content/faq';
import { usePageMeta } from '../hooks/usePageMeta';
import { whatsappUrl } from '../lib/links';
import { track } from '../lib/analytics';
import { Accordion } from '../components/Accordion';
import { Tag } from '../components/Sticker';
import { Sparkle } from '../components/illustrations/Illustrations';
import { Link } from 'react-router-dom';

export default function Faq() {
  usePageMeta('/faq');
  return (
    <>
      <section className="page-hero page-hero--orange" aria-labelledby="faq-title">
        <Sparkle className="deco deco--sparkle-2" />
        <div className="container">
          <Tag rotate={-3}>FAQs</Tag>
          <h1 id="faq-title" className="display display--hero">
            Good questions.
          </h1>
          <p className="page-hero__sub">Everything you need to know before you fire up your appetite.</p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container container--narrow">
          <Accordion items={publishedFaqs} />

          <div className="ask-card">
            <h2 className="display display--lg">Still have a question?</h2>
            {isWhatsappConfigured ? (
              <>
                <p>Send us a message — we're happy to help.</p>
                <a
                  className="btn btn--primary btn--lg"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track('whatsapp_click', { source_page: '/faq', link_location: 'faq_ask_card' })}
                >
                  Chat with us on WhatsApp<span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </>
            ) : (
              <p>
                We'll add a way to reach us here soon. In the meantime, check the <Link to="/menu">Menu &amp; Tickets</Link>{' '}
                and <Link to="/cause">The Cause</Link> pages.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
