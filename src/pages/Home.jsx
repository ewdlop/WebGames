import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to WebGames</h1>
        <p className="hero-subtitle">
          Your ultimate destination for web-based games and entertainment
        </p>
        <div className="hero-actions">
          <Link to="/games" className="cta-button primary">
            Explore Games
          </Link>
          <Link to="/about" className="cta-button secondary">
            Learn More
          </Link>
        </div>
      </div>
      
      <section className="features">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🎮 Diverse Games</h3>
            <p>From puzzle games to action adventures, we have something for everyone.</p>
          </div>
          <div className="feature-card">
            <h3>🚀 Instant Play</h3>
            <p>No downloads required. Play directly in your browser.</p>
          </div>
          <div className="feature-card">
            <h3>📱 Mobile Friendly</h3>
            <p>Enjoy our games on any device, anywhere, anytime.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 