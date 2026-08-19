import React from 'react';
import { LogoMark } from '../Logo';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="logo" style={{ marginBottom: 12 }}><LogoMark />Vidhaan</div>
            <p style={{ fontSize: 12.5, color: 'var(--ink4)', maxWidth: 220, lineHeight: 1.7 }}>
              Automated DPDP Act, 2023 compliance audits for Indian websites.
            </p>
          </div>
          <div>
            <div className="foot-h">Product</div>
            <div className="foot-links"><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></div>
          </div>
          <div>
            <div className="foot-h">Company</div>
            <div className="foot-links"><a href="#">About</a><a href="#">Blog</a><a href="#contact">Contact</a></div>
          </div>
          <div>
            <div className="foot-h">Legal</div>
            <div className="foot-links"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Grievance Officer</a></div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Vidhaan Technologies. Not affiliated with the Government of India.</span>
          <span>Made for DPDP Act, 2023</span>
        </div>
      </div>
    </footer>
  );
}
