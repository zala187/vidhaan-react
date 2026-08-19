import React, { useState } from 'react';
import { ACCENTS } from '../../data/categories';
import { useApp } from '../../context/AppContext';
import { exportAllScans as exportAllScansFile } from '../../utils/helpers';

function ToggleRow({ title, desc, defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="toggle-row">
      <div><b style={{ fontSize: 12.5 }}>{title}</b><div style={{ fontSize: 11, color: 'var(--ink4)' }}>{desc}</div></div>
      <div className={`switch${on ? ' on' : ''}`} onClick={() => setOn((v) => !v)} />
    </div>
  );
}

export default function Settings() {
  const { scans, clearHistory, accentIndex, setAccentIndex, toast } = useApp();
  const [apiKey, setApiKey] = useState('');

  return (
    <div>
      <div className="card" style={{ padding: 22, marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, marginBottom: 14 }}>Notifications</div>
        <ToggleRow title="Critical risk alerts" desc="Email me when a scan scores below 30" defaultOn />
        <ToggleRow title="Weekly summary" desc="A digest of all scans every Monday" defaultOn />
        <ToggleRow title="Scan completion emails" desc="Notify when a scan finishes" defaultOn={false} />
      </div>

      <div className="card" style={{ padding: 22, marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, marginBottom: 14 }}>Accent Color</div>
        <div style={{ display: 'flex', gap: 12 }}>
          {ACCENTS.map((a, i) => (
            <div key={i} className={`theme-swatch${accentIndex === i ? ' on' : ''}`} style={{ background: a[0] }}
              onClick={() => { setAccentIndex(i); toast('🎨 Accent color updated'); }} />
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 22, marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, marginBottom: 6 }}>AI Analysis API Key</div>
        <p style={{ fontSize: 11.5, color: 'var(--ink4)', marginBottom: 12 }}>
          Bring your own OpenAI key if you self-host the Vidhaan backend. Used only server-side, never stored in the browser.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="sk-••••••••••••••••" style={{ flex: 1 }} type="password" />
          <button className="btn btn-ghost" onClick={() => toast('🔒 Key saved for this session')}>Save</button>
        </div>
      </div>

      <div className="card" style={{ padding: 22 }}>
        <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, marginBottom: 6 }}>Data</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
          <button className="btn btn-ghost" onClick={() => { exportAllScansFile(scans); toast('⬇️ All scans exported as JSON'); }}>⬇ Export all scans (JSON)</button>
          <button className="btn btn-outline" style={{ color: 'var(--coral)', borderColor: 'var(--corall)' }}
            onClick={() => { if (window.confirm('Delete all scan history? This cannot be undone.')) clearHistory(); }}>
            🗑 Clear scan history
          </button>
        </div>
      </div>
    </div>
  );
}
