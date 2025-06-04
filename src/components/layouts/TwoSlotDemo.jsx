import { useState } from 'react'
import TwoSlotLayout from '../TwoSlotLayout'
import GameUI from '../GameUI'

function TwoSlotDemo() {
  const [layoutType, setLayoutType] = useState('horizontal')
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Demo components
  const SidebarComponent = (props) => (
    <div style={{ 
      background: 'rgba(100, 108, 255, 0.1)', 
      padding: '1rem', 
      borderRadius: '8px',
      height: '100%'
    }}>
      <h3>Navigation</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ padding: '0.5rem 0' }}>🏠 Home</li>
        <li style={{ padding: '0.5rem 0' }}>🎮 Games</li>
        <li style={{ padding: '0.5rem 0' }}>ℹ️ About</li>
        <li style={{ padding: '0.5rem 0' }}>📞 Contact</li>
      </ul>
      <p>Props received: {JSON.stringify(props)}</p>
    </div>
  )

  const ContentComponent = (props) => (
    <div style={{ 
      background: 'rgba(0, 255, 100, 0.1)', 
      padding: '1rem', 
      borderRadius: '8px',
      height: '100%'
    }}>
      <h3>Main Content</h3>
      <p>This is the main content area.</p>
      <p>Current layout: <strong>{layoutType}</strong></p>
      
      <div style={{ marginTop: '1rem' }}>
        <h4>Layout Controls:</h4>
        <button 
          onClick={() => setLayoutType('horizontal')}
          style={{ 
            margin: '0.25rem',
            padding: '0.5rem 1rem',
            background: layoutType === 'horizontal' ? '#646cff' : '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Horizontal
        </button>
        <button 
          onClick={() => setLayoutType('vertical')}
          style={{ 
            margin: '0.25rem',
            padding: '0.5rem 1rem',
            background: layoutType === 'vertical' ? '#646cff' : '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Vertical
        </button>
        <button 
          onClick={() => setLayoutType('overlay')}
          style={{ 
            margin: '0.25rem',
            padding: '0.5rem 1rem',
            background: layoutType === 'overlay' ? '#646cff' : '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Overlay
        </button>
      </div>

      <p>Props received: {JSON.stringify(props)}</p>
    </div>
  )

  const CanvasComponent = (props) => (
    <div style={{
      background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)',
      borderRadius: '8px',
      height: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      cursor: 'pointer'
    }}
    onClick={props.onClick}
    >
      <div style={{ textAlign: 'center' }}>
        <h3>🎮 Game Canvas</h3>
        <p>Click to score points!</p>
        <p>Score: {props.score}</p>
      </div>
    </div>
  )

  const UIOverlayComponent = (props) => (
    <GameUI
      gameTitle="TwoSlot Demo Game"
      score={props.score}
      status={props.isPlaying ? 'Playing' : 'Paused'}
      isPlaying={props.isPlaying}
      additionalStats={{
        "Layout": props.layoutType,
        "Clicks": props.score
      }}
      instructions={[
        "🖱️ Click the canvas to score",
        "🔄 Try different layouts",
        "📱 Resize window to test responsive"
      ]}
      onStart={props.onStart}
      onPause={props.onPause}
      onReset={props.onReset}
    />
  )

  const handleCanvasClick = () => {
    if (isPlaying) {
      setScore(prev => prev + 10)
    }
  }

  const startGame = () => {
    setIsPlaying(true)
    setScore(0)
  }

  const pauseGame = () => {
    setIsPlaying(false)
  }

  const resetGame = () => {
    setIsPlaying(false)
    setScore(0)
  }

  return (
    <div style={{ padding: '2rem', height: 'calc(100vh - 4rem)' }}>
      <h2>TwoSlotLayout Demo</h2>
      <p>This demonstrates the flexible TwoSlotLayout component with different layout types.</p>
      
      <div style={{ height: 'calc(100% - 100px)', marginTop: '1rem' }}>
        {layoutType === 'overlay' ? (
          <TwoSlotLayout
            layout="overlay"
            className="canvas-ui"
            leftComponent={CanvasComponent}
            rightComponent={UIOverlayComponent}
            leftProps={{
              onClick: handleCanvasClick,
              score: score
            }}
            rightProps={{
              score: score,
              isPlaying: isPlaying,
              layoutType: layoutType,
              onStart: startGame,
              onPause: pauseGame,
              onReset: resetGame
            }}
          />
        ) : (
          <TwoSlotLayout
            layout={layoutType}
            className={layoutType === 'horizontal' ? 'sidebar-layout' : ''}
            leftComponent={SidebarComponent}
            rightComponent={ContentComponent}
            leftProps={{
              layoutType: layoutType,
              timestamp: Date.now()
            }}
            rightProps={{
              layoutType: layoutType,
              demo: true
            }}
          />
        )}
      </div>
    </div>
  )
}

export default TwoSlotDemo 