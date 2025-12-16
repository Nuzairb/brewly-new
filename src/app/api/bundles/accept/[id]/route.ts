import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const backendUrl = process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io';
    const url = `${backendUrl}/bundles/accept/${id}`;

    const body = await req.text();

    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const text = await resp.text();
    return new NextResponse(text, { status: resp.status, headers: { 'content-type': resp.headers.get('content-type') || 'application/json' } });
  } catch (err) {
    console.error('Proxy POST /api/bundles/accept/[id] failed', err);
    return new NextResponse(JSON.stringify({ error: 'Failed to proxy request' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
