import { useEffect } from 'react';
import pages from '../content/pages.json';
import { images } from '../config/site';

type PageKey = keyof typeof pages;

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Page-specific <title>, description, canonical and Open Graph tags. */
export function usePageMeta(path: PageKey | null, override?: { title: string; description: string }) {
  useEffect(() => {
    const meta = override ?? (path ? pages[path] : null);
    if (!meta) return;
    document.title = meta.title;
    const url = window.location.origin + (path ?? window.location.pathname);
    setMeta('name', 'description', meta.description);
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', window.location.origin + images.ogImage);
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [path, override]);
}
