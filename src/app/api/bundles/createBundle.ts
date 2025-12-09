export interface CreateBundlePayload {
  bundle_name: string;
  description?: string;
  event_name?: string;
  event_type?: string;
  event_date?: string;
  event_category?: Record<string, any>;
  weather_temp?: number;
  weather_condition?: string;
  weather_description?: string;
  is_extreme_weather?: boolean;
  product_ids: string[];
  product_names: string[];
  original_price: number;
  bundle_price: number;
  discount_percentage: number;
  target_audience?: string;
  bundle_strategy: string;
  reasoning?: string;
  bundle_type: 'event' | 'expiry_standard' | 'manual' | string;
  image_url?: string;
  is_manual?: boolean;
  start_date?: string;
  end_date?: string;
  auto_activate?: boolean;
  show_on_kiosk?: boolean;
  show_on_staff?: boolean;
}

export interface CreateBundleResponse {
  id?: number;
  bundle_name?: string;
  status?: string;
  created_at?: string;
  [key: string]: unknown;
}

/**
 * Create a new bundle
 * POST /bundles/generated
 */
export async function createBundle(payload: CreateBundlePayload): Promise<CreateBundleResponse> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io';

  try {
    const response = await fetch(`${backendUrl}/bundles/generated`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to create bundle: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error creating bundle:', error);
    throw error;
  }
}

/**
 * Create a manual bundle
 */
export async function createManualBundle(payload: Omit<CreateBundlePayload, 'is_manual'>): Promise<CreateBundleResponse> {
  return createBundle({
    ...payload,
    is_manual: true,
  });
}

/**
 * Create an event-based bundle
 */
export async function createEventBundle(payload: CreateBundlePayload & { event_name: string; event_type: string; event_date: string }): Promise<CreateBundleResponse> {
  return createBundle({
    ...payload,
    bundle_type: 'event',
  });
}
