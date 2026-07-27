const BASE_URL = 'https://dummyjson.com/products'

/** Fetches the full product list. Supports optional limit/skip for pagination. */
export async function getAllProducts({ limit = 100, skip = 0 } = {}) {
  const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`)
  if (!response.ok) {
    throw new Error('Unable to load products right now.')
  }
  const data = await response.json()
  return data.products
}

/** Fetches a single product by id. */
export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/${id}`)
  if (!response.ok) {
    throw new Error('Product not found.')
  }
  return response.json()
}

/** Fetches products from the same category, used for the "Related Products" rail. */
export async function getProductsByCategory(category) {
  const response = await fetch(`${BASE_URL}/category/${category}`)
  if (!response.ok) {
    throw new Error('Unable to load related products.')
  }
  const data = await response.json()
  return data.products
}

/** Fetches all product categories. */
export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`)
  if (!response.ok) {
    throw new Error('Unable to load categories.')
  }
  return response.json()
}
