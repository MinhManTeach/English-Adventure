import React, { useState } from 'react';
import { Button } from './Button';
import { useGame } from '../../context/GameContext';
import { signInUrl } from '../../services/access';
import { calculateLevel } from '../../engine/scoring';
import type { UserProgressState } from '../../types';

const signIn = () => window.location.assign(signInUrl(window.location.pathname));
const time = (ms?: number) => ms ? new Date(ms).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : '';
const day = (ms: number) => ms ? new Date(ms).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }) : '';

/** Pick the child this device learns for, or add a new one. */
const KidChooser: React.FC = () => {
  const { cloud, state } = useGame();
  const [name, setName] = useState(state.profile.name);
  return (
    <div className="space-y-2">
      <p className="text-sm font-bold text-ink-soft">Máy này đang học cho bé nào?</p>
      {cloud.kids.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {cloud.kids.map(kid => (
            <Button key={kid.id} variant="secondary" size="sm" disabled={cloud.busy} onClick={() => void cloud.chooseKid(kid)}>👧 {kid.name}</Button>
          ))}
        </div>
      )}
      <form className="flex gap-2" onSubmit={e => { e.preventDefault(); if (name.trim()) void cloud.createKid(name); }}>
        <input aria-label="Tên bé" value={name} maxLength={30} onChange={e => setName(e.target.value)} placeholder="Tên bé"
          className="min-w-0 flex-1 rounded-xl border-2 border-line bg-cloud px-3 py-1.5 text-sm font-bold text-ink focus:border-sky-brand focus:bg-white focus:outline-none" />
        <Button type="submit" variant="success" size="sm" disabled={cloud.busy || !name.trim()}>Thêm bé</Button>
      </form>
      <p className="text-xs font-bold text-ink-soft">Gói đã mua dùng chung cho mọi bé trong tài khoản.</p>
    </div>
  );
};

/** Home screen card: whether this child's progress is kept on the family account. */
export const CloudCard: React.FC = () => {
  const { cloud } = useGame();
  if (cloud.phase === 'off') return null;
  return (
    <section aria-label="Lưu tiến độ" className="card-3d space-y-2 p-4">
      <p className="font-display text-base font-black text-ink"><span aria-hidden="true">☁️</span> Lưu tiến độ</p>
      {cloud.phase === 'signed-out' ? (
        <>
          <p className="text-xs font-bold text-ink-soft">Nhờ bố mẹ đăng nhập Google để đổi máy hay hỏng máy cũng không mất bài, và không phải mua lại gói.</p>
          <Button variant="primary" size="sm" className="w-full" onClick={signIn}>Đăng nhập bằng Google</Button>
        </>
      ) : cloud.phase === 'loading' ? (
        <p role="status" className="text-xs font-bold text-ink-soft">Đang kiểm tra tài khoản…</p>
      ) : cloud.phase === 'choose' ? (
        <KidChooser />
      ) : cloud.link ? (
        <>
          <p role="status" className="text-xs font-bold text-ink-soft">
            {cloud.phase === 'error' ? 'Chưa lưu được lên tài khoản (có thể do mất mạng). Bài vẫn lưu trên máy, app sẽ tự thử lại.'
              : cloud.phase === 'saving' ? `Đang lưu bài của ${cloud.link.kidName}…`
              : `Đã lưu bài của ${cloud.link.kidName}${cloud.link.savedAt ? ` lúc ${time(cloud.link.savedAt)}` : ''}.`}
          </p>
          <button type="button" disabled={cloud.busy} onClick={() => void cloud.switchKid()}
            className="text-xs font-extrabold text-ink-soft underline underline-offset-4 hover:text-ink cursor-pointer">Đổi sang bé khác</button>
        </>
      ) : (
        <p role="status" className="text-xs font-bold text-ink-soft">Chưa kết nối được tài khoản. App sẽ thử lại khi có mạng.</p>
      )}
      {cloud.message && <p role="alert" className="text-xs font-bold text-red-600">{cloud.message}</p>}
    </section>
  );
};

/** First screen on a new device: carry on with progress saved on the family account. */
export const CloudWelcome: React.FC = () => {
  const { cloud } = useGame();
  if (cloud.phase === 'signed-out') return (
    <p className="mt-4 text-sm font-bold text-ink-soft">
      Đã học trên máy khác?{' '}
      <button type="button" onClick={signIn} className="font-extrabold text-sky-brand underline underline-offset-4 cursor-pointer">Đăng nhập để học tiếp</button>
    </p>
  );
  if (cloud.phase !== 'choose') return null;
  return <div className="card-3d mt-6 w-full p-4 text-left"><KidChooser /></div>;
};

const Summary: React.FC<{ title: string; state: UserProgressState; note?: string }> = ({ title, state, note }) => (
  <div className="flex-1 rounded-2xl border-2 border-line p-3 text-left">
    <p className="eyebrow text-ink-soft">{title}</p>
    <p className="font-display text-lg font-black text-ink">{state.profile.name || 'Chưa đặt tên'}</p>
    <p className="text-sm font-bold text-ink-soft">Level {calculateLevel(state.xp).level} · {state.xp} XP</p>
    <p className="text-sm font-bold text-ink-soft">{state.completedUnits.length} bài đã xong</p>
    {note && <p className="mt-1 text-xs font-bold text-ink-soft">{note}</p>}
  </div>
);

/** This device and the account both have progress for the child: keep one of them. */
export const CloudConflictDialog: React.FC = () => {
  const { cloud, state } = useGame();
  const conflict = cloud.conflict;
  if (cloud.phase !== 'ask' || !conflict?.copy.state) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div role="dialog" aria-modal="true" aria-labelledby="cloud-title" className="card-3d w-full max-w-lg space-y-4 bg-white p-6 text-center animate-pop">
        <div>
          <h2 id="cloud-title" className="font-display text-2xl font-black text-ink">Giữ tiến độ nào?</h2>
          <p className="mt-1 text-sm font-bold text-ink-soft">
            Bé {conflict.kidName} có tiến độ trên tài khoản khác với máy này. Bản không chọn sẽ bị thay thế.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Summary title="Trên tài khoản" state={conflict.copy.state} note={conflict.copy.updatedAt ? `Lưu lúc ${day(conflict.copy.updatedAt)}` : undefined} />
          <Summary title="Trên máy này" state={state} />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button autoFocus variant="success" className="flex-1" onClick={() => cloud.resolveConflict('account')}>Dùng bản trên tài khoản</Button>
          <Button variant="secondary" className="flex-1" onClick={() => cloud.resolveConflict('device')}>Giữ bản trên máy này</Button>
        </div>
        {conflict.linking && (
          <button type="button" onClick={() => cloud.resolveConflict('cancel')} className="text-xs font-extrabold text-ink-soft underline underline-offset-4 cursor-pointer">
            Chọn nhầm bé? Quay lại
          </button>
        )}
      </div>
    </div>
  );
};
