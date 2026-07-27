import './StarRating.css'

/** Renders a 5-star rating display with a numeric value. */
function StarRating({ rating = 0, showValue = true, size = 'md' }) {
  const rounded = Math.round(rating)

  return (
    <div className={`star-rating star-rating-${size}`} aria-label={`Rated ${rating} out of 5`}>
      <div className="star-rating-stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className={index < rounded ? 'star star-filled' : 'star'}>
            ★
          </span>
        ))}
      </div>
      {showValue && <span className="star-rating-value">{rating.toFixed(1)}</span>}
    </div>
  )
}

export default StarRating
