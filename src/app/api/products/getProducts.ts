export interface Product {
	id: number;
	name?: string;
	sku?: string;
	price?: number;
	description?: string;
	category?: string | number;
	image_url?: string;
	image?: string;
	created_at?: string;
	updated_at?: string;
}

export interface GetProductsParams {
	skip?: number | string;
	limit?: number | string;
	category?: string | number;
	[key: string]: string | number | undefined;
}

/**
 * Fetch products from the backend with optional query parameters
 * @param queryParams - Object containing query parameters to filter products
 * @returns Promise with the products data
 */
export async function getProducts(queryParams?: GetProductsParams): Promise<Product[]> {
	try {
		// Convert numeric values to strings for URLSearchParams and filter undefined
		const sanitizedParams = queryParams
			? Object.fromEntries(
					Object.entries(queryParams)
						.filter(([_, value]) => value !== undefined)
						.map(([key, value]) => [key, String(value)])
				)
			: undefined;

		const queryString = sanitizedParams
			? '?' + new URLSearchParams(sanitizedParams as Record<string, string>).toString()
			: '';

		const backendUrl = process.env.BACKEND_URL || 'https://livekit-mobile.linkedinwriter.io';
		const response = await fetch(`${backendUrl}/products${queryString}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch products: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
}

/** Convenience helper: get products by category */
export async function getProductsByCategory(category: string | number, skip?: number | string, limit?: number | string) {
	return getProducts({ category, skip, limit });
}

/** Convenience helper: pagination */
export async function getProductsPage(skip: number | string = 0, limit: number | string = 100) {
	return getProducts({ skip, limit });
}


