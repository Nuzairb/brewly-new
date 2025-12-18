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
