import React from 'react';
import { useApp } from '../../context/AppContext';

export default function CTABand() {
  const { setAuthView } = useApp();
  return (
    <section className="sec" id="contact">
      <div className="wrap">
        <div className="cta-band">
          <h3>Run your first compliance scan for free</h3>
          <p>No credit card. No install. Just paste your URL and see where you stand in under a minute.</p>
          <button className="btn btn-grad" onClick={() => setAuthView('register')}>Start free scan →</button>
        </div>
      </div>
    </section>
  );
}
