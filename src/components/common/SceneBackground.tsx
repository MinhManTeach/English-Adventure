import React from 'react';

/** Faint doodles scattered over the sky: letters, stars and school things, like a notebook cover. */
const DOODLES = [
  { t: 'A', x: 6, y: 18, r: -12 }, { t: '★', x: 92, y: 14, r: 10 }, { t: 'b', x: 14, y: 46, r: 8 },
  { t: '✏️', x: 88, y: 40, r: -20 }, { t: '?', x: 4, y: 70, r: 14 }, { t: 'C', x: 95, y: 66, r: -8 },
  { t: '♪', x: 22, y: 30, r: -6 }, { t: '!', x: 80, y: 24, r: 12 }, { t: '★', x: 12, y: 88, r: -14 },
  { t: 'z', x: 84, y: 84, r: 6 }, { t: '📚', x: 30, y: 10, r: 8 }, { t: '✨', x: 70, y: 52, r: 0 },
] as const;

/**
 * The playful scene behind the main screens: a soft sky, drifting clouds, faint doodles
 * and rolling hills at the bottom. Fixed and decorative, so content scrolls over it.
 */
export const SceneBackground: React.FC = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#c9ecff] via-[#eaf8ff] to-[#fff6dc]">
    <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#fff3b0] opacity-70 blur-3xl" />
    <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-[#ffd9f0] opacity-50 blur-3xl" />
    <div className="absolute bottom-24 left-1/4 h-72 w-72 rounded-full bg-[#d7ffb8] opacity-60 blur-3xl" />

    {[{ top: '9%', size: 170, delay: '0s', dur: '70s' }, { top: '26%', size: 120, delay: '-30s', dur: '90s' }, { top: '52%', size: 140, delay: '-55s', dur: '80s' }].map((c, i) => (
      <svg key={i} viewBox="0 0 200 80" width={c.size} className="cloud-drift absolute -left-56 opacity-90" style={{ top: c.top, animationDuration: c.dur, animationDelay: c.delay }}>
        <path d="M30 70 Q5 70 8 50 Q10 32 34 34 Q40 10 70 14 Q92 -4 118 16 Q146 6 158 30 Q190 30 190 52 Q192 70 168 70 Z" fill="#fff" />
      </svg>
    ))}

    {DOODLES.map((d, i) => (
      <span key={i} className="absolute select-none font-display text-4xl font-black text-sky-brand/15"
        style={{ left: `${d.x}%`, top: `${d.y}%`, transform: `rotate(${d.r}deg)` }}>{d.t}</span>
    ))}

    <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-40 w-full sm:h-52">
      <path d="M0 120 Q180 40 380 110 T760 100 T1140 90 T1440 80 V220 H0 Z" fill="#b8f28b" />
      <path d="M0 160 Q240 90 520 150 T1000 140 T1440 130 V220 H0 Z" fill="#8ee05a" />
      <path d="M0 200 Q300 150 640 190 T1440 180 V220 H0 Z" fill="#6fcf3f" />
    </svg>
  </div>
);
