import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button.jsx'
import './NotFound.css'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="page-fade-in not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <h2>This page took a wrong turn</h2>
        <p>The page you're looking for doesn't exist or may have been moved.</p>
        <div className="not-found-actions">
          <Button variant="primary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
          <Button variant="outline" onClick={() => navigate('/shop')}>
            Go to Shop
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
