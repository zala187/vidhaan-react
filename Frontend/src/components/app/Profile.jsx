import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function Profile() {
  const { profile, setProfile, toast } = useApp();
  const [form, setForm] = useState(profile);
  const initials = profile.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  function save() {
    setProfile(form);
    toast('✅ Profile updated');
  }

  return (
    <div className="card" style={{ padding: 24, maxWidth: 520 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <div className="sb-uav" style={{ width: 56, height: 56, fontSize: 20 }}>{initials}</div>
        <div>
          <div style={{ fontFamily: 'var(--disp)', fontWeight: 700, fontSize: 17 }}>{profile.name}</div>
          <div style={{ fontSize: 12, color: 'var(--ink4)' }}>Compliance Lead · {profile.org}</div>
        </div>
      </div>
      <div className="auth-field"><label>Full Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
      <div className="auth-field"><label>Email</label><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
      <div className="auth-field"><label>Organization</label><input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} /></div>
      <button className="btn btn-grad" onClick={save}>Save Changes</button>
    </div>
  );
}
