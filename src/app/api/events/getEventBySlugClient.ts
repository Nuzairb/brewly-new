export async function getEventBySlugClient(slug: string): Promise<any | null> {
  if (!slug) return null;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io';

  // try direct slug endpoint
  try {
    const resp = await fetch(`${backendUrl}/events/slug/${encodeURIComponent(slug)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (resp.ok) {
      return await resp.json();
    }
  } catch (err) {
    // ignore
  }

  // fallback: fetch list and match
  try {
    const resp = await fetch(`${backendUrl}/events/upcoming`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, cache: 'no-store' });
    if (!resp.ok) return null;
    const all = await resp.json();
    const slugLower = String(slug);
    const found = (all || []).find((e: any) => {
      if (!e) return false;
      if (e.slug && String(e.slug) === slugLower) return true;
      if (e.name && slugify(e.name) === slugLower) return true;
      return false;
    });
    return found || null;
  } catch (err) {
    return null;
  }
}

function slugify(text: string) {
  return String(text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}
