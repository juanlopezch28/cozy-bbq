/**
 * Post-build step: writes dist/<route>/index.html for every page with
 * page-specific <title>, description, canonical and Open Graph tags,
 * so links shared on WhatsApp / social media get the right preview
 * (these crawlers don't run JavaScript). Absolute URLs use Netlify's
 * URL env var (or SITE_URL) when available.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = JSON.parse(readFileSync(resolve(root, 'src/content/pages.json'), 'utf8'));
const template = readFileSync(resolve(root, 'dist/index.html'), 'utf8');
const site = (process.env.SITE_URL || process.env.URL || '').replace(/\/$/, '');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const setContent = (html, selector, value) =>
  html.replace(new RegExp(`(<meta ${selector} content=")[^"]*(")`), `$1${esc(value)}$2`);

for (const [path, meta] of Object.entries(pages)) {
  const url = `${site}${path}`;
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = setContent(html, 'name="description"', meta.description);
  html = setContent(html, 'property="og:title"', meta.title);
  html = setContent(html, 'property="og:description"', meta.description);
  html = setContent(html, 'property="og:url"', url);
  html = setContent(html, 'name="twitter:title"', meta.title);
  html = setContent(html, 'name="twitter:description"', meta.description);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  if (site) {
    html = setContent(html, 'property="og:image"', `${site}/images/og-image.jpg`);
    html = setContent(html, 'name="twitter:image"', `${site}/images/og-image.jpg`);
  }
  const out = path === '/' ? resolve(root, 'dist/index.html') : resolve(root, `dist${path}/index.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`prerendered meta → ${out.replace(root + '/', '')}`);
}
if (!site) console.warn('⚠ No URL/SITE_URL env var: og:url and og:image stay relative (set SITE_URL for local production builds).');
