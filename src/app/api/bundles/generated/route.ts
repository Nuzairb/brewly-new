import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const backendUrl = process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io';
    const incoming = new URL(req.url);
    const qs = incoming.search;
    // Preserve the incoming pathname beyond /api so we forward IDs and subpaths.
    // Example: incoming.pathname = '/api/bundles/generated/229' -> forward to `${backendUrl}/bundles/generated/229`
    const forwardedPath = incoming.pathname.replace(/^\/api/, '');
    const url = `${backendUrl}${forwardedPath}${qs}`;

    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const text = await resp.text();
    return new NextResponse(text, { status: resp.status, headers: { 'content-type': resp.headers.get('content-type') || 'application/json' } });
  } catch (err) {
    console.error('Proxy GET /api/bundles/generated failed', err);
    return new NextResponse(JSON.stringify({ error: 'Failed to proxy request' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
