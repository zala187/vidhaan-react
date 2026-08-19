import React from 'react';

const STEPS = [
  { n: '01 — Submit', t: 'Paste your website URL', d: 'No installation, no code changes. We only need the public URL of the site you want audited.' },
  { n: '02 — Scan', t: 'We crawl & analyze', d: 'Our engine crawls your privacy policy, forms, cookies and security headers, then runs it through DPDP-specific AI analysis.' },
  { n: '03 — Report', t: 'Get a scored report', d: 'A 0–100 compliance score, category breakdown, and a prioritized fix list — exportable as PDF or CSV.' },
];

export default function HowItWorks() {
  return (
    <section className="sec" id="how" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">The process</div>
          <h2 className="sec-h2">From URL to audit report in three steps</h2>
        </div>
        <div className="steps-row">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <div className="step-n">{s.n}</div>
              <div className="step-t">{s.t}</div>
              <div className="step-d">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
