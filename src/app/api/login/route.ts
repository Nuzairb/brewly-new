import { NextResponse } from 'next/server';
import { Client } from 'pg';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    // Check user in database (plain text password, no hashing)
    const result = await client.query(
      'SELECT id, email FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );
    await client.end();
    if (result.rows.length > 0) {
      // User found
      return NextResponse.json({ success: true, user: result.rows[0] });
    } else {
      // User not found or wrong password
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    await client.end();
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: 'Database error', details: message }, { status: 500 });
  }
}
