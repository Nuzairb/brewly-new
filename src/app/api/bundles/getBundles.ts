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

    // Call backend directly
    const backendUrl = process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io';
    const response = await fetch(`${backendUrl}/bundles/generated${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch bundles: ${response.statusText}`);
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
