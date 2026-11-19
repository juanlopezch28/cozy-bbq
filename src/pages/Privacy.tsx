import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { openCookieSettings } from '../components/CookieConsent';
import { isGa4Configured } from '../config/site';

export default function Privacy() {
  usePageMeta('/privacy');
  return (
    <>
      <section className="page-hero page-hero--black" aria-labelledby="privacy-title">
        <div className="container">
          <h1 id="privacy-title" className="display display--hero">
            Privacy &amp; cookies
          </h1>
          <p className="page-hero__sub page-hero__sub--light">Short and clear: what this website does with your data.</p>
        </div>
      </section>
      <section className="section section--cream">
        <div className="container container--narrow prose">
          <h2>What we use</h2>
          <ul>
            <li>
              <strong>Your cookie choice.</strong> We store your choice in your browser (localStorage) so we don't ask
              you on every page. This is strictly necessary.
            </li>
            <li>
              <strong>Google Analytics 4 — optional.</strong> Only if you click “Accept analytics”, we load Google
              Analytics to count visits and clicks on buttons such as “Book your combo” or “Donate to the cause”.
              Google may then set cookies such as <code>_ga</code> and <code>_ga_*</code>. Before you accept, nothing is
              loaded from Google and no analytics requests are sent.
              {!isGa4Configured && ' (Analytics is currently not active on this website.)'}
            </li>
          </ul>

          <h2>What we don't do</h2>
          <ul>
            <li>No advertising or social media tracking pixels.</li>
            <li>We never send names, email addresses or phone numbers to Google Analytics.</li>
            <li>Rejecting analytics never affects booking or anything else on the site.</li>
          </ul>

          <h2>Changing your mind</h2>
          <p>
            You can change or withdraw your choice at any time. When you withdraw consent, we stop measuring and delete
            the analytics cookies we can remove from this website.
          </p>
          <p>
            <button type="button" className="btn btn--dark" onClick={openCookieSettings}>
              Open cookie settings
            </button>
          </p>

          <h2>Ticket shop and external links</h2>
          <p>
            Bookings and payments happen in our ticket shop, powered by Weeztix. It is a separate website with its own
            privacy policy and cookie settings, which our cookie choice does not control. The same applies to Google
            Maps, WhatsApp, Instagram and the 3FM website when you open them.
          </p>

          <h2>Questions</h2>
          <p>
            Have a question about your privacy? See our <Link to="/faq">FAQs</Link> for ways to reach us.
          </p>
        </div>
      </section>
    </>
  );
}
