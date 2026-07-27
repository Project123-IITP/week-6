import { useNavigate } from 'react-router-dom'
import StarRating from '../StarRating/StarRating.jsx'
import Button from '../Button/Button.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { formatCurrency } from '../../utils/cartUtils.js'
import './ProductCard.css'

/** Product card used in Shop grid, Home featured section, and Related Products. */
function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addItem } = useCart()

  const { id, title, price, thumbnail, rating, discountPercentage, category } = product
  const hasDiscount = discountPercentage > 0
  const originalPrice = hasDiscount ? price / (1 - discountPercentage / 100) : null

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addItem({ id, title, price, thumbnail })
  }

  return (
    <div className="product-card" onClick={() => navigate(`/product/${id}`)}>
      <div className="product-card-image-wrap">
        <img src={thumbnail} alt={title} loading="lazy" className="product-card-image" />
        {hasDiscount && <span className="product-card-badge">-{Math.round(discountPercentage)}%</span>}
        <span className="product-card-category">{category}</span>
      </div>

      <div className="product-card-body">
        <h3 className="product-card-title">{title}</h3>
        <StarRating rating={rating} size="sm" />

        <div className="product-card-footer">
          <div className="product-card-price">
            <span className="product-card-price-current">{formatCurrency(price)}</span>
            {hasDiscount && (
              <span className="product-card-price-original">{formatCurrency(originalPrice)}</span>
            )}
          </div>
        </div>

        <div className="product-card-actions">
          <Button variant="outline" size="sm" fullWidth onClick={() => navigate(`/product/${id}`)}>
            View Details
          </Button>
          <Button variant="primary" size="sm" fullWidth onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
