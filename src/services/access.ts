// Who may open the paid part of the app. Units 1–6 (worlds 1–2) are free;
// Units 7–42 need the "ENGLISH_A1" package, bought once on lopso.vn. The site's
// account server says what the signed-in account owns; progress itself stays
// on this device.
import type { ChapterId } from '../types';
import { getWorldOfUnit } from '../data/worlds';

export const A1_PRODUCT = 'ENGLISH_A1';
export const A1_PRICE_LABEL = '99.000đ';
/** The last world anyone can play without buying. */
export const LAST_FREE_CHAPTER = 2;

/**
 * - checking: still asking the server.
 * - owned: the signed-in account has bought A1.
 * - signed-out / not-owned: the server answered; buying is possible.
 * - offline: no account server answered (opened outside lopso.vn, or no network).
 * - open: everything unlocked (development build).
 */
export type AccessStatus = 'checking' | 'owned' | 'signed-out' | 'not-owned' | 'offline' | 'open';

export interface Access {
  status: AccessStatus;
  /** The signed-in account's name, when there is one. */
  name?: string;
}

export const isPaidChapter = (chapter: ChapterId) => chapter > LAST_FREE_CHAPTER;
export const isPaidUnit = (unitId: number) => {
  const world = getWorldOfUnit(unitId);
  return !!world && isPaidChapter(world.chapter);
};
export const hasFullAccess = (access: Access) => access.status === 'owned' || access.status === 'open';
export const canOpenChapter = (access: Access, chapter: ChapterId) => !isPaidChapter(chapter) || hasFullAccess(access);
export const canOpenUnit = (access: Access, unitId: number) => !isPaidUnit(unitId) || hasFullAccess(access);

/** Asks the site's account server what this browser's account owns. */
export async function fetchAccess(fetcher: typeof fetch = fetch): Promise<Access> {
  try {
    const res = await fetcher('/api/me', { cache: 'no-store', credentials: 'same-origin' });
    if (res.status === 401) return { status: 'signed-out' };
    if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) return { status: 'offline' };
    const body = await res.json() as { user?: { name?: string }; owns?: unknown };
    const owns = Array.isArray(body.owns) && body.owns.includes(A1_PRODUCT);
    return { status: owns ? 'owned' : 'not-owned', name: body.user?.name };
  } catch {
    return { status: 'offline' };
  }
}

/** Google sign-in that comes back to this app (the server allows only /hoc-sinh/<app>/ paths). */
export function signInUrl(pathname: string): string {
  const app = /^\/hoc-sinh\/[a-z0-9-]+\/?/.exec(pathname)?.[0];
  return app ? `/auth/google?next=${encodeURIComponent(app.endsWith('/') ? app : `${app}/`)}` : '/auth/google';
}

export type BuyResult = { kind: 'redirect'; url: string } | { kind: 'owned' } | { kind: 'signed-out' } | { kind: 'error'; message: string };

/** Starts a PayOS bank transfer for A1; the caller sends the browser to its checkout page. */
export async function startPurchase(fetcher: typeof fetch = fetch): Promise<BuyResult> {
  try {
    const res = await fetcher('/api/pay/create', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ plan: A1_PRODUCT }),
    });
    if (res.status === 401) return { kind: 'signed-out' };
    if (res.status === 409) return { kind: 'owned' };
    const body = await res.json().catch(() => ({})) as { checkoutUrl?: string; error?: string };
    if (res.ok && body.checkoutUrl) return { kind: 'redirect', url: body.checkoutUrl };
    return { kind: 'error', message: body.error === 'PAY_UNAVAILABLE' ? 'Cổng thanh toán đang tạm dừng. Thử lại sau nhé.' : 'Chưa tạo được mã thanh toán. Thử lại sau ít phút.' };
  } catch {
    return { kind: 'error', message: 'Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại.' };
  }
}
