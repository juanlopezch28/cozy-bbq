import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { useApplyConsent, usePageViewTracking } from './hooks/useAnalytics';
import Home from './pages/Home';
import Cause from './pages/Cause';
import Menu from './pages/Menu';
import Faq from './pages/Faq';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

/** Scroll to top (or to #hash) and move focus to <main> on client-side navigation. */
function useRouteFocus() {
  const location = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
    if (first.current) {
      first.current = false;
      return;
    }
    document.getElementById('main')?.focus({ preventScroll: true });
    // location.key changes on every navigation, even to the URL you're already on.
  }, [location.key]);
}

export default function App() {
  const consent = useApplyConsent();
  usePageViewTracking(consent?.analytics === true);
  useRouteFocus();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cause" element={<Cause />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
