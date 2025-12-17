export interface GoLiveResponse {
  success?: boolean;
  [key: string]: any;
}

/**
 * Trigger 'go live' for a generated bundle by id on the backend
 */
export async function goLive(id: number | string): Promise<GoLiveResponse> {
  const backendUrl = process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io';

  const res = await fetch(`${backendUrl}/golive`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Failed to go live (${res.status}): ${res.statusText} ${body}`);
  }

  return res.json();
}

export default goLive;
