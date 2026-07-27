import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Contact', to: '/contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <span className="navbar-logo-mark">S</span>
          ShopZone
        </NavLink>

        <nav className={`navbar-links ${menuOpen ? 'navbar-links-open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar-link ${isActive ? 'navbar-link-active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="navbar-mobile-only navbar-mobile-actions">
            {isAuthenticated ? (
              <button className="navbar-link" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="navbar-link" onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
            )}
          </div>
        </nav>

        <div className="navbar-actions">
          <NavLink to="/cart" className="navbar-cart" aria-label="View cart">
            <CartIcon />
            {itemCount > 0 && <span className="navbar-cart-badge">{itemCount}</span>}
          </NavLink>

          {isAuthenticated ? (
            <div className="navbar-user">
              <span className="navbar-user-name">{user.name.split(' ')[0]}</span>
              <button className="navbar-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="navbar-login-btn">
              Login
            </NavLink>
          )}

          <button
            className={`navbar-burger ${menuOpen ? 'navbar-burger-open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 6h15l-1.5 9h-12L6 6zM6 6L5 3H2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17" cy="20" r="1.4" fill="currentColor" />
    </svg>
  )
}

export default Navbar
