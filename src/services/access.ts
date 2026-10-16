// Who may open the paid part of the app. Units 1–6 (worlds 1–2) are free.
// A1 Units 7–42 need the "ENGLISH_A1" package and all of A2 needs "ENGLISH_A2",
// each bought once on lopso.vn. The site's account server says what the
// signed-in account owns. Progress is kept on the device and, once a parent
// signs in and picks the child, on the family account too (see cloudSync.ts).
import type { ChapterId } from '../types';
import { getWorldOfUnit } from '../data/worlds';
import { A1_LAST_CHAPTER } from '../data/levels';

export interface Package {
  id: 'ENGLISH_A1' | 'ENGLISH_A2';
  level: 'A1' | 'A2';
  price: string;
  title: string;
  opens: readonly string[];
}
export const PACKAGES: Record<'A1' | 'A2', Package> = {
  A1: {
    id: 'ENGLISH_A1', level: 'A1', price: '99.000đ', title: 'Mở khóa Unit 7–42 (A1)',
    opens: ['Unit 7–42: toàn bộ ngữ pháp và từ vựng A1', '12 thế giới mới và 12 trùm cuối', 'Các bài A1 làm thêm sau này'],
  },
  A2: {
    id: 'ENGLISH_A2', level: 'A2', price: '99.000đ', title: 'Mở khóa trọn bộ A2',
    opens: ['A2 Unit 1–42: ngữ pháp và từ vựng A2', '14 thế giới và 14 trùm cuối A2', 'Các bài A2 làm thêm sau này'],
  },
};
/** sessionStorage key: the package sent to PayOS, read back when the buyer returns. */
export const BUYING_KEY = 'ea-buying';
/** The last world anyone can play without buying. */
export const LAST_FREE_CHAPTER = 2;

/**
 * - checking: still asking the server.
 * - signed-in / signed-out: the server answered; `owns` lists the bought packages.
 * - offline: no account server answered (opened outside lopso.vn, or no network).
 * - open: everything unlocked (development build).
 */
export type AccessStatus = 'checking' | 'signed-in' | 'signed-out' | 'offline' | 'open';

export interface Access {
  status: AccessStatus;
  owns?: readonly string[];
  /** The signed-in account's name, when there is one. */
  name?: string;
}

/** The package a world needs, or null when it is free. */
export const packageForChapter = (chapter: ChapterId): Package | null =>
  chapter <= LAST_FREE_CHAPTER ? null : chapter <= A1_LAST_CHAPTER ? PACKAGES.A1 : PACKAGES.A2;
export const packageForUnit = (unitId: number): Package | null => {
  const world = getWorldOfUnit(unitId);
  return world ? packageForChapter(world.chapter) : null;
};
export const ownsPackage = (access: Access, pkg: Package) => access.status === 'open' || !!access.owns?.includes(pkg.id);
export const canOpenChapter = (access: Access, chapter: ChapterId) => {
  const pkg = packageForChapter(chapter);
  return !pkg || ownsPackage(access, pkg);
};
export const canOpenUnit = (access: Access, unitId: number) => {
  const pkg = packageForUnit(unitId);
  return !pkg || ownsPackage(access, pkg);
};

/** Asks the site's account server what this browser's account owns. */
export async function fetchAccess(fetcher: typeof fetch = fetch): Promise<Access> {
  try {
    const res = await fetcher('/api/me', { cache: 'no-store', credentials: 'same-origin' });
    if (res.status === 401) return { status: 'signed-out', owns: [] };
    if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) return { status: 'offline' };
    const body = await res.json() as { user?: { name?: string }; owns?: unknown };
    const owns = Array.isArray(body.owns) ? body.owns.filter((x): x is string => typeof x === 'string') : [];
    return { status: 'signed-in', owns, name: body.user?.name };
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

/** Starts a PayOS bank transfer for a package; the caller sends the browser to its checkout page. */
export async function startPurchase(pkg: Package, fetcher: typeof fetch = fetch): Promise<BuyResult> {
  try {
    const res = await fetcher('/api/pay/create', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ plan: pkg.id }),
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
