import type { CosmeticResult, UserProgressState } from '../types';
import type { CosmeticTransaction } from '../engine/avatarCosmetics';
import type { WriterStatus } from './saveWriter';
export type PublicationStatus = 'success' | 'storage-failed' | 'read-only';
/** The shared contract for every whole-save writer, not only purchases. */
export function persistBeforePublish(next: UserProgressState, writer: WriterStatus,
  save: (next: UserProgressState) => boolean, publish: (next: UserProgressState) => void): PublicationStatus {
  if (writer !== 'writable') return 'read-only';
  try { if (!save(next)) return 'storage-failed'; }
  catch { return 'storage-failed'; }
  publish(next);
  return 'success';
}

/** Shared action boundary used by GameContext and transaction integration tests. */
export function runCosmeticAction(reduce: (state: UserProgressState) => CosmeticTransaction,
  latest: () => UserProgressState, writer: WriterStatus, storageReady: boolean,
  publish: (state: UserProgressState) => PublicationStatus): CosmeticResult {
  if (writer !== 'writable') return { status: 'read-only' };
  if (!storageReady) return { status: 'storage-failed' };
  const transaction = reduce(latest());
  if (transaction.result.status !== 'success') return transaction.result;
  const status = publish(transaction.state);
  return status === 'success' ? transaction.result : { status };
}
