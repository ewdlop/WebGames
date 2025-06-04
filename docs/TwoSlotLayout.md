# TwoSlotLayout Component

A flexible layout component that allows child components to pass in two components and renders them in various layout configurations.

## Props

- `leftComponent` (function): A function that returns a React component for the left/first slot
- `rightComponent` (function): A function that returns a React component for the right/second slot
- `layout` (string): Layout type - 'horizontal', 'vertical', or 'overlay' (default: 'horizontal')
- `className` (string): Additional CSS classes for the container
- `leftProps` (object): Props to pass to the left component
- `rightProps` (object): Props to pass to the right component
- `containerStyle` (object): Inline styles for the container
- `leftStyle` (object): Inline styles for the left slot
- `rightStyle` (object): Inline styles for the right slot

## Basic Usage

### Horizontal Layout (Side by Side)
```jsx
import TwoSlotLayout from './components/TwoSlotLayout'

function MyPage() {
  const LeftPanel = (props) => (
    <div>
      <h2>Navigation</h2>
      <ul>
        <li>Home</li>
        <li>About</li>
      </ul>
    </div>
  )

  const RightPanel = (props) => (
    <div>
      <h2>Content</h2>
      <p>Main content goes here</p>
    </div>
  )

  return (
    <TwoSlotLayout
      layout="horizontal"
      leftComponent={LeftPanel}
      rightComponent={RightPanel}
    />
  )
}
```

### Vertical Layout (Stacked)
```jsx
function VerticalExample() {
  const HeaderComponent = () => (
    <header>
      <h1>Page Title</h1>
    </header>
  )

  const MainComponent = () => (
    <main>
      <p>Main content area</p>
    </main>
  )

  return (
    <TwoSlotLayout
      layout="vertical"
      leftComponent={HeaderComponent}
      rightComponent={MainComponent}
    />
  )
}
```

### Overlay Layout (Canvas + UI)
```jsx
function GameExample() {
  const GameCanvas = (props) => (
    <canvas 
      ref={props.canvasRef} 
      className="game-canvas"
      onClick={props.onCanvasClick}
    />
  )

  const GameOverlay = (props) => (
    <GameUI
      gameTitle={props.gameTitle}
      score={props.score}
      status={props.status}
      onStart={props.onStart}
      onReset={props.onReset}
    />
  )

  return (
    <TwoSlotLayout
      layout="overlay"
      className="canvas-ui"
      leftComponent={GameCanvas}
      rightComponent={GameOverlay}
      leftProps={{
        canvasRef: canvasRef,
        onCanvasClick: handleClick
      }}
      rightProps={{
        gameTitle: "My Game",
        score: score,
        status: status,
        onStart: startGame,
        onReset: resetGame
      }}
    />
  )
}
```

## Advanced Usage

### Custom Styling
```jsx
<TwoSlotLayout
  layout="horizontal"
  className="custom-layout"
  containerStyle={{ background: '#f0f0f0', padding: '20px' }}
  leftStyle={{ background: 'lightblue', borderRadius: '8px' }}
  rightStyle={{ background: 'lightgreen', borderRadius: '8px' }}
  leftComponent={LeftPanel}
  rightComponent={RightPanel}
/>
```

### Responsive Sidebar
```jsx
<TwoSlotLayout
  layout="horizontal"
  className="sidebar-layout"
  leftComponent={SidebarComponent}
  rightComponent={MainContentComponent}
  leftProps={{
    menuItems: ['Home', 'About', 'Contact']
  }}
  rightProps={{
    content: pageContent
  }}
/>
```

## Game Integration Example

### Replacing Current Game Structure
```jsx
// Before
function CubeAdventure() {
  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} className="game-canvas" />
      <GameUI {...gameProps} />
    </div>
  )
}

// After
function CubeAdventure() {
  const CanvasComponent = (props) => (
    <canvas 
      ref={props.canvasRef} 
      className="game-canvas"
      onClick={props.onCanvasClick}
    />
  )

  const UIComponent = (props) => (
    <GameUI {...props} />
  )

  return (
    <TwoSlotLayout
      layout="overlay"
      className="canvas-ui"
      leftComponent={CanvasComponent}
      rightComponent={UIComponent}
      leftProps={{
        canvasRef: canvasRef,
        onCanvasClick: onCanvasClick
      }}
      rightProps={{
        gameTitle: "Cube Adventure",
        score: score,
        status: isPlaying ? 'Playing' : 'Paused',
        isPlaying: isPlaying,
        onStart: startGame,
        onPause: () => setIsPlaying(false),
        onReset: resetGame
      }}
    />
  )
}
```

## Pre-built Layout Classes

- `game-layout`: Full height game container
- `sidebar-layout`: Fixed sidebar with flexible main area
- `canvas-ui`: Canvas with overlay UI (perfect for games)

## Features

- ✅ Multiple layout types (horizontal, vertical, overlay)
- ✅ Responsive design (mobile-friendly)
- ✅ Custom styling support
- ✅ Props passing to child components
- ✅ Game-optimized layouts
- ✅ TypeScript ready
- ✅ Performance optimized 