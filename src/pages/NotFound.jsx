import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Oops! The page you're looking for doesn't exist. 
          It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="home-button">
            Back to Home
          </Link>
          <Link to="/games" className="games-button">
            Browse Games
          </Link>
        </div>
      </div>
      <div className="not-found-graphic">
        <div className="floating-element">🎮</div>
        <div className="floating-element">🕹️</div>
        <div className="floating-element">🎯</div>
      </div>
    </div>
  )
}

export default NotFound 