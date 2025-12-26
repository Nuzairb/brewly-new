export interface EventItem {
  id: number;
  title?: string;
  description?: string;
  event_datetime?: string;
  location?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

export interface GetEventsParams {
  skip?: number | string;
  limit?: number | string;
  from?: string;
  to?: string;
  [key: string]: string | number | undefined;
}

/**
 * Fetch events from the backend with optional query parameters
 */
export async function getEvents(queryParams?: GetEventsParams): Promise<EventItem[]> {
  // Simple fetch to backend (mirror getProducts style)
  const sanitizedParams = queryParams
    ? Object.fromEntries(
        Object.entries(queryParams)
          .filter(([_, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      )
    : undefined;

  const queryString = sanitizedParams ? '?' + new URLSearchParams(sanitizedParams as Record<string,string>).toString() : '';

  const backendUrl = process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io';
  const response = await fetch(`${backendUrl}/events/upcoming${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function getUpcomingEvents(skip?: number | string, limit?: number | string) {
  return getEvents({ skip, limit });
}

export async function getEventsPage(skip: number | string = 0, limit: number | string = 100) {
  return getEvents({ skip, limit });
}

/**
 * Fetch a single event by id from the backend.
 */
export async function getEventById(id: string | number): Promise<EventItem | null> {
  if (id === undefined || id === null) return null;
  const backendUrl = process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io';
  const response = await fetch(`${backendUrl}/events/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    // return null instead of throwing to allow graceful fallback
    return null;
  }

  const data = await response.json();
  return data;
}

/**
 * Fetch a single event by slug. Tries a direct slug endpoint,
 * and falls back to fetching all events and matching by slug.
 */
export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  if (!slug) return null;
  // Accept possibly-encoded slugs and decode once to avoid double-encoding issues
  try {
    slug = decodeURIComponent(String(slug));
  } catch (e) {
    // ignore
  }
  const backendUrl = process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io';

  // First try a direct slug endpoint if backend supports it
  try {
    const resp = await fetch(`${backendUrl}/events/slug/${encodeURIComponent(slug)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (resp.ok) {
      const d = await resp.json();
      return d;
    }
  } catch (err) {
    // ignore and fallback
  }

  // Fallback: fetch all events and find by slug field
  try {
    const all = await getEvents();
    const found = (all || []).find((e: any) => {
      if (!e) return false;
      // direct slug-like fields
      const candidates = [
        e.slug,
        e.ticketmaster_id,
        e.permalink,
        e.url_slug,
        e.slug_name,
        e.id,
      ];
      for (const c of candidates) {
        if (c !== undefined && c !== null && String(c) === String(slug)) return true;
      }
      // try slugified name
      if (e.name && slugify(e.name) === String(slug)) return true;
      return false;
    });
    if (!found) {
      // helpful debug: print available slug-like keys on first few events
      try {
        const sample = (all || []).slice(0, 5).map((e: any) => ({ id: e.id, slug: e.slug, ticketmaster_id: e.ticketmaster_id, name: e.name, permalink: e.permalink }));
        console.error('[getEventBySlug] fallback: no matching slug found for', slug, 'sample events:', sample);
      } catch (err) {
        // ignore
      }
    }
    return found || null;
  } catch (err) {
    return null;
  }
}

// small helper to create a predictable slug from a name (used only in fallback)
function slugify(text: string) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}
