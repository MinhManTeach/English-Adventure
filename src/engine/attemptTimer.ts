/** One cancellable deadline per attempt; injected scheduler makes race tests deterministic. */
export function startAttemptTimer(
  expire: () => void, milliseconds = 10000,
  schedule: (callback: () => void, delay: number) => unknown = (callback, delay) => setTimeout(callback, delay),
  cancel: (handle: unknown) => void = handle => clearTimeout(handle as ReturnType<typeof setTimeout>),
): () => void {
  let active = true;
  const handle = schedule(() => {
    if (!active) return;
    active = false;
    expire();
  }, milliseconds);
  return () => { active = false; cancel(handle); };
}
