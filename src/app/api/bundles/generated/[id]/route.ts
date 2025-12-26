import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || '';
    if (!backendUrl) {
      return NextResponse.json({ error: 'Backend URL not configured' }, { status: 500 });
    }

    const resp = await fetch(`${backendUrl.replace(/\/$/, '')}/bundles/generated/${encodeURIComponent(params.id)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const contentType = resp.headers.get('content-type') || '';
    const body = contentType.includes('application/json') ? await resp.json() : await resp.text();

    return new NextResponse(JSON.stringify(body), {
      status: resp.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Proxy /api/bundles/generated/[id] error', err);
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 });
  }
}
