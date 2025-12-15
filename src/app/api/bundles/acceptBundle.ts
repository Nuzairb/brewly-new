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
	const isBrowser = typeof window !== 'undefined';
	const requestUrl = isBrowser ? `/api/bundles/accept/${bundleId}` : `${process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io'}/bundles/accept/${bundleId}`;

	try {
		const response = await fetch(requestUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to accept bundle ${bundleId}: ${response.status} ${response.statusText}`);
		}

		return response.json();
	} catch (error) {
		console.error("Error accepting bundle", error);
		throw error;
	}
}
