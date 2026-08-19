import React, { useEffect, useRef, useState } from 'react';
import { HERO_STEPS } from '../../data/categories';
import { useApp } from '../../context/AppContext';
import { domainOf, normalizeUrl } from '../../utils/scanEngine';

function HeroTerminal() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const timers = HERO_STEPS.map((_, i) => setTimeout(() => setVisible((v) => Math.max(v, i + 1)), i * 480));
    return () => timers.forEach(clearTimeout);
  }, []);

  const passCount = HERO_STEPS.filter((s) => s[0] === 'pass').length;
  const score = Math.round((passCount / HERO_STEPS.length) * 100);
  const showScore = visible >= HERO_STEPS.length;

  return (
    <div className="term glass">
      <div className="term-bar">
        <div className="term-dot" style={{ background: '#ff5f57' }} />
        <div className="term-dot" style={{ background: '#febc2e' }} />
        <div className="term-dot" style={{ background: '#28c840' }} />
        <div className="term-title">vidhaan-scanner — live</div>
      </div>
      <div className="term-body">
        {HERO_STEPS.slice(0, visible).map((s, i) => (
          <div className={`term-line ${s[0]}`} key={i}>
            <span className="term-ic">{s[0] === 'pass' ? '✓' : '✕'}</span>
            <span>{s[1]}</span>
          </div>
        ))}
        {showScore && (
          <div className="term-score">
            <span style={{ color: 'var(--ink3)' }}>Compliance Score</span>
            <b>{score}/100</b>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const { setAuthView, toast } = useApp();
  const [url, setUrl] = useState('https://example.in');

  function startHeroScan() {
    setAuthView('register');
    toast(`Create a free account to see the full report for ${domainOf(normalizeUrl(url))}`);
  }

  return (
    <section className="hero">
      <div className="hero-glow1" /><div className="hero-glow2" /><div className="hero-grid" />
      <div className="wrap hero-in">
        <div>
          <div className="eyebrow">DPDP Act, 2023 · Automated Audit</div>
          <h1 className="hero-h1">
            Know if your website<br />breaks <span className="grad-text">India's privacy law</span> — before your users do.
          </h1>
          <p className="hero-sub">
            Vidhaan scans any public website against the Digital Personal Data Protection Act, 2023 — privacy policy,
            consent flows, security headers, user rights — and returns a scored, actionable compliance report in under a minute.
          </p>
          <div className="hero-scan-row">
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://yourcompany.in" />
            <button className="btn btn-grad" onClick={startHeroScan}>Scan now →</button>
          </div>
          <div className="hero-stats">
            <div className="hstat"><b>38</b><span>Checks per scan</span></div>
            <div className="hstat"><b>8</b><span>Compliance categories</span></div>
            <div className="hstat"><b>&lt;60s</b><span>Avg. scan time</span></div>
          </div>
        </div>
        <HeroTerminal />
      </div>
    </section>
  );
}
