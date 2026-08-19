import React from 'react';

export default function RiskDonut({ segments }) {
  const r = 40, circ = 2 * Math.PI * r, gap = segments.length > 1 ? 4 : 0;
  const total = segments.reduce((a, s) => a + s.v, 0) || 1;
  let off = 0;

  return (
    <svg viewBox="0 0 96 96" width="96" height="96">
      <circle cx="48" cy="48" r={r} fill="none" stroke="var(--surf3)" strokeWidth="12" />
      {segments.map((s, i) => {
        const frac = s.v / total;
        const filled = circ * frac - (segments.length > 1 ? gap : 0);
        const el = (
          <circle key={i} cx="48" cy="48" r={r} fill="none" stroke={s.c} strokeWidth="12"
            strokeDasharray={`${Math.max(0, filled)} ${circ - Math.max(0, filled)}`}
            strokeDashoffset={-off} strokeLinecap="round" transform="rotate(-90 48 48)" />
        );
        off += circ * frac;
        return el;
      })}
    </svg>
  );
}
