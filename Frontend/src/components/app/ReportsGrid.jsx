import React from 'react';
import { useApp } from '../../context/AppContext';
import { timeAgo } from '../../utils/helpers';

export default function ReportsGrid() {
  const { scans, openReport } = useApp();
  const sorted = [...scans].sort((a, b) => new Date(b.scannedAt) - new Date(a.scannedAt));

  if (!sorted.length) return <div style={{ color: 'var(--ink4)' }}>No reports yet</div>;

  return (
    <div className="row2b">
      {sorted.map((s) => (
        <div className="card" style={{ padding: 18, cursor: 'pointer' }} key={s.id} onClick={() => openReport(s.id)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <b style={{ fontFamily: 'var(--disp)' }}>{s.domain}</b>
            <span style={{ fontFamily: 'var(--disp)', fontWeight: 800, color: s.riskColor }}>{s.score}</span>
          </div>
          <span className="pill" style={{ background: s.riskColor + '22', color: s.riskColor }}>{s.risk}</span>
          <div style={{ fontSize: 11, color: 'var(--ink4)', marginTop: 10 }}>{timeAgo(s.scannedAt)}</div>
        </div>
      ))}
    </div>
  );
}
