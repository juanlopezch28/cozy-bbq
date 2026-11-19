import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

export const navItems = [
  { to: '/', label: 'Home' },
  { to: '/cause', label: 'The Cause' },
  { to: '/menu', label: 'Menu & Tickets' },
  { to: '/faq', label: 'FAQs' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('nav-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('nav-open');
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="Cozy BBQ — home">
          <Logo />
        </Link>

        <nav className="main-nav" aria-label="Main">
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className="main-nav__link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/menu" className="btn btn--primary site-header__cta">
          Book your spot
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="nav-toggle__bars" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="nav-toggle__label">{open ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      <div id="mobile-nav" className={`mobile-nav${open ? ' is-open' : ''}`} hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className="mobile-nav__link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/menu" className="btn btn--primary btn--lg mobile-nav__cta">
            Book your spot
          </Link>
        </nav>
      </div>
    </header>
  );
}
