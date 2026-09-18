const fs = require('fs');
const { execSync } = require('child_process');

const content = fs.readFileSync('.env.local', 'utf8');
const lines = content.split('\n');

for (const line of lines) {
  if (!line || line.startsWith('#') || !line.includes('=')) continue;
  const idx = line.indexOf('=');
  const key = line.substring(0, idx).trim();
  const val = line.substring(idx + 1).trim();
  
  console.log(`Adding ${key}...`);
  try {
    execSync(`npx vercel env rm ${key} production,preview,development -y`, { stdio: 'ignore' });
  } catch {}
  
  try {
    fs.writeFileSync('.tmp-val', val);
    execSync(`npx vercel env add ${key} production,preview,development < .tmp-val`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed to add ${key}`, e);
  }
}
