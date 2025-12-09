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
	const backendUrl = process.env.BACKEND_URL || "https://livekit-mobile.linkedinwriter.io";

	try {
		const response = await fetch(`${backendUrl}/bundles/accept/${bundleId}`, {
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
