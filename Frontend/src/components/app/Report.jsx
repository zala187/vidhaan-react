import React from 'react';
import { useApp } from '../../context/AppContext';
import { TOTAL_CHECKS } from '../../data/categories';
import { timeAgo } from '../../utils/helpers';
import { exportReportCSV } from '../../utils/helpers';

export default function Report() {
  const { scans, currentReportId, setCurApp, toast } = useApp();
  const s = scans.find((x) => x.id === currentReportId);

  if (!s) {
    return <div style={{ textAlign: 'center', padding: 60, color: 'var(--ink4)' }}>No report selected. Run a scan first.</div>;
  }

  function handleExportCSV() {
    exportReportCSV(s);
    toast('⬇️ Report CSV downloaded');
  }

  const totalPassed = s.categories.reduce((a, c) => a + c.passed, 0);

  return (
    <div>
      <div className="rpt-head card">
        <div className="rpt-dial">
          <svg viewBox="0 0 104 104" width="104" height="104">
            <circle cx="52" cy="52" r="44" fill="none" stroke="var(--surf3)" strokeWidth="9" />
            <circle cx="52" cy="52" r="44" fill="none" stroke={s.riskColor} strokeWidth="9"
              strokeDasharray={`${Math.round(2 * Math.PI * 44 * s.score / 100)} ${Math.round(2 * Math.PI * 44)}`}
              strokeLinecap="round" />
          </svg>
          <div className="rpt-dial-n"><b style={{ color: s.riskColor }}>{s.score}</b><span>/ 100</span></div>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 19 }}>{s.domain}</div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--ink4)', margin: '4px 0 10px' }}>{s.url}</div>
          <span className="pill" style={{ background: s.riskColor + '22', color: s.riskColor }}>● {s.risk}</span>
          <span className="pill" style={{ background: 'var(--surf2)', color: 'var(--ink3)', marginLeft: 8 }}>Scanned {timeAgo(s.scannedAt)}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm" onClick={() => window.print()}>⬇ Export PDF</button>
          <button className="btn btn-outline btn-sm" onClick={handleExportCSV}>⬇ Export CSV</button>
          <button className="btn btn-grad btn-sm" onClick={() => setCurApp('scanner')}>↻ Re-scan</button>
        </div>
      </div>

      <div className="row2">
        <div className="card">
          <div className="ph2"><span className="ph2-t">Category Breakdown</span></div>
          <div className="pcb">
            {s.categories.map((c) => {
              const col = c.pct >= 80 ? '#21e6c1' : c.pct >= 50 ? '#5468ff' : c.pct >= 30 ? '#ffb020' : '#ff5470';
              return (
                <div className="cat-bar-row" key={c.key}>
                  <span className="cat-bar-label">{c.icon} {c.name}</span>
                  <div className="cat-bar-track"><div className="cat-bar-fill" style={{ width: c.pct + '%', background: col }} /></div>
                  <span className="cat-bar-n mono">{c.passed}/{c.total}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card">
          <div className="ph2"><span className="ph2-t">🤖 AI Compliance Summary</span></div>
          <div className="ai-summary">{s.summary}</div>
        </div>
      </div>

      <div className="card">
        <div className="ph2">
          <span className="ph2-t">Full Compliance Matrix</span>
          <span className="ph2-s">{totalPassed} / {TOTAL_CHECKS} checks passed</span>
        </div>
        {s.categories.map((c) => (
          <React.Fragment key={c.key}>
            <div className="chk-group-h">{c.icon} {c.name}</div>
            {c.checks.map((chk) => (
              <div className="chk-row" key={chk.t}>
                <div className="chk-ic" style={{ background: chk.pass ? 'var(--cyanl)' : 'var(--corall)', color: chk.pass ? 'var(--cyan)' : 'var(--coral)' }}>
                  {chk.pass ? '✓' : '✕'}
                </div>
                <span className="chk-txt">{chk.t}</span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
