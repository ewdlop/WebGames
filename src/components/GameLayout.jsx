import { Outlet, Link, useLocation } from 'react-router-dom'
import './GameLayout.css'

function GameLayout() {
  const location = useLocation()
  const isGamePage = location.pathname.includes('/games/play/')

  return (
    <div className="game-layout">
      {/* Always show header when on game pages */}
      {isGamePage && (
        <div className="game-floating-nav">
          <Link to="/games" className="floating-back-button">
            ← Back to Games
          </Link>
        </div>
      )}
      
      {!isGamePage && (
        <header className="game-header">
          <div className="game-header-content">
            <Link to="/games" className="back-link">
              ← Back to Games
            </Link>
            <div className="game-nav">
              <Link to="/" className="home-link">Home</Link>
            </div>
          </div>
        </header>
      )}
      
      <main className="game-main">
        <Outlet />
      </main>
      
      {!isGamePage && (
        <div className="game-info-panel">
          <div className="game-controls-hint">
            <p>💡 Game controls and instructions will appear here</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default GameLayout 