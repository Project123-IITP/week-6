import './Button.css'

/**
 * Reusable button with ripple hover effect.
 * variant: 'primary' | 'secondary' | 'outline' | 'ghost'
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  icon = null,
  className = '',
}) {
  const handleClick = (event) => {
    // Ripple effect
    const button = event.currentTarget
    const ripple = document.createElement('span')
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`
    ripple.className = 'btn-ripple'
    button.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)

    if (onClick) onClick(event)
  }

  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  )
}

export default Button
