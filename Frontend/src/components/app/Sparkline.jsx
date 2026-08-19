import React, { useId } from 'react';

export default function Sparkline({ data, color = '#5468ff' }) {
  const W = 380, H = 80, pad = 8;
  const gid = 'spark-' + useId();
  if (data.length < 2) data = [data[0] || 0, data[0] || 0];
  const mn = Math.min(...data), mx = Math.max(...data);
  const pts = data.map((v, i) => ({
    x: (pad + (i / (data.length - 1)) * (W - 2 * pad)).toFixed(1),
    y: (H - pad - ((v - mn) / ((mx - mn) || 1)) * (H - 2 * pad)).toFixed(1),
  }));
  const poly = pts.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height: 80 }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`${pts[0].x},${H} ${poly} ${pts[pts.length - 1].x},${H}`} fill={`url(#${gid})`} />
      <polyline points={poly} fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === pts.length - 1 ? 5 : 3}
          fill={i === pts.length - 1 ? color : 'var(--bg2)'} stroke={color} strokeWidth="2" />
      ))}
    </svg>
  );
}
