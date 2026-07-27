import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="navbar-logo-mark">S</span>
            ShopZone
          </div>
          <p className="footer-about">
            Premium products, honest prices, and a shopping experience built for people who care about
            design. ShopZone is where quality meets convenience.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram" className="footer-social-icon">📷</a>
            <a href="#" aria-label="Twitter / X" className="footer-social-icon">🐦</a>
            <a href="#" aria-label="Facebook" className="footer-social-icon">📘</a>
            <a href="#" aria-label="YouTube" className="footer-social-icon">▶️</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><Link to="/contact">Help Center</Link></li>
            <li><Link to="/contact">Shipping Info</Link></li>
            <li><Link to="/contact">Returns</Link></li>
            <li><Link to="/contact">Track Order</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/">Careers</Link></li>
            <li><Link to="/">Press</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {year} ShopZone. All rights reserved.</p>
          <p className="footer-tagline">Designed for people who shop with intention.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
