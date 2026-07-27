import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { loadCart, saveCart, calculateTotal, calculateItemCount } from '../utils/cartUtils.js'

const CartContext = createContext(null)

const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREASE_QTY: 'INCREASE_QTY',
  DECREASE_QTY: 'DECREASE_QTY',
  CLEAR_CART: 'CLEAR_CART',
}

function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const existing = state.find((item) => item.id === action.payload.id)
      // Prevent duplicate products — bump quantity instead of adding a new row.
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        )
      }
      return [...state, { ...action.payload, quantity: action.payload.quantity || 1 }]
    }

    case ACTIONS.REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload.id)

    case ACTIONS.INCREASE_QTY:
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
      )

    case ACTIONS.DECREASE_QTY:
      return state
        .map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)

    case ACTIONS.CLEAR_CART:
      return []

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, [], loadCart)

  useEffect(() => {
    saveCart(cartItems)
  }, [cartItems])

  const addItem = (product, quantity = 1) => dispatch({ type: ACTIONS.ADD_ITEM, payload: { ...product, quantity } })
  const removeItem = (id) => dispatch({ type: ACTIONS.REMOVE_ITEM, payload: { id } })
  const increaseQty = (id) => dispatch({ type: ACTIONS.INCREASE_QTY, payload: { id } })
  const decreaseQty = (id) => dispatch({ type: ACTIONS.DECREASE_QTY, payload: { id } })
  const clearCart = () => dispatch({ type: ACTIONS.CLEAR_CART })

  const total = useMemo(() => calculateTotal(cartItems), [cartItems])
  const itemCount = useMemo(() => calculateItemCount(cartItems), [cartItems])

  const value = useMemo(
    () => ({
      cartItems,
      addItem,
      removeItem,
      increaseQty,
      decreaseQty,
      clearCart,
      total,
      itemCount,
    }),
    [cartItems, total, itemCount]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
