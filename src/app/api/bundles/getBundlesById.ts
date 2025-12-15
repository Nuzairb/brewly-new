/**
 * Bundle Details Interface - Complete structure for single bundle
 */
export interface BundleDetails {
  id: number;
  bundle_name: string;
  description?: string;
  event_name?: string;
  event_type?: string;
  event_date?: string;
  event_category?: Record<string, unknown>;
  weather_temp?: number;
  weather_condition?: string;
  weather_description?: string;
  is_extreme_weather?: boolean;
  product_ids?: string[];
  product_names?: string[];
  products?: Array<{
    product_id: string;
    name: string;
    description?: string;
    category_id?: number;
    ingredients?: string[];
    product_price?: number;
    currency?: string;
    image?: string;
    is_available?: boolean;
    manufacture_datetime?: string | null;
    expiry_datetime?: string | null;
    is_expiring?: boolean;
    is_urgent_expiry?: boolean;
  }>;
  original_price: number;
  bundle_price: number;
  discount_percentage: number;
  target_audience?: string;
  bundle_strategy?: string;
  reasoning?: string;
  bundle_type?: string;
  status: string;
  created_at: string;
  image_url?: string;
  is_manual?: boolean;
  bundle_expiry_datetime?: string;
}

/**
 * Fetch a single bundle details by ID from the backend
 * @param bundleId - The ID of the bundle to fetch
 * @returns Promise with the bundle details
 * @throws Error if the bundle is not found or API request fails
 */
export async function getBundleDetails(bundleId: string | number): Promise<BundleDetails> {
  try {
    // Validate bundle ID
    if (!bundleId) {
      throw new Error('Bundle ID is required');
    }

    // Construct the API endpoint
    const backendUrl = process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io';
    const endpoint = `${backendUrl}/bundles/generated/${bundleId}`;

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Handle response errors
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Bundle with ID ${bundleId} not found`);
      }
      throw new Error(`Failed to fetch bundle details: ${response.statusText}`);
    }

    // Parse and return the data
    const data: BundleDetails = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching bundle details for ID ${bundleId}:`, error);
    throw error;
  }
}

/**
 * Fetch bundle details with error handling and fallback
 * Returns null if bundle is not found instead of throwing
 * @param bundleId - The ID of the bundle to fetch
 * @returns Promise with bundle details or null if not found
 */
export async function getBundleDetailsOrNull(bundleId: string | number): Promise<BundleDetails | null> {
  try {
    return await getBundleDetails(bundleId);
  } catch (error) {
    console.error(`Failed to fetch bundle ${bundleId}:`, error);
    return null;
  }
}

/**
 * Fetch multiple bundle details by IDs
 * @param bundleIds - Array of bundle IDs to fetch
 * @returns Promise with array of bundle details
 */
export async function getBundleDetailsMultiple(bundleIds: (string | number)[]): Promise<BundleDetails[]> {
  try {
    if (!bundleIds || bundleIds.length === 0) {
      return [];
    }

    // Fetch all bundles in parallel
    const promises = bundleIds.map(id => getBundleDetailsOrNull(id));
    const results = await Promise.all(promises);

    // Filter out null values (failed fetches)
    return results.filter((bundle): bundle is BundleDetails => bundle !== null);
  } catch (error) {
    console.error('Error fetching multiple bundle details:', error);
    throw error;
  }
}
