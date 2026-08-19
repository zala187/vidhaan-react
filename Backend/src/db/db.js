const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'users.json');

// Ensure the store exists on boot.
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]', 'utf-8');

function readAll() {
  const raw = fs.readFileSync(DB_FILE, 'utf-8') || '[]';
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Writes are queued so two near-simultaneous requests can't clobber each other.
let writeChain = Promise.resolve();
function writeAll(data) {
  writeChain = writeChain.then(
    () => fs.promises.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8')
  );
  return writeChain;
}

module.exports = { readAll, writeAll };
