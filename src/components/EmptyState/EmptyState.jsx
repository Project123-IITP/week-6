import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button.jsx'
import './EmptyState.css'

/**
 * Reusable empty / error state block.
 * Used for: empty cart, no product found, API failure, no search results.
 * Pass either `to` (route path) or `onAction` (custom handler) to show a CTA button.
 */
function EmptyState({ icon = '🛍️', title, message, actionLabel, onAction, to }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (to) navigate(to)
    else if (onAction) onAction()
  }

  return (
    <div className="empty-state page-fade-in">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      {message && <p className="empty-state-message">{message}</p>}
      {actionLabel && (to || onAction) && (
        <Button variant="primary" onClick={handleClick} className="empty-state-action">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyState
