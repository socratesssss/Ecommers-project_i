// src/utils/visitorTracker.ts
import FingerprintJS, { Agent, GetResult } from '@fingerprintjs/fingerprintjs';

let fpInstance: Agent | null = null;

/**
 * Initialize the FingerprintJS instance (singleton)
 */
async function initFp(): Promise<Agent> {
  if (!fpInstance) {
    fpInstance = await FingerprintJS.load();
  }
  return fpInstance;
}

/**
 * Get the unique visitor ID (cached in localStorage to avoid repeated calls)
 */
export async function getVisitorId(): Promise<string> {
  if (typeof window === 'undefined') {
    // Server-side rendering safety
    return '';
  }

  // Prefer stored id to avoid re-fingerprinting too often
  const stored = localStorage.getItem('visitorId');
  if (stored) return stored;

  const fp = await initFp();
  const result: GetResult = await fp.get();
  const visitorId = result.visitorId;

  // Save for persistence
  localStorage.setItem('visitorId', visitorId);
  return visitorId;
}
