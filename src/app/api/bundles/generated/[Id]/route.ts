import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET single bundle
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Accept both `id` and `Id` keys because folder param name may be `[Id]` (case-sensitive)
    const id = (params as any).id ?? (params as any).Id ?? undefined;
    // Validate id to avoid forwarding invalid values like 'undefined' to backend
    if (!id || String(id) === 'undefined' || String(id) === 'null' || !/^\d+$/.test(String(id))) {
      console.warn('Invalid bundle id received in route:', id);
      return NextResponse.json(
        { detail: [{ type: 'int_parsing', loc: ['path', 'bundle_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: id }] },
        { status: 422 }
      );
    }
    console.log('🚀 API Route - Fetching bundle ID:', id);
    
    // Check environment variables
    const backendUrl = process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io';
    console.log('🔗 Backend URL from env:', backendUrl);
    
    // Check if DATABASE_URL is available (just for debugging)
    console.log('📊 DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('🌐 NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);
    
    // Construct the backend URL
    const url = `${backendUrl}/bundles/generated/${id}`;
    console.log('🔗 Forwarding request to:', url);
    
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    // Make the request to backend
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    console.log('📡 Backend response status:', resp.status);
    
    const text = await resp.text();
    console.log('📄 Backend response length:', text.length, 'characters');
    
    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(text);
      console.log('✅ Parsed JSON response');
    } catch (e) {
      console.log('❌ Could not parse JSON:', text.substring(0, 200));
      data = text;
    }
    
    // Return the response
    return new NextResponse(text, { 
      status: resp.status,
      headers: {
        'Content-Type': resp.headers.get('content-type') || 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });
    
  } catch (err: any) {
    console.error('❌ API ERROR:', err);
    
    if (err.name === 'AbortError') {
      return NextResponse.json(
        { 
          error: 'Request timeout',
          message: 'Backend server took too long to respond'
        }, 
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch bundle',
        message: err.message,
        details: 'Check backend server connection and URL'
      }, 
      { status: 500 }
    );
  }
}

// PUT/UPDATE bundle
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = (params as any).id ?? (params as any).Id ?? undefined;
    console.log('🚀 API Route - Updating bundle ID:', id);

    const backendUrl = process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io';
    const url = `${backendUrl}/bundles/generated/${id}`;
    
    console.log('🔗 Forwarding to backend URL:', url);
    
    const body = await request.json();
    console.log('📦 Update payload:', body);
    
    const resp = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const text = await resp.text();
    console.log('📡 Backend response:', text);
    
    return new NextResponse(text, { 
      status: resp.status,
      headers: { 
        'content-type': resp.headers.get('content-type') || 'application/json' 
      } 
    });
  } catch (err) {
    console.error('❌ PUT API ERROR:', err);
    return NextResponse.json(
      { error: 'Failed to update bundle' }, 
      { status: 500 }
    );
  }
}