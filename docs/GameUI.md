# GameUI Component

A reusable game overlay component that provides a consistent UI for displaying game stats, instructions, and controls across different games.

## Usage

```jsx
import GameUI from './components/GameUI'

function YourGame() {
  const [gameState, setGameState] = useState({
    score: 0,
    isPlaying: false,
    status: 'Ready'
  })

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} className="game-canvas" />
      
      <GameUI
        gameTitle="Your Game"
        score={gameState.score}
        status={gameState.status}
        isPlaying={gameState.isPlaying}
        additionalStats={{
          "Level": currentLevel,
          "Lives": lives,
          "Time": timer
        }}
        instructions={[
          "Use WASD to move",
          "Space to jump",
          "Mouse to look around"
        ]}
        onStart={() => startGame()}
        onPause={() => pauseGame()}
        onReset={() => resetGame()}
      />
    </div>
  )
}
```

## Props

- `gameTitle` (string): The name of the game
- `score` (number): Current game score
- `status` (string): Current game status (e.g., "Playing", "Paused", "Game Over")
- `isPlaying` (boolean): Whether the game is currently playing
- `additionalStats` (object): Additional game-specific stats to display
- `instructions` (array): Array of instruction strings to show
- `onStart` (function): Called when start button is clicked
- `onPause` (function): Called when pause button is clicked
- `onReset` (function): Called when reset button is clicked

## Examples

### CubeAdventure Example
```jsx
<GameUI
  gameTitle="Cube Adventure"
  score={score}
  status={isPlaying ? "Playing" : "Paused"}
  isPlaying={isPlaying}
  additionalStats={{
    "Position": `${position.x.toFixed(1)}, ${position.y.toFixed(1)}, ${position.z.toFixed(1)}`,
    "Speed": speed.toFixed(1)
  }}
  instructions={[
    "WASD - Move",
    "Mouse - Look around",
    "Space - Jump"
  ]}
  onStart={startGame}
  onPause={pauseGame}
  onReset={resetGame}
/>
```

### ParticleStorm Example
```jsx
<GameUI
  gameTitle="Particle Storm"
  score={score}
  status={gameStatus}
  isPlaying={isRunning}
  additionalStats={{
    "Particles": particleCount,
    "Level": currentLevel,
    "Lives": lives
  }}
  instructions={[
    "Click - Create particles",
    "Mouse - Move around",
    "Space - Special ability"
  ]}
  onStart={startParticleStorm}
  onPause={pauseParticleStorm}
  onReset={resetParticleStorm}
/>
``` 