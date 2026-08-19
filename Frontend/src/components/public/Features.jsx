import React from 'react';
import { FEATURES } from '../../data/categories';

export default function Features() {
  return (
    <section className="sec" id="features">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">What we check</div>
          <h2 className="sec-h2">Every clause of the DPDP Act, turned into a checklist</h2>
          <p className="sec-p">We don't guess — we crawl your live site, read the actual privacy policy, and test the actual consent flow against 38 individual requirements grouped into 8 categories.</p>
        </div>
        <div className="feat-grid">
          {FEATURES.map((f) => (
            <div className="feat-card card" key={f.t}>
              <div className="feat-ic" style={{ background: f.bg }}>{f.ic}</div>
              <div className="feat-t">{f.t}</div>
              <div className="feat-d">{f.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
