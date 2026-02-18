const { readFileSync, existsSync } = require('fs');
const { Pool } = require('pg');

// Load .env file manually (dotenv may not be available)
function loadEnv() {
  const envPath = '.env';
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

async function main() {
  loadEnv();
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.log('DATABASE_URL not set, skipping migration');
    return;
  }

  const pool = new Pool({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
  });

  const sqlFiles = [
    'prisma/create_improvements.sql',
    'prisma/create_screen_references.sql',
    'prisma/add_resolved_at.sql',
  ];

  try {
    for (const file of sqlFiles) {
      if (existsSync(file)) {
        const sql = readFileSync(file, 'utf8');
        await pool.query(sql);
        console.log(`✔ ${file} executed`);
      }
    }
    console.log('✔ All migrations completed');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    await pool.end();
  }
}

main();
