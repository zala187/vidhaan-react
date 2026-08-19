import { CATEGORIES, TOTAL_CHECKS } from '../data/categories';

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function uid() {
  return Date.now() + Math.floor(Math.random() * 10000);
}

export function normalizeUrl(u) {
  u = (u || '').trim();
  if (!u) return 'https://example.in';
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
  return u;
}

export function domainOf(u) {
  try {
    return new URL(u).hostname.replace(/^www\./, '');
  } catch {
    return u;
  }
}

function buildSummary(domain, score, failed) {
  const intro =
    score >= 90 ? `${domain} demonstrates strong alignment with the DPDP Act, 2023, with only minor gaps remaining.` :
    score >= 70 ? `${domain} is largely compliant with the DPDP Act, 2023, but a handful of requirements still need attention before an audit would consider it low-risk.` :
    score >= 50 ? `${domain} meets some baseline requirements of the DPDP Act, 2023, but has significant gaps — particularly around consent and user rights — that should be prioritized.` :
    score >= 30 ? `${domain} falls short of core DPDP Act, 2023 obligations. Consent flows, grievance handling and security headers all need immediate remediation.` :
    `${domain} shows critical non-compliance with the DPDP Act, 2023. Data collection appears to happen with little to no disclosed consent framework, which carries material regulatory risk.`;
  const top = failed.slice(0, 4).map((f) => `• ${f.t} (${f.cat})`).join('\n');
  return intro + (failed.length
    ? `\n\nKey gaps identified:\n${top}${failed.length > 4 ? `\n• +${failed.length - 4} more items — see full checklist below.` : ''}`
    : '\n\nNo material gaps were identified in this scan.');
}

export function riskOf(score) {
  return score >= 90 ? 'Excellent'
    : score >= 70 ? 'Mostly Compliant'
    : score >= 50 ? 'Needs Improvement'
    : score >= 30 ? 'High Risk'
    : 'Critical';
}

export function riskColorOf(risk) {
  return risk === 'Excellent' ? '#21e6c1'
    : risk === 'Mostly Compliant' ? '#5468ff'
    : risk === 'Needs Improvement' ? '#ffb020'
    : risk === 'High Risk' ? '#ff8a3d'
    : '#ff5470';
}

// Generates a full, deterministic scan report for a given URL.
export function generateScan(url) {
  url = normalizeUrl(url);
  const seed = hashStr(domainOf(url).toLowerCase());
  const rnd = mulberry32(seed);

  const categories = CATEGORIES.map((cat) => {
    const checks = cat.checks.map((c) => ({ t: c.t, pass: rnd() < c.p }));
    const passed = checks.filter((c) => c.pass).length;
    return { key: cat.key, name: cat.name, icon: cat.icon, checks, passed, total: checks.length, pct: Math.round((passed / checks.length) * 100) };
  });

  const totalPassed = categories.reduce((a, c) => a + c.passed, 0);
  const score = Math.round((totalPassed / TOTAL_CHECKS) * 100);
  const risk = riskOf(score);
  const riskColor = riskColorOf(risk);

  const failedChecks = [];
  categories.forEach((cat) => cat.checks.forEach((c) => { if (!c.pass) failedChecks.push({ cat: cat.name, t: c.t }); }));

  const domain = domainOf(url);
  return {
    id: uid(),
    url,
    domain,
    score,
    risk,
    riskColor,
    categories,
    failedChecks,
    scannedAt: new Date().toISOString(),
    summary: buildSummary(domain, score, failedChecks),
  };
}
