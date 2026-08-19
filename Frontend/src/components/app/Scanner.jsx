import React, { useEffect, useRef, useState } from 'react';
import { SCAN_STEP_LABELS } from '../../data/categories';
import { useApp } from '../../context/AppContext';

export default function Scanner() {
  const { addScan, openReport, toast } = useApp();
  const [url, setUrl] = useState('');
  const [running, setRunning] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [doneSteps, setDoneSteps] = useState(0);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function runScan() {
    if (!url) { toast('Enter a website URL first'); return; }
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(true);
    setVisibleSteps(0);
    setDoneSteps(0);

    SCAN_STEP_LABELS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setVisibleSteps((v) => Math.max(v, i + 1)), i * 520));
      timers.current.push(setTimeout(() => setDoneSteps((v) => Math.max(v, i + 1)), i * 520 + 420));
      if (i === SCAN_STEP_LABELS.length - 1) {
        timers.current.push(setTimeout(() => {
          const scan = addScan(url);
          setRunning(false);
          setUrl('');
          openReport(scan.id);
          toast(`✅ Scan complete — ${scan.domain} scored ${scan.score}/100`);
        }, i * 520 + 600));
      }
    });
  }

  return (
    <section>
      <div className="scanner-hero card">
        <div className="eyebrow" style={{ justifyContent: 'center' }}>New Scan</div>
        <h2 style={{ fontFamily: 'var(--disp)', fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Enter a website to audit</h2>
        <p style={{ color: 'var(--ink3)', fontSize: 13 }}>We'll check it against all 38 DPDP Act requirements</p>
        <div className="scan-input-row">
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://yourcompany.in" disabled={running} />
          <button className="btn btn-grad" onClick={runScan} disabled={running}>Start Scan</button>
        </div>
        <div className={`scan-progress-wrap${running ? ' on' : ''}`}>
          <div style={{ marginTop: 26, textAlign: 'left' }}>
            {SCAN_STEP_LABELS.slice(0, visibleSteps).map((label, i) => (
              <div className="scan-step" key={label}>
                {i < doneSteps ? <span className="step-check">✓</span> : <div className="step-spin" />}
                <span className="scan-step-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
