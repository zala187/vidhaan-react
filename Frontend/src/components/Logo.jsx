import React from 'react';

export function LogoMark() {
  return (
    <div className="logo-mark">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 2 4 5.5v6c0 5.5 3.4 9.7 8 11 4.6-1.3 8-5.5 8-11v-6L12 2z" stroke="#fff" strokeWidth="1.6" />
        <path d="M9 12l2 2 4-4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function Logo({ style }) {
  return (
    <div className="logo" style={style}>
      <LogoMark />
      Vidhaan
    </div>
  );
}
