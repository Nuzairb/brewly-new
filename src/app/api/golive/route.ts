import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const { id } = await request.json();
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    await client.connect();
    // 1. Get bundle from generated_bundles
    const getRes = await client.query('SELECT * FROM generated_bundles WHERE id = $1', [id]);
    if (getRes.rows.length === 0) {
      await client.end();
      return NextResponse.json({ error: 'Bundle not found' }, { status: 404 });
    }
    const bundle = getRes.rows[0];
    // 2. Get accepted_bundles columns
    const colRes = await client.query(`SELECT column_name FROM information_schema.columns WHERE table_name = 'accepted_bundles'`);
    const acceptedCols = colRes.rows.map((r: any) => r.column_name);
    // 3. Prepare insert columns and values
    const insertCols = [];
    const insertVals = [];
    for (const col of acceptedCols) {
      if (col === 'accepted_at') {
        insertCols.push('accepted_at');
        insertVals.push('NOW()');
      } else if (col === 'status') {
        insertCols.push('status');
        insertVals.push(`'accepted'`);
      } else if (bundle.hasOwnProperty(col)) {
        insertCols.push(col);
        // Use parameterized values for safety
        insertVals.push(`$${insertVals.length + 1}`);
      }
    }
    // 4. Build values array for parameterized query
    const paramVals = insertCols.filter(c => c !== 'accepted_at' && c !== 'status').map(c => bundle[c]);
    // 5. Build query string
    const query = `INSERT INTO accepted_bundles (${insertCols.join(', ')}) VALUES (${insertVals.join(', ')})`;
    await client.query(query, paramVals);
    // 6. Remove from generated_bundles
    await client.query('DELETE FROM generated_bundles WHERE id = $1', [id]);
    await client.end();
    return NextResponse.json({ success: true });
  } catch (error) {
    await client.end();
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }
    return NextResponse.json({ error: 'Database error', details: message }, { status: 500 });
  }
}
