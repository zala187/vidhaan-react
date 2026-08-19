export function timeAgo(iso) {
  const h = Math.round((Date.now() - new Date(iso)) / 3600000);
  if (h < 1) return 'Just now';
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

function csvEsc(v) {
  v = String(v == null ? '' : v);
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

export function toCSV(rows) {
  return rows.map((r) => r.map(csvEsc).join(',')).join('\n');
}

export function downloadBlob(filename, content, type = 'text/csv') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportReportCSV(scan) {
  const rows = [['Category', 'Check', 'Result']];
  scan.categories.forEach((c) => c.checks.forEach((chk) => rows.push([c.name, chk.t, chk.pass ? 'Pass' : 'Fail'])));
  downloadBlob(`vidhaan-report-${scan.domain}.csv`, toCSV(rows));
}

export function exportAllScans(scans) {
  downloadBlob('vidhaan-scans-backup.json', JSON.stringify(scans, null, 2), 'application/json');
}
