// The 38-point DPDP Act, 2023 checklist, grouped into 8 categories.
export const CATEGORIES = [
  { key: 'privacy', name: 'Privacy Policy', icon: '📄', checks: [
    { t: 'Privacy Policy exists on the website', p: 0.88 },
    { t: 'Privacy Policy is accessible from the homepage', p: 0.8 },
    { t: 'Purpose of data collection is clearly stated', p: 0.62 },
    { t: 'Data processing activities are explained', p: 0.55 },
    { t: 'Data retention period is disclosed', p: 0.4 },
  ]},
  { key: 'consent', name: 'Consent Mechanism', icon: '✅', checks: [
    { t: 'Consent is obtained before data collection', p: 0.58 },
    { t: 'Cookie consent banner is present', p: 0.72 },
    { t: 'Cookie preference settings are available', p: 0.5 },
    { t: 'Consent withdrawal option is provided', p: 0.35 },
    { t: 'Consent checkboxes are not pre-ticked', p: 0.6 },
  ]},
  { key: 'rights', name: 'User Rights', icon: '⚖️', checks: [
    { t: 'Right to Access is mentioned', p: 0.5 },
    { t: 'Right to Correction is mentioned', p: 0.45 },
    { t: 'Right to Erasure ("right to be forgotten") is mentioned', p: 0.38 },
    { t: 'Right to Nominate is mentioned', p: 0.18 },
    { t: 'A grievance redressal process is described', p: 0.42 },
  ]},
  { key: 'grievance', name: 'Contact & Grievance Officer', icon: '📮', checks: [
    { t: 'A named Grievance Officer is published', p: 0.3 },
    { t: 'Grievance Officer email is available', p: 0.35 },
    { t: 'General privacy contact is available', p: 0.68 },
    { t: 'A response-time commitment is stated', p: 0.22 },
  ]},
  { key: 'children', name: "Children's Data", icon: '🧒', checks: [
    { t: 'Age verification mechanism exists', p: 0.25 },
    { t: 'Parental consent is required for minors', p: 0.2 },
    { t: "Children's data handling policy is published", p: 0.22 },
  ]},
  { key: 'security', name: 'Security Practices', icon: '🔐', checks: [
    { t: 'HTTPS is enforced site-wide', p: 0.9 },
    { t: 'Valid SSL certificate is installed', p: 0.92 },
    { t: 'HSTS header is present', p: 0.45 },
    { t: 'Content-Security-Policy header is present', p: 0.4 },
    { t: 'X-Frame-Options header is present', p: 0.5 },
    { t: 'Cookies use Secure, HttpOnly & SameSite flags', p: 0.42 },
  ]},
  { key: 'datahandling', name: 'Data Handling & Transfers', icon: '🌐', checks: [
    { t: 'Cross-border data transfer is disclosed', p: 0.3 },
    { t: 'Third-party data sharing is disclosed', p: 0.48 },
    { t: 'A data breach notification policy exists', p: 0.28 },
    { t: 'Users can request account/data deletion', p: 0.44 },
  ]},
  { key: 'legal', name: 'Legal Pages', icon: '📜', checks: [
    { t: 'Terms & Conditions page exists', p: 0.85 },
    { t: 'Refund / Cancellation policy exists (if applicable)', p: 0.6 },
  ]},
];

export const TOTAL_CHECKS = CATEGORIES.reduce((a, c) => a + c.checks.length, 0);

export const FEATURES = [
  { ic: '📄', bg: 'var(--indigol)', t: 'Privacy Policy Audit', d: 'We read your actual privacy policy and check it for the disclosures DPDP requires — purpose, retention, processing.' },
  { ic: '✅', bg: 'var(--cyanl)', t: 'Consent Flow Testing', d: 'We detect cookie banners, pre-ticked boxes, and whether consent is captured before data collection begins.' },
  { ic: '⚖️', bg: 'var(--violetl)', t: 'User Rights Check', d: 'Access, correction, erasure and nomination — we verify each right is documented and reachable.' },
  { ic: '🔐', bg: 'var(--indigol)', t: 'Security Headers Scan', d: 'HTTPS, HSTS, CSP, X-Frame-Options and cookie flags, checked against current best practice.' },
  { ic: '🧒', bg: 'var(--corall)', t: "Children's Data Rules", d: 'Age verification and parental consent requirements, flagged wherever a site targets minors.' },
  { ic: '🤖', bg: 'var(--cyanl)', t: 'AI Legal Summary', d: 'A plain-English summary of your compliance posture, with the highest-priority gaps ranked first.' },
];

