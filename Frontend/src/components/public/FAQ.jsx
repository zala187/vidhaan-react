import React, { useState } from 'react';
import { FAQS } from '../../data/categories';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="sec" id="faq">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="sec-head">
          <div className="eyebrow">FAQ</div>
          <h2 className="sec-h2">Common questions</h2>
        </div>
        <div>
          {FAQS.map((f, i) => (
            <div className={`faq-item${openIndex === i ? ' open' : ''}`} key={f.q} onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              <div className="faq-q">{f.q}<span className="faq-ic">+</span></div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
