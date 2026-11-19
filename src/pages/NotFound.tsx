import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { Flame } from '../components/illustrations/Illustrations';

const meta = { title: 'Page not found — Cozy BBQ', description: 'This page went up in smoke.' };

export default function NotFound() {
  usePageMeta(null, meta);
  useEffect(() => {
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex';
    document.head.appendChild(m);
    return () => m.remove();
  }, []);
  return (
    <section className="page-hero page-hero--orange notfound" aria-labelledby="nf-title">
      <div className="container">
        <Flame className="notfound__flame" />
        <h1 id="nf-title" className="display display--hero">
          Gone up in smoke.
        </h1>
        <p className="page-hero__sub">We couldn't find that page.</p>
        <Link to="/" className="btn btn--dark btn--lg">
          Back to home
        </Link>
      </div>
    </section>
  );
}
