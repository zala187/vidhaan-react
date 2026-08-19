import React from 'react';
import { useApp } from '../../context/AppContext';

const APP_TITLES = {
  dashboard: 'Dashboard', scanner: 'Scanner', report: 'Compliance Report',
  history: 'Scan History', reports: 'Reports', settings: 'Settings',
  profile: 'Profile', admin: 'Admin Panel',
};

export default function Topbar({ onBurger }) {
  const { curApp, setCurApp, theme, toggleTheme } = useApp();
  return (
    <div className="app-top">
      <button className="app-burger" onClick={onBurger}>☰</button>
      <div className="app-title">{APP_TITLES[curApp] || 'Dashboard'}</div>
      <div style={{ flex: 1 }} />
      <button className="theme-toggle" onClick={toggleTheme}>{theme === 'light' ? '☀️' : '🌙'}</button>
      <button className="btn btn-grad btn-sm" onClick={() => setCurApp('scanner')}>+ New Scan</button>
    </div>
  );
}
