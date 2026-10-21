/**
 * Turns a site-root asset path such as `/avatars/v1/…` into one under the
 * app's own address, so the game also works from a sub-folder
 * (e.g. lopso.vn/hoc-sinh/english-adventure/). Saved data keeps the plain
 * `/avatars/…` paths; only the address the browser loads changes.
 */
export function assetUrl(path: string): string {
  const base = (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/';
  const url = path.startsWith('/') && base !== '/' ? base.replace(/\/?$/, '/') + path.slice(1) : path;
  // Avatar layers keep their file names when the art is redrawn; the version stops browsers
  // mixing cached old layers with new ones.
  return path.startsWith('/avatars/') ? `${url}?art=${AVATAR_ART_VERSION}` : url;
}

/** Bump whenever scripts/avatars/build.py output changes. */
export const AVATAR_ART_VERSION = 'chibi-1';
