import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  // Invalidate session/cookie logic can be added here if using auth
  // For now, just return success
  return NextResponse.json({ success: true });
}
