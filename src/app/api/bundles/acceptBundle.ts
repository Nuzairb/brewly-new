export interface AcceptBundleResponse {
	id?: number;
	bundle_name?: string;
	status?: string;
	[key: string]: unknown;
}

/**
 * Approve a generated bundle by ID
 * POST /bundles/accept/{bundle_id}
 */
export async function acceptBundle(bundleId: number | string): Promise<AcceptBundleResponse> {
	// Use the local proxy API route to avoid CORS issues when calling the backend
	try {
		const response = await fetch(`/api/bundles/accept/${bundleId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			// Do not send a JSON body — backend expects id in the path.
		});

		if (!response.ok) {
			// Try to parse JSON body for structured error info
			const contentType = response.headers.get("content-type") || "";
			let text = '';
			if (contentType.includes("application/json")) {
				try {
					const json = await response.json();
					text = JSON.stringify(json);
					// Common backend shape: { detail: '...' } or { message: '...' }
					const detail = (json && (json.detail || json.message || json.error)) || '';
					if (response.status === 400 && typeof detail === 'string' && /already\s+accepted/i.test(detail)) {
						// treat as success
						return json as AcceptBundleResponse;
					}
				} catch (parseErr) {
					// fallback to text
					text = await response.text().catch(() => '');
				}
			} else {
				text = await response.text().catch(() => '');
			}

			console.warn(`acceptBundle: backend returned ${response.status} ${response.statusText}: ${text}`);
			throw new Error(`Failed to accept bundle ${bundleId}: ${response.status} ${response.statusText} ${text}`);
		}

		// Proxy returns JSON or text; attempt to parse JSON
		const contentType = response.headers.get("content-type") || "";
		if (contentType.includes("application/json")) {
			return response.json();
		}
		// Fallback: return raw text in an object
		const txt = await response.text();
		return { status: "ok", raw: txt } as AcceptBundleResponse;
	} catch (error) {
		console.error("Error accepting bundle", error);
		throw error;
	}
}
