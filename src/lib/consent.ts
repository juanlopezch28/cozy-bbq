/**
 * Consent storage. Framework-agnostic: no React, no analytics code here.
 * The choice is stored in localStorage (strictly necessary to remember it).
 */
import { analytics } from '../config/site';

export interface ConsentState {
  analytics: boolean;
  version: number;
  updatedAt: string;
}

const STORAGE_KEY = 'cozybbq_consent';
type Listener = (state: ConsentState | null) => void;
const listeners = new Set<Listener>();

export function readConsent(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== analytics.consentVersion) return null;
    const ageMs = Date.now() - new Date(parsed.updatedAt).getTime();
    const maxAgeMs = analytics.consentMaxAgeMonths * 30.44 * 24 * 3600 * 1000;
    if (!Number.isFinite(ageMs) || ageMs > maxAgeMs) return null;
    return { analytics: parsed.analytics === true, version: parsed.version, updatedAt: parsed.updatedAt };
  } catch {
    return null;
  }
}

export function writeConsent(analyticsGranted: boolean): ConsentState {
  const state: ConsentState = {
    analytics: analyticsGranted,
    version: analytics.consentVersion,
    updatedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable: choice applies to this page view only */
  }
  listeners.forEach((l) => l(state));
  return state;
}

export function onConsentChange(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
