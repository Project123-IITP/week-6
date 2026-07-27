import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Loader from '../../components/Loader/Loader.jsx'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import StarRating from '../../components/StarRating/StarRating.jsx'
import Button from '../../components/Button/Button.jsx'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import { getProductById, getProductsByCategory } from '../../services/productService.js'
import { useCart } from '../../context/CartContext.jsx'
import { formatCurrency } from '../../utils/cartUtils.js'
import './ProductDetails.css'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const { data: product, loading, error } = useFetch(() => getProductById(id), [id])

  const { data: related } = useFetch(
    () => (product ? getProductsByCategory(product.category) : Promise.resolve([])),
    [product?.category]
  )

  if (loading) return <Loader label="Loading product..." fullPage />

  if (error || !product) {
    return (
      <EmptyState
        icon="📦"
        title="No product found"
        message="This product may have been removed or the link is incorrect."
        actionLabel="Back to Shop"
        to="/shop"
      />
    )
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail]
  const hasDiscount = product.discountPercentage > 0
  const originalPrice = hasDiscount ? product.price / (1 - product.discountPercentage / 100) : null
  const relatedProducts = (related || []).filter((p) => p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addItem({ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail }, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="page-fade-in product-details">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{product.title}</span>
        </nav>

        <div className="product-details-grid">
          {/* Gallery */}
          <div className="product-gallery">
            <div className="product-gallery-main">
              <img src={images[activeImage]} alt={product.title} />
            </div>
            {images.length > 1 && (
              <div className="product-gallery-thumbs">
                {images.map((img, index) => (
                  <button
                    key={img + index}
                    className={`product-gallery-thumb ${index === activeImage ? 'active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={img} alt={`${product.title} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="product-info">
            <span className="eyebrow">{product.category}</span>
            <h1 className="product-title">{product.title}</h1>
            <div className="product-meta">
              <StarRating rating={product.rating} />
              <span className="product-brand">Brand: {product.brand || 'Generic'}</span>
            </div>

            <div className="product-price-row">
              <span className="product-price">{formatCurrency(product.price)}</span>
              {hasDiscount && (
                <>
                  <span className="product-price-original">{formatCurrency(originalPrice)}</span>
                  <span className="product-discount-tag">-{Math.round(product.discountPercentage)}%</span>
                </>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-stock">
              {product.stock > 0 ? (
                <span className="stock-in">✅ In Stock ({product.stock} available)</span>
              ) : (
                <span className="stock-out">❌ Out of Stock</span>
              )}
            </div>

            <div className="product-actions">
              <div className="quantity-control">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  −
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                  +
                </button>
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                fullWidth
              >
                {added ? 'Added to Cart ✓' : 'Add to Cart'}
              </Button>
            </div>

            <button className="back-to-shop-link" onClick={() => navigate('/shop')}>
              ← Continue Shopping
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-section">
            <div className="section-header" style={{ textAlign: 'left', margin: '0 0 24px' }}>
              <h2 className="section-title" style={{ fontSize: '1.6rem' }}>
                Related Products
              </h2>
            </div>
            <div className="products-grid related-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
