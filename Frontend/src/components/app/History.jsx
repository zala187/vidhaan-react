import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { timeAgo } from '../../utils/helpers';

export default function History() {
  const { scans, deleteScan, openReport, toast } = useApp();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);

  const list = useMemo(() => {
    const q = search.toLowerCase();
    return scans
      .filter((s) => !q || s.domain.toLowerCase().includes(q))
      .sort((a, b) => new Date(b.scannedAt) - new Date(a.scannedAt));
  }, [scans, search]);

  function toggleSelect(id) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      const next = prev.length >= 2 ? prev.slice(1) : prev;
      return [...next, id];
    });
  }

  function compareSelected() {
    if (selected.length !== 2) return;
    const a = scans.find((s) => s.id === selected[0]);
    const b = scans.find((s) => s.id === selected[1]);
    if (!a || !b) return;
    const verdict = a.score > b.score ? `${a.domain} scores higher` : b.score > a.score ? `${b.domain} scores higher` : 'Tied score';
    toast(`${a.domain} (${a.score}) vs ${b.domain} (${b.score}) — ${verdict}`);
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: 1, minWidth: 220, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px' }}>
          <span>🔍</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by URL..." style={{ border: 'none', background: 'none', flex: 1 }} />
        </div>
        <button className="btn btn-outline" disabled={selected.length !== 2} onClick={compareSelected}>⇄ Compare ({selected.length})</button>
      </div>
      <div className="tbl-wrap card tbl-scroll">
        <table className="dtbl">
          <thead><tr><th></th><th>Website</th><th>Score</th><th>Risk</th><th>Scanned</th><th></th></tr></thead>
          <tbody>
            {list.length ? list.map((s) => (
              <tr key={s.id}>
                <td><input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggleSelect(s.id)} /></td>
                <td style={{ cursor: 'pointer' }} onClick={() => openReport(s.id)}>
                  <b>{s.domain}</b>
                  <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink4)' }}>{s.url}</div>
                </td>
                <td style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: s.riskColor }}>{s.score}</td>
                <td><span className="pill" style={{ background: s.riskColor + '22', color: s.riskColor }}>{s.risk}</span></td>
                <td style={{ color: 'var(--ink4)' }}>{timeAgo(s.scannedAt)}</td>
                <td>
                  <button className="btn btn-ghost btn-sm" onClick={() => openReport(s.id)}>View</button>{' '}
                  <button className="btn btn-outline btn-sm" style={{ color: 'var(--coral)' }} onClick={() => deleteScan(s.id)}>🗑</button>
                </td>
              </tr>
            )) : <tr><td colSpan={6} style={{ textAlign: 'center', padding: 30, color: 'var(--ink4)' }}>No scans found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
