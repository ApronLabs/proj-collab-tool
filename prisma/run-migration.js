const { readFileSync } = require('fs');
const { Pool } = require('pg');

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.log('DATABASE_URL not set, skipping migration');
    return;
  }

  const pool = new Pool({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
  });

  const sql = readFileSync('prisma/create_improvements.sql', 'utf8');

  try {
    await pool.query(sql);
    console.log('✔ Improvements tables created/verified');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    await pool.end();
  }
}

main();
