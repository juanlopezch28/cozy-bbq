import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { readConsent, onConsentChange, type ConsentState } from '../lib/consent';
import { enableAnalytics, disableAnalytics, trackPageView, track } from '../lib/analytics';

/** Current consent choice (null = not decided yet). Read-only. */
export function useConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(() => readConsent());
  useEffect(() => onConsentChange(setConsent), []);
  return consent;
}

/** Call ONCE (in App): applies the stored consent on load and on every change. */
export function useApplyConsent() {
  const consent = useConsent();
  const granted = consent?.analytics === true;
  useEffect(() => {
    if (granted) enableAnalytics();
    else disableAnalytics();
  }, [granted]);
  return consent;
}

/** One page_view per effective navigation (also fires right after consent is granted). */
export function usePageViewTracking(consentGranted: boolean) {
  const location = useLocation();
  useEffect(() => {
    if (!consentGranted) return;
    // Wait a tick so the page has set its document.title.
    const t = window.setTimeout(() => trackPageView(location.key, location.pathname + location.search), 0);
    return () => window.clearTimeout(t);
  }, [consentGranted, location.key, location.pathname, location.search]);
}

/** Fires `view_item_list` once per page visit when the element becomes visible. */
export function useViewItemList<T extends HTMLElement = HTMLElement>(
  listId: string,
  listName: string,
  items: Record<string, unknown>[],
) {
  const ref = useRef<T | null>(null);
  const location = useLocation();
  const consent = useConsent();
  useEffect(() => {
    const el = ref.current;
    if (!el || !consent?.analytics) return;
    const fire = () =>
      track(
        'view_item_list',
        { item_list_id: listId, item_list_name: listName, items },
        `view_item_list:${listId}:${location.key}`,
      );
    if (!('IntersectionObserver' in window)) return fire();
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          fire();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
    // items is static content
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listId, location.key, consent?.analytics]);
  return ref;
}
