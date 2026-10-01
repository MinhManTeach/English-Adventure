import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  durationMs = 900,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [current, setCurrent] = useState(from);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const val = Math.round(from + (to - from) * eased);
      setCurrent(val);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [from, to, durationMs]);

  return (
    <span className={`tabular-nums font-black ${className}`}>
      {prefix}
      {current}
      {suffix}
    </span>
  );
};
