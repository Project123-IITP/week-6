export const CART_STORAGE_KEY = 'shopzone_cart'

/** Reads the persisted cart from localStorage. Returns an empty array on failure. */
export function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (error) {
    console.error('Failed to load cart from storage:', error)
    return []
  }
}

/** Persists the cart to localStorage. */
export function saveCart(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Failed to save cart to storage:', error)
  }
}

/** Calculates the total price of every item in the cart. */
export function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

/** Calculates the total number of units in the cart (for the navbar badge). */
export function calculateItemCount(items) {
  return items.reduce((count, item) => count + item.quantity, 0)
}

/** Formats a number as a USD currency string. */
export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}
