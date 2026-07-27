import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { formatCurrency } from '../../utils/cartUtils.js'
import Button from '../../components/Button/Button.jsx'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import './Cart.css'

const SHIPPING_FLAT_RATE = 0 // Free shipping for demo purposes

function Cart() {
  const { cartItems, removeItem, increaseQty, decreaseQty, total } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <div className="page-fade-in cart-page">
        <div className="container">
          <EmptyState
            icon="🛒"
            title="Your cart is empty"
            message="Looks like you haven't added anything yet. Let's fix that."
            actionLabel="Start Shopping"
            to="/shop"
          />
        </div>
      </div>
    )
  }

  const grandTotal = total + SHIPPING_FLAT_RATE

  return (
    <div className="page-fade-in cart-page">
      <div className="container">
        <h1 className="section-title cart-heading">Your Cart</h1>
        <p className="section-subtitle cart-subheading">{cartItems.length} item(s) in your cart</p>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p className="cart-item-price">{formatCurrency(item.price)}</p>
                </div>

                <div className="quantity-control">
                  <button onClick={() => decreaseQty(item.id)} aria-label="Decrease quantity">
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)} aria-label="Increase quantity">
                    +
                  </button>
                </div>

                <p className="cart-item-subtotal">{formatCurrency(item.price * item.quantity)}</p>

                <button
                  className="cart-item-remove"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.title}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>{SHIPPING_FLAT_RATE === 0 ? 'Free' : formatCurrency(SHIPPING_FLAT_RATE)}</span>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Grand Total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>

            <Button variant="primary" fullWidth size="lg" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </Button>
            <Button variant="ghost" fullWidth onClick={() => navigate('/shop')}>
              Continue Shopping
            </Button>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Cart
