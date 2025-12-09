const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  await client.connect();
  const result = await client.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;"
  );
  console.log('Tables:', result.rows.map(r => r.table_name));
  await client.end();
}

main().catch(err => {
  console.error('Database error:', err);
  client.end();
});