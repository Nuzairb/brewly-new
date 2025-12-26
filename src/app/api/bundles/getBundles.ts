export interface Bundle {
  id: number;
  bundle_name?: string;
  name?: string;
  description?: string;
  event_name?: string;
  bundle_strategy?: string;
  status: string;
  image_url?: string;
  image?: string;
  bundle_type?: string;
  created_at?: string;
  valid_until?: string;
}

export interface GetBundlesParams {
  bundle_type?: string;
  status?: string;
  [key: string]: string | undefined;
}

/**
 * Fetch bundles from the backend with optional query parameters
 * @param queryParams - Object containing query parameters to filter bundles
 * @returns Promise with the bundles data
 */
export async function getBundles(queryParams?: GetBundlesParams): Promise<Bundle[]> {
  try {
    // Build query string from params
    const queryString = queryParams
      ? '?' + new URLSearchParams(
          Object.entries(queryParams).filter(([_, value]) => value !== undefined) as [string, string][]
        ).toString()
      : '';

    // Prefer NEXT_PUBLIC_BACKEND_URL, but allow NEXT_PUBLIC_API_URL (app proxy) as a fallback.
    // This makes behavior consistent with other services that use `NEXT_PUBLIC_API_URL`.
    const preferred = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL;
    const backendUrl = (preferred || 'https://livekit-mobile.linkedinwriter.io').replace(/\/$/, '');

    // Try backend URL first. If that fails (CORS/404/network), fall back to the local Next.js proxy path.
    let response: Response | null = null;
    try {
      response = await fetch(`${backendUrl}/bundles/generated${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    } catch (err) {
      // swallow and attempt local proxy below
      console.warn('Primary backend fetch failed, will try local /api proxy', err);
      response = null;
    }

    if (!response || !response.ok) {
      try {
        const proxyResp = await fetch(`/api/bundles/generated${queryString}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (proxyResp.ok) return await proxyResp.json();
        // if proxy also fails, surface the original response status/text when possible
        const statusText = response ? response.statusText : proxyResp.statusText;
        throw new Error(`Failed to fetch bundles: ${statusText}`);
      } catch (proxyErr) {
        console.error('Error fetching bundles (both primary and proxy failed):', proxyErr);
        throw proxyErr;
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bundles:', error);
    throw error;
  }
}

/**
 * Fetch bundles by type (manual, event, expire, etc.)
 */
export async function getBundlesByType(bundleType: string): Promise<Bundle[]> {
  return getBundles({ bundle_type: bundleType });
}

/**
 * Fetch bundles by status (active, pending, draft, etc.)
 */
export async function getBundlesByStatus(status: string): Promise<Bundle[]> {
  return getBundles({ status });
}
