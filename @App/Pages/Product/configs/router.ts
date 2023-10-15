export const PRODUCT_ROUTER = {
	LIST: '/product',
	DETAIL: (id: string) => `/product/${id}`,
	NEW: `/product/new`,
}
export const PRODUCT_BRAND_ROUTER = {
	LIST: '/product-brand',
	DETAIL: (id: string) => `/product-brand/${id}`,
	NEW: `/product-brand/new`,
}
