/**
 * Delete a bundle by ID by calling the backend directly.
 */
export async function deleteBundle(bundleId: string | number) {
  if (!bundleId) throw new Error('bundleId is required');
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io';
  const url = `${backendUrl}/bundles/generated/${encodeURIComponent(String(bundleId))}`;

  const resp = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!resp.ok) {
    let msg = `HTTP ${resp.status}`;
    try {
      const txt = await resp.text();
      try { const parsed = JSON.parse(txt); msg = parsed.message || parsed.error || txt; } catch { msg = txt || msg; }
    } catch {}
    throw new Error(msg);
  }

  // return parsed body if any, otherwise undefined
  try {
    const text = await resp.text();
    if (!text) return undefined;
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

export default deleteBundle;
