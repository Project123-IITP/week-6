import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import Button from '../../components/Button/Button.jsx'
import './Login.css'

function Login() {
  const { isAuthenticated, loginAsGuest } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectTo = location.state?.from?.pathname || '/'

  if (isAuthenticated) {
    navigate(redirectTo, { replace: true })
    return null
  }

  const handleGuestLogin = () => {
    loginAsGuest()
    navigate(redirectTo, { replace: true })
  }

  return (
    <div className="page-fade-in login-page">
      <div className="login-card glass">
        <div className="login-logo">
          <span className="navbar-logo-mark">S</span>
        </div>
        <h1>Welcome to ShopZone</h1>
        <p>Sign in to save your cart, track orders, and check out faster.</p>

        <Button variant="primary" size="lg" fullWidth onClick={handleGuestLogin}>
          Login as Guest
        </Button>

        <p className="login-note">
          This is a demo store — guest login instantly signs you in with no password required.
        </p>
      </div>
    </div>
  )
}

export default Login
