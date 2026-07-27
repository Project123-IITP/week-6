import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button.jsx'
import Loader from '../../components/Loader/Loader.jsx'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import StarRating from '../../components/StarRating/StarRating.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import { getAllProducts } from '../../services/productService.js'
import './Home.css'

const CATEGORIES = [
  { name: 'smartphones', label: 'Smartphones', emoji: '📱' },
  { name: 'laptops', label: 'Laptops', emoji: '💻' },
  { name: 'fragrances', label: 'Fragrances', emoji: '🌸' },
  { name: 'skincare', label: 'Skincare', emoji: '🧴' },
  { name: 'mens-watches', label: 'Watches', emoji: '⌚' },
  { name: 'womens-bags', label: 'Bags', emoji: '👜' },
]

const WHY_SHOPZONE = [
  { icon: '🚚', title: 'Fast, Free Delivery', text: 'Most orders arrive within 2–4 business days, on us.' },
  { icon: '🔒', title: 'Secure Checkout', text: 'Every transaction is encrypted end-to-end.' },
  { icon: '↩️', title: 'Easy 30-Day Returns', text: 'Changed your mind? Send it back, no questions asked.' },
  { icon: '💬', title: '24/7 Support', text: 'Real humans, ready to help whenever you need us.' },
]

const REVIEWS = [
  {
    name: 'Amara Chen',
    role: 'Verified Buyer',
    rating: 5,
    text: 'The checkout was seamless and my order arrived earlier than expected. ShopZone feels genuinely premium.',
  },
  {
    name: 'Rohan Mehta',
    role: 'Verified Buyer',
    rating: 5,
    text: 'Product photos matched exactly what arrived. Packaging alone made it feel like a gift to myself.',
  },
  {
    name: 'Isabelle Laurent',
    role: 'Verified Buyer',
    rating: 4,
    text: 'Great range of categories and the site is genuinely a pleasure to browse on my phone.',
  },
]

function Home() {
  const navigate = useNavigate()
  const { data: products, loading, error } = useFetch(() => getAllProducts({ limit: 8 }), [])
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <div className="page-fade-in">
      {/* HERO */}
      <section className="hero">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="container hero-inner">
          <span className="eyebrow">New Season Arrivals</span>
          <h1 className="hero-title">
            Shop the things you'll <span className="hero-title-highlight">actually love.</span>
          </h1>
          <p className="hero-subtitle">
            Curated tech, style, and everyday essentials — delivered fast, priced fairly, and
            backed by a team that genuinely cares about your experience.
          </p>
          <div className="hero-actions">
            <Button variant="primary" size="lg" onClick={() => navigate('/shop')}>
              Shop Now
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/shop')}>
              Explore Products
            </Button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <strong>50k+</strong>
              <span>Happy Customers</span>
            </div>
            <div className="hero-stat">
              <strong>4.8/5</strong>
              <span>Average Rating</span>
            </div>
            <div className="hero-stat">
              <strong>100+</strong>
              <span>Top Brands</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Browse</span>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Jump straight to what you're looking for.</p>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <button key={cat.name} className="category-tile" onClick={() => navigate('/shop')}>
                <span className="category-emoji">{cat.emoji}</span>
                <span className="category-label">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Handpicked</span>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">A selection our team is genuinely excited about.</p>
          </div>

          {loading && <Loader label="Loading featured products..." />}
          {error && (
            <EmptyState
              icon="⚠️"
              title="Couldn't load products"
              message={error}
              actionLabel="Try the Shop page"
              to="/shop"
            />
          )}
          {!loading && !error && products && (
            <div className="products-grid">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="featured-cta">
            <Button variant="secondary" onClick={() => navigate('/shop')}>
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* WHY SHOPZONE */}
      <section className="section why-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Why ShopZone</span>
            <h2 className="section-title">Built Around Your Experience</h2>
          </div>
          <div className="why-grid">
            {WHY_SHOPZONE.map((item) => (
              <div key={item.title} className="why-card glass">
                <span className="why-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section reviews-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Testimonials</span>
            <h2 className="section-title">Loved by Shoppers Everywhere</h2>
          </div>
          <div className="reviews-grid">
            {REVIEWS.map((review) => (
              <div key={review.name} className="review-card">
                <StarRating rating={review.rating} showValue={false} />
                <p className="review-text">"{review.text}"</p>
                <div className="review-author">
                  <div className="review-avatar">{review.name[0]}</div>
                  <div>
                    <p className="review-name">{review.name}</p>
                    <p className="review-role">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <div className="container newsletter-inner">
          <h2>Get 10% off your first order</h2>
          <p>Join our list for early access to drops, sales, and style edits.</p>
          {subscribed ? (
            <p className="newsletter-success">🎉 You're on the list — check your inbox soon!</p>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
