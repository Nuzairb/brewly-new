import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    // Adjust table name if needed
    const result = await client.query(
      `SELECT * FROM products`
    );
    await client.end();
    return NextResponse.json(result.rows);
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
