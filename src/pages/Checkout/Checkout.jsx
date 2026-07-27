import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { formatCurrency } from '../../utils/cartUtils.js'
import Button from '../../components/Button/Button.jsx'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import './Checkout.css'

const initialAddress = {
  fullName: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  country: '',
}

function Checkout() {
  const { cartItems, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [address, setAddress] = useState({ ...initialAddress, fullName: user?.name || '' })
  const [orderPlaced, setOrderPlaced] = useState(false)

  const shipping = 0
  const tax = +(total * 0.05).toFixed(2)
  const grandTotal = total + shipping + tax

  const handleChange = (e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <div className="page-fade-in checkout-page">
        <div className="container">
          <div className="order-success">
            <div className="order-success-icon">🎉</div>
            <h1>Order Placed Successfully!</h1>
            <p>
              Thank you, {address.fullName || 'friend'}! A confirmation has been mock-sent to your email.
              Your order total was <strong>{formatCurrency(grandTotal)}</strong>.
            </p>
            <Button variant="primary" onClick={() => navigate('/shop')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="page-fade-in checkout-page">
        <div className="container">
          <EmptyState
            icon="🛒"
            title="Your cart is empty"
            message="Add a few items before heading to checkout."
            actionLabel="Go to Shop"
            to="/shop"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="page-fade-in checkout-page">
      <div className="container">
        <h1 className="section-title checkout-heading">Checkout</h1>

        <form className="checkout-layout" onSubmit={handlePlaceOrder}>
          <div className="checkout-form-section">
            <h2>Shipping Address</h2>
            <div className="form-grid">
              <label className="form-field">
                Full Name
                <input name="fullName" required value={address.fullName} onChange={handleChange} />
              </label>
              <label className="form-field">
                Street Address
                <input name="street" required value={address.street} onChange={handleChange} />
              </label>
              <label className="form-field">
                City
                <input name="city" required value={address.city} onChange={handleChange} />
              </label>
              <label className="form-field">
                State / Province
                <input name="state" required value={address.state} onChange={handleChange} />
              </label>
              <label className="form-field">
                ZIP / Postal Code
                <input name="zip" required value={address.zip} onChange={handleChange} />
              </label>
              <label className="form-field">
                Country
                <input name="country" required value={address.country} onChange={handleChange} />
              </label>
            </div>

            <h2 className="payment-heading">Payment Summary</h2>
            <div className="mock-payment-card">
              <span>💳 Mock Payment Method</span>
              <p>This is a demo checkout — no real payment will be processed.</p>
            </div>
          </div>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="checkout-summary-items">
              {cartItems.map((item) => (
                <div className="checkout-summary-item" key={item.id}>
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="cart-summary-row">
              <span>Estimated Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Grand Total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>

            <Button type="submit" variant="primary" fullWidth size="lg">
              Place Order
            </Button>
          </aside>
        </form>
      </div>
    </div>
  )
}

export default Checkout
