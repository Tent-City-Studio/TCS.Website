const fs = require('fs');
const path = require('path');

function parseEnv(content) {
  const result = {};
  content.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const [key, ...rest] = trimmed.split('=');
    result[key] = rest.join('=');
  });
  return result;
}

function loadEnv(envPath = path.resolve(__dirname, '..', '.env')) {
  if (!fs.existsSync(envPath)) return {};
  const file = fs.readFileSync(envPath, 'utf8');
  const env = parseEnv(file);
  Object.assign(process.env, env);
  return env;
}

module.exports = {
  loadEnv,
};
