import { Link } from 'react-router-dom'
import './Games.css'

function Games() {
  const games = [
    {
      id: 1,
      title: "Cube Adventure",
      description: "Interactive 3D game with Three.js - Click rotating cubes to destroy them!",
      category: "3D/WebGL",
      players: "1 Player",
      technology: "Three.js",
      route: "/games/play/cube-adventure"
    },
    {
      id: 2,
      title: "Particle Storm",
      description: "2D Canvas particle effects - Control colorful particles with mouse interaction",
      category: "2D Canvas",
      players: "1 Player",
      technology: "HTML5 Canvas",
      route: "/games/play/particle-storm"
    },
    {
      id: 3,
      title: "Space Adventure",
      description: "Explore the cosmos in this epic space journey",
      category: "Adventure",
      players: "1 Player",
      technology: "Coming Soon",
      route: null
    },
    {
      id: 4,
      title: "Racing Thunder",
      description: "High-speed racing action",
      category: "Racing",
      players: "1-4 Players",
      technology: "Coming Soon",
      route: null
    },
    {
      id: 5,
      title: "Word Wizard",
      description: "Test your vocabulary skills",
      category: "Word",
      players: "1-2 Players",
      technology: "Coming Soon",
      route: null
    },
    {
      id: 6,
      title: "Memory Challenge",
      description: "Train your memory with fun exercises",
      category: "Memory",
      players: "1 Player",
      technology: "Coming Soon",
      route: null
    }
  ]

  return (
    <div className="games">
      <div className="games-header">
        <h1>Our Games Collection</h1>
        <p>Discover amazing games built with modern web technologies!</p>
        <div className="tech-badges">
          <span className="tech-badge">Three.js</span>
          <span className="tech-badge">WebGL</span>
          <span className="tech-badge">HTML5 Canvas</span>
          <span className="tech-badge">React</span>
        </div>
      </div>
      
      <div className="games-grid">
        {games.map(game => (
          <div key={game.id} className={`game-card ${!game.route ? 'coming-soon' : ''}`}>
            <div className="game-category">{game.category}</div>
            <div className="game-tech">{game.technology}</div>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <div className="game-info">
              <span className="players">{game.players}</span>
            </div>
            {game.route ? (
              <Link to={game.route} className="play-button">
                Play Now
              </Link>
            ) : (
              <button className="play-button disabled" disabled>
                Coming Soon
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="games-footer">
        <h2>Canvas & WebGL Technologies</h2>
        <div className="tech-info">
          <div className="tech-card">
            <h3>🎨 HTML5 Canvas</h3>
            <p>2D graphics rendering for particle effects, animations, and classic game mechanics.</p>
          </div>
          <div className="tech-card">
            <h3>🌐 WebGL & Three.js</h3>
            <p>Hardware-accelerated 3D graphics for immersive gaming experiences.</p>
          </div>
          <div className="tech-card">
            <h3>⚡ Real-time Rendering</h3>
            <p>Smooth 60fps gameplay with optimized performance across all devices.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Games 