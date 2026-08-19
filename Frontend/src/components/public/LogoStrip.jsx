import React from 'react';

const NAMES = ['TRUSTED BY COMPLIANCE TEAMS AT', 'NimbusPay', 'Kosha Health', 'Rupeeka', 'Trellis Logistics', 'Aster Retail'];

export default function LogoStrip() {
  return (
    <div className="strip">
      <div className="wrap strip-in">
        {NAMES.map((n) => <span key={n}>{n}</span>)}
      </div>
    </div>
  );
}
