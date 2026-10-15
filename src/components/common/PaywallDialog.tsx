import React, { useEffect, useRef, useState } from 'react';
import { Lock, X } from 'lucide-react';
import { Button } from './Button';
import { useGame } from '../../context/GameContext';
import { BUYING_KEY, ownsPackage, signInUrl, startPurchase, type Package } from '../../services/access';

/** Shown when a player opens a paid world: what its package opens, and how a parent buys it. */
export const PaywallDialog: React.FC = () => {
  const { paywall: pkg, closePaywall, access } = useGame();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!pkg) return;
    setError('');
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closePaywall(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pkg, closePaywall]);

  if (!pkg) return null;

  const buy = async () => {
    setBusy(true);
    setError('');
    const result = await startPurchase(pkg);
    if (result.kind === 'redirect') {
      try { sessionStorage.setItem(BUYING_KEY, pkg.id); } catch { /* private mode: no confirmation banner */ }
      window.location.assign(result.url);
      return;
    }
    setBusy(false);
    if (result.kind === 'owned') window.location.reload();
    else if (result.kind === 'signed-out') window.location.assign(signInUrl(window.location.pathname));
    else setError(result.message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" onClick={closePaywall}>
      <div role="dialog" aria-modal="true" aria-labelledby="paywall-title" onClick={e => e.stopPropagation()}
        className="card-3d relative w-full max-w-md space-y-4 bg-white p-6 text-center animate-pop">
        <button ref={closeRef} type="button" onClick={closePaywall} aria-label="Đóng"
          className="absolute right-3 top-3 rounded-full p-2 text-ink-soft hover:bg-line cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300">
          <X className="h-5 w-5" />
        </button>
        <div aria-hidden="true" className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-sun text-white">
          <Lock className="h-8 w-8" strokeWidth={3} />
        </div>
        <div>
          <p className="eyebrow text-ink-soft">Gói trọn bộ {pkg.level}</p>
          <h2 id="paywall-title" className="font-display text-2xl font-black text-ink">{pkg.title}</h2>
          <p className="mt-1 text-sm font-bold text-ink-soft">A1 Unit 1–6 luôn miễn phí. Mua một lần {pkg.price}, dùng mãi mãi.</p>
        </div>
        <ul className="space-y-1.5 text-left text-sm font-bold text-ink">
          {pkg.opens.map(line => <li key={line} className="flex gap-2"><span aria-hidden="true">✅</span>{line}</li>)}
        </ul>

        {ownsPackage(access, pkg) ? (
          <p className="rounded-2xl bg-emerald-50 p-3 text-sm font-bold text-emerald-800">Tài khoản này đã mở khóa {pkg.level}. Chọn lại bài để học nhé!</p>
        ) : access.status === 'checking' ? (
          <p role="status" className="text-sm font-bold text-ink-soft">Đang kiểm tra tài khoản…</p>
        ) : access.status === 'offline' ? (
          <p className="rounded-2xl bg-amber-50 p-3 text-sm font-bold text-amber-900">
            Chưa kết nối được lopso.vn. Khi có mạng, hãy mở app tại lopso.vn/hoc-sinh/english-adventure để đăng nhập và mua gói.
          </p>
        ) : access.status === 'signed-out' ? (
          <div className="space-y-2">
            <p className="text-sm font-bold text-ink-soft">Nhờ bố mẹ hoặc thầy cô đăng nhập để mua hoặc dùng gói đã mua.</p>
            <Button variant="primary" size="lg" className="w-full" onClick={() => window.location.assign(signInUrl(window.location.pathname))}>
              Đăng nhập bằng Google
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {access.name && <p className="text-sm font-bold text-ink-soft">Tài khoản: {access.name}</p>}
            <Button variant="success" size="lg" className="w-full" disabled={busy} onClick={() => void buy()}>
              {busy ? 'Đang tạo mã QR…' : `Mua bằng chuyển khoản · ${pkg.price}`}
            </Button>
            <p className="text-xs font-bold text-ink-soft">Quét mã VietQR bằng app ngân hàng. Gói mở ngay khi ngân hàng báo đã nhận tiền.</p>
          </div>
        )}
        {error && <p role="alert" className="text-sm font-bold text-red-600">{error}</p>}
      </div>
    </div>
  );
};

/** A thin line while the server confirms a payment the player just made. */
export const PaymentStatusBanner: React.FC = () => {
  const { confirmingPayment, access } = useGame();
  const [outcome, setOutcome] = useState<{ kind: 'owned' | 'waiting'; level: string } | null>(null);
  const waitingFor = useRef<Package | null>(null);
  useEffect(() => {
    if (confirmingPayment) waitingFor.current = confirmingPayment;
    else if (waitingFor.current) {
      const pkg = waitingFor.current;
      waitingFor.current = null;
      setOutcome({ kind: ownsPackage(access, pkg) ? 'owned' : 'waiting', level: pkg.level });
    }
  }, [confirmingPayment, access]);
  if (confirmingPayment) return <div role="status" className="bg-sky-100 px-4 py-3 text-sm font-bold text-sky-900">Đang xác nhận thanh toán với ngân hàng…</div>;
  if (outcome?.kind === 'owned') return <div role="status" className="bg-emerald-100 px-4 py-3 text-sm font-bold text-emerald-900">🎉 Đã mở khóa trọn bộ {outcome.level}. Chúc bạn học vui!</div>;
  if (outcome?.kind === 'waiting') return (
    <div role="status" className="bg-amber-100 px-4 py-3 text-sm font-bold text-amber-950">
      Ngân hàng chưa báo nhận tiền. Tải lại trang sau ít phút; nếu sau 24 giờ vẫn chưa mở, gửi mã đơn tới minhmanteach@gmail.com.
    </div>
  );
  return null;
};
