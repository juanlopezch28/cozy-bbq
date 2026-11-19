import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { writeConsent } from '../lib/consent';
import { useConsent } from '../hooks/useAnalytics';
import { links } from '../config/site';

const OPEN_EVENT = 'cozybbq:open-cookie-settings';
export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_EVENT));

export function CookieConsent() {
  const consent = useConsent();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [analyticsOn, setAnalyticsOn] = useState(false);

  const openSettings = () => {
    setAnalyticsOn(consent?.analytics === true); // defaults to off
    dialogRef.current?.showModal();
  };

  useEffect(() => {
    const handler = () => openSettings();
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  });

  const bannerVisible = consent === null;
  useEffect(() => {
    document.body.classList.toggle('has-cookie-banner', bannerVisible);
  }, [bannerVisible]);

  const choose = (value: boolean) => {
    writeConsent(value);
    dialogRef.current?.close();
  };

  return (
    <>
      {bannerVisible && (
        <section className="cookie-banner" aria-labelledby="cookie-banner-title">
          <div className="cookie-banner__text">
            <h2 id="cookie-banner-title" className="cookie-banner__title">
              Cookies? Only if you say so.
            </h2>
            <p>
              We use optional Google Analytics cookies to understand visits and interactions on our website. You can
              reject them and still book. Change your choice anytime through Cookie settings.{' '}
              <Link to="/privacy">Privacy &amp; cookies</Link>
            </p>
          </div>
          <div className="cookie-banner__actions">
            <button type="button" className="btn btn--consent" onClick={() => choose(true)}>
              Accept analytics
            </button>
            <button type="button" className="btn btn--consent" onClick={() => choose(false)}>
              Reject analytics
            </button>
            <button type="button" className="btn btn--link" onClick={openSettings}>
              Settings
            </button>
          </div>
        </section>
      )}

      <dialog ref={dialogRef} className="cookie-dialog" aria-labelledby="cookie-dialog-title">
        <form
          method="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            choose(analyticsOn);
          }}
        >
          <h2 id="cookie-dialog-title" className="cookie-dialog__title">
            Cookie settings
          </h2>
          <p>Choose which optional cookies we may use. Booking works the same either way.</p>

          <div className="cookie-option">
            <div>
              <h3>Strictly necessary</h3>
              <p>Remembers your cookie choice on this device. Always on.</p>
            </div>
            <span className="cookie-option__status">Always on</span>
          </div>

          <div className="cookie-option">
            <div>
              <h3 id="analytics-label">Analytics (Google Analytics 4)</h3>
              <p id="analytics-desc">
                Helps us understand which pages are visited and which buttons are used. No names, emails or phone
                numbers are sent. Off unless you switch it on.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={analyticsOn}
              aria-labelledby="analytics-label"
              aria-describedby="analytics-desc"
              className="switch"
              onClick={() => setAnalyticsOn((v) => !v)}
            >
              <span className="switch__thumb" aria-hidden="true" />
              <span className="switch__text" aria-hidden="true">{analyticsOn ? 'On' : 'Off'}</span>
            </button>
          </div>

          <p className="cookie-dialog__note">
            Our ticket shop ({links.ticketShopProvider}) is a separate website with its own cookie settings.
          </p>

          <div className="cookie-dialog__actions">
            <button type="submit" className="btn btn--primary">
              Save my choice
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => dialogRef.current?.close()}>
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
