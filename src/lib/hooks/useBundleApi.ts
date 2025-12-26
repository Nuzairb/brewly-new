export async function fetchBundleById(id: string) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io';
  const res = await fetch(`${backendUrl}/bundles/generated/${encodeURIComponent(id)}`);
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const txt = await res.text();
      try { msg = JSON.parse(txt).message || JSON.parse(txt).error || txt; } catch { msg = txt || msg; }
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

export async function updateBundleById(id: string, payload: any) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io';
  const res = await fetch(`${backendUrl}/bundles/generated/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      message = data.error || data.message || message;
    } catch (e) {
      try { const txt = await res.text(); if (txt) message = txt; } catch {}
    }
    throw new Error(message);
  }

  return res.json();
}

export default {
  fetchBundleById,
  updateBundleById,
};
