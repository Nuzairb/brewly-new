import { NextRequest, NextResponse } from "next/server";

export async function POST(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const bundleId = params.id;

	try {
		const backendUrl = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL;
		
		
		
		const response = await fetch(`${backendUrl}/bundles/accept/${bundleId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		

		const contentType = response.headers.get("content-type") || "";
		let data;
		
		if (contentType.includes("application/json")) {
			data = await response.json();
		} else {
			const text = await response.text();
			data = { status: "ok", message: text };
		}

		

		// Handle "already accepted" as success
		if (response.status === 400 && data?.detail?.toLowerCase().includes('already accepted')) {
			
			return NextResponse.json(
				{ 
					status: "ok", 
					message: "Bundle is already active",
					bundle_id: bundleId,
					already_accepted: true
				},
				{ status: 200 }
			);
		}

		// Handle backend 500 error with status:"ok" - means operation succeeded
		if (response.status === 500 && data?.status === 'ok') {
			
			return NextResponse.json(
				{ 
					status: "ok", 
					message: "Bundle accepted successfully",
					bundle_id: bundleId
				},
				{ status: 200 }
			);
		}

		// If backend returned other errors
		if (!response.ok) {
			
			return NextResponse.json(data, { status: response.status });
		}

		// Success response
		return NextResponse.json(data, { status: 200 });
		
	} catch (error) {
		
		return NextResponse.json(
			{ error: "Failed to connect to backend" },
			{ status: 500 }
		);
	}
}