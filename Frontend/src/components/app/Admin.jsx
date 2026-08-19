import React from 'react';
import { ADMIN_USERS, ADMIN_LOGS } from '../../data/categories';

const KPIS = [
  { l: 'Total Users', n: ADMIN_USERS.length, co: 'var(--indigo)' },
  { l: 'Scans This Month', n: 342, co: 'var(--cyan)' },
  { l: 'API Requests (24h)', n: '1,284', co: 'var(--violet)' },
  { l: 'Error Rate', n: '0.4%', co: 'var(--coral)' },
];

function statusColor(status) {
  return status === 'Active' ? 'var(--cyan)' : status === 'Trial' ? 'var(--amber)' : 'var(--ink4)';
}

export default function Admin() {
  return (
    <div>
      <div className="kpi-row">
        {KPIS.map((k) => (
          <div className="kpi card" key={k.l}>
            <div className="kpi-n" style={{ color: k.co }}>{k.n}</div>
            <div className="kpi-l">{k.l}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="ph2"><span className="ph2-t">Users</span></div>
        <div className="tbl-wrap tbl-scroll">
          <table className="dtbl">
            <thead><tr><th>User</th><th>Org</th><th>Plan</th><th>Scans</th><th>Status</th></tr></thead>
            <tbody>
              {ADMIN_USERS.map((u) => (
                <tr key={u.n}>
                  <td><b>{u.n}</b></td>
                  <td>{u.org}</td>
                  <td>{u.plan}</td>
                  <td>{u.scans}</td>
                  <td><span className="pill" style={{ background: statusColor(u.status) + '22', color: statusColor(u.status) }}>{u.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card">
        <div className="ph2"><span className="ph2-t">System Logs</span></div>
        <div className="pcb" style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink3)', display: 'flex', flexDirection: 'column', gap: 7 }}>
          {ADMIN_LOGS.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </div>
    </div>
  );
}
