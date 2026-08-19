import React from 'react';
import { PRICING } from '../../data/categories';
import { useApp } from '../../context/AppContext';

export default function Pricing() {
  const { setAuthView } = useApp();
  return (
    <section className="sec" id="pricing">
      <div className="wrap">
        <div className="sec-head" style={{ margin: '0 auto 48px', textAlign: 'center', maxWidth: 560 }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Pricing</div>
          <h2 className="sec-h2">Simple plans for teams of any size</h2>
        </div>
        <div className="price-grid">
          {PRICING.map((p) => (
            <div className={`price-card card${p.feat ? ' feat' : ''}`} key={p.t}>
              {p.feat && <div className="price-badge">Most Popular</div>}
              <div className="price-t">{p.t}</div>
              <div className="price-n">{p.price} <span>{p.per}</span></div>
              <ul className="price-list">
                {p.list.map((l) => <li key={l}>{l}</li>)}
              </ul>
              <button className={`btn ${p.feat ? 'btn-grad' : 'btn-outline'} btn-block`} onClick={() => setAuthView('register')}>Get started</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
