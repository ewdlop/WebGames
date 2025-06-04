import './GameUI.css'

function GameUI({ 
  gameTitle, 
  score, 
  status, 
  additionalStats = {}, 
  instructions = [], 
  isPlaying,
  onStart,
  onPause,
  onReset 
}) {
  return (
    <div className="game-ui-overlay">
      <div className="game-stats">
        <h3>{gameTitle}</h3>
        <p>Score: {score}</p>
        <p>Status: {status}</p>
        
        {/* Additional game-specific stats */}
        {Object.entries(additionalStats).map(([key, value]) => (
          <p key={key}>{key}: {value}</p>
        ))}
        
        {/* Game instructions */}
        {instructions.length > 0 && (
          <div style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
            {instructions.map((instruction, index) => (
              <p key={index}>{instruction}</p>
            ))}
          </div>
        )}
      </div>
      
      <div className="game-controls">
        {!isPlaying ? (
          <button className="game-button" onClick={onStart}>
            Start Game
          </button>
        ) : (
          <button className="game-button" onClick={onPause}>
            Pause
          </button>
        )}
        <button className="game-button" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default GameUI 