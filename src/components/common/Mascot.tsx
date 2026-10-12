import React from 'react';

/** "Sao Sáng", the smiling star guide. Pure SVG so it stays sharp at any size. */
export const Mascot: React.FC<{ size?: number; className?: string; wave?: boolean }> = ({ size = 96, className = '', wave = false }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden="true" focusable="false">
    <ellipse cx="60" cy="112" rx="30" ry="5" fill="#000" opacity="0.08" />
    <path d="M60 8 L74.5 39.5 L109 43.5 L83.5 67 L90.5 101 L60 84 L29.5 101 L36.5 67 L11 43.5 L45.5 39.5 Z"
      fill="#ffc800" stroke="#e5a500" strokeWidth="5" strokeLinejoin="round" />
    <path d="M60 18 L70 40 L60 36 Z" fill="#fff" opacity="0.55" />
    <ellipse cx="48" cy="58" rx="6" ry="8" fill="#3c3c3c" />
    <ellipse cx="72" cy="58" rx="6" ry="8" fill="#3c3c3c" />
    <circle cx="50" cy="55" r="2.4" fill="#fff" />
    <circle cx="74" cy="55" r="2.4" fill="#fff" />
    <ellipse cx="40" cy="70" rx="5" ry="3" fill="#ff9600" opacity="0.55" />
    <ellipse cx="80" cy="70" rx="5" ry="3" fill="#ff9600" opacity="0.55" />
    <path d="M51 71 Q60 80 69 71" fill="none" stroke="#3c3c3c" strokeWidth="4" strokeLinecap="round" />
    {wave && <path d="M101 38 q8 -6 6 -16" fill="none" stroke="#e5a500" strokeWidth="5" strokeLinecap="round" />}
  </svg>
);

/** The mascot with a speech bubble, used to greet and guide children. */
export const MascotSays: React.FC<{ title: string; subtitle?: string; size?: number }> = ({ title, subtitle, size = 88 }) => (
  <div className="flex items-end gap-3">
    <Mascot size={size} className="shrink-0 animate-float" wave />
    <div className="relative card-3d px-4 py-3 mb-4 min-w-0">
      <span aria-hidden="true" className="absolute -left-2 bottom-4 h-4 w-4 rotate-45 border-b-2 border-l-2 border-line bg-white" />
      <p className="font-display text-lg font-black leading-snug text-ink">{title}</p>
      {subtitle && <p className="text-sm font-bold text-ink-soft">{subtitle}</p>}
    </div>
  </div>
);