export const PRICING = [
  { t: 'Starter', price: '₹0', per: '/mo', feat: false, list: ['3 scans per month', 'Core compliance checklist', 'Email support', 'PDF export'] },
  { t: 'Growth', price: '₹2,499', per: '/mo', feat: true, list: ['Unlimited scans', 'Full 38-point checklist', 'AI legal summaries', 'Scheduled scans', 'PDF + Excel export', 'Priority support'] },
  { t: 'Enterprise', price: 'Custom', per: '', feat: false, list: ['Everything in Growth', 'Multi-site batch scans', 'API access', 'Dedicated compliance advisor', 'Custom SLA'] },
];

export const FAQS = [
  { q: 'Does Vidhaan store my privacy policy or website content?', a: 'We only store scan results (pass/fail per check and your score history) — not the raw HTML or policy text of scanned sites.' },
  { q: 'Is this legal advice?', a: 'No. Vidhaan is an automated technical and textual audit tool. It flags likely gaps against the DPDP Act, 2023, but you should confirm remediation with legal counsel.' },
  { q: "Can I scan a website I don't own?", a: 'Yes — Vidhaan only reads publicly accessible pages, the same way a browser or search engine would.' },
  { q: 'How often should I re-scan?', a: 'We recommend scanning after any change to your privacy policy, checkout flow, or cookie setup, and at minimum once a quarter.' },
];

export const ACCENTS = [
  ['#5468ff', '#9b5de5'],
  ['#21e6c1', '#0fc9a6'],
  ['#ff5470', '#e23a56'],
  ['#ffb020', '#e0940c'],
  ['#9b5de5', '#7f3fd1'],
];

export const ADMIN_USERS = [
  { n: 'Sarah Anand', org: 'NimbusPay', plan: 'Growth', scans: 14, status: 'Active' },
  { n: 'Rahul Mehta', org: 'Kosha Health', plan: 'Enterprise', scans: 41, status: 'Active' },
  { n: 'Ayesha Khan', org: 'Rupeeka', plan: 'Starter', scans: 2, status: 'Trial' },
  { n: 'Vikram Rao', org: 'Trellis Logistics', plan: 'Growth', scans: 9, status: 'Active' },
  { n: 'Meera Iyer', org: 'Aster Retail', plan: 'Starter', scans: 0, status: 'Inactive' },
];

export const ADMIN_LOGS = [
  '[INFO] Scan completed for nimbuspay.in — score 82',
  '[WARN] Rate limit approached for user rahul@koshahealth.in',
  '[INFO] New user registered — ayesha@rupeeka.com',
  '[ERROR] Timeout fetching SSL cert for slowsite.example',
  '[INFO] Weekly digest emails sent — 214 recipients',
];

export const SEED_URLS = [
  'https://nimbuspay.in',
  'https://koshahealth.in',
  'https://rupeeka.com',
  'https://trellislogistics.in',
  'https://asterretail.in',
  'https://quickcart.in',
];

export const HERO_STEPS = [
  ['pass', 'Fetched robots.txt & sitemap'],
  ['pass', 'Located Privacy Policy at /privacy'],
  ['fail', 'Consent withdrawal option not found'],
  ['pass', 'HTTPS enforced, valid SSL certificate'],
  ['fail', 'Grievance Officer email not published'],
  ['pass', 'Cookie consent banner detected'],
];

export const SCAN_STEP_LABELS = [
  'Checking website availability...',
  'Checking Privacy Policy...',
  'Checking Cookie Policy...',
  'Checking Consent Banner...',
  'Checking Security Headers...',
  'Checking SSL Certificate...',
  'Checking Forms & Data Collection...',
  'Running AI Analysis...',
  'Generating Report...',
];
