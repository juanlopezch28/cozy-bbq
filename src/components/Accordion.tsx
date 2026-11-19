import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import type { FaqItem } from '../content/faq';
import { track } from '../lib/analytics';

export function Accordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const base = useId();
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const open = openId === item.id;
        const btnId = `${base}-btn-${i}`;
        const panelId = `${base}-panel-${i}`;
        return (
          <div className={`accordion__item${open ? ' is-open' : ''}`} key={item.id}>
            <h2 className="accordion__heading">
              <button
                id={btnId}
                type="button"
                className="accordion__button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                <span>{item.question}</span>
                <span className="accordion__icon" aria-hidden="true" />
              </button>
            </h2>
            <div id={panelId} role="region" aria-labelledby={btnId} className="accordion__panel" hidden={!open}>
              <p>{item.answer}</p>
              {item.link &&
                (item.link.external ? (
                  <a
                    href={item.link.to}
                    target="_blank"
                    rel="noopener"
                    className="text-link"
                    onClick={() => {
                      if (item.link?.trackEvent) track(item.link.trackEvent, { source_page: window.location.pathname, link_location: 'faq' });
                    }}
                  >
                    {item.link.label} ↗<span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link to={item.link.to} className="text-link">
                    {item.link.label} →
                  </Link>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
