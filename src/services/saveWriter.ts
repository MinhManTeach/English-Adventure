export type WriterStatus = 'starting' | 'writable' | 'read-only' | 'unsupported' | 'unavailable';
export interface LockProvider {
  request(name: string, options: { mode: 'exclusive'; signal: AbortSignal }, callback: (lock: unknown) => Promise<void>): Promise<unknown>;
}
/** Hold a browser-managed exclusive lock for the entire writable lifetime.
 * The browser releases it when a tab closes. Without locks, fail closed. */
export class SaveWriter {
  status: WriterStatus = 'starting';
  private listeners = new Set<(status: WriterStatus) => void>();
  private stopCurrent?: () => void;
  constructor(private locks?: LockProvider) {}
  subscribe(listener: (status: WriterStatus) => void): () => void {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }
  private update(status: WriterStatus) {
    this.status = status;
    for (const listener of this.listeners) listener(status);
  }
  start(onAcquired: () => void): () => void {
    this.stopCurrent?.();
    if (!this.locks?.request) {
      this.update('unsupported');
      return () => {};
    }
    const controller = new AbortController();
    let stopped = false, release: (() => void) | undefined;
    this.update('read-only');
    const stop = () => {
      if (stopped) return;
      stopped = true;
      this.update('read-only');
      controller.abort();
      release?.();
    };
    this.stopCurrent = stop;
    try {
      void this.locks.request('ENGLISH_ADVENTURE_STATE_V1:writer', { mode: 'exclusive', signal: controller.signal }, async () => {
        if (stopped) return;
        const lifetime = new Promise<void>(resolve => { release = resolve; });
        this.update('writable');
        try { onAcquired(); await lifetime; }
        finally { if (!stopped) { stopped = true; this.update('unavailable'); } }
      }).catch(() => { if (!stopped) this.update('unavailable'); });
    } catch { if (!stopped) this.update('unavailable'); }
    return stop;
  }
}
