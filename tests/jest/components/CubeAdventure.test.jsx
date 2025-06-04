import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CubeAdventure from '../../../src/components/games/CubeAdventure'

// Mock the useThree hook
jest.mock('../../../src/hooks/useThree', () => ({
  useThree: jest.fn(() => ({
    canvasRef: { current: document.createElement('canvas') },
    isLoading: false,
    scene: {
      add: jest.fn(),
      remove: jest.fn()
    },
    camera: {}
  }))
}))

// Mock GameUI component
jest.mock('../../../src/components/GameUI', () => {
  return function MockGameUI({ gameTitle, score, onStart, onPause, onReset, isPlaying }) {
    return (
      <div data-testid="game-ui">
        <h1>{gameTitle}</h1>
        <div data-testid="score">Score: {score}</div>
        <div data-testid="status">{isPlaying ? 'Playing' : 'Paused'}</div>
        <button onClick={onStart} data-testid="start-btn">Start</button>
        <button onClick={onPause} data-testid="pause-btn">Pause</button>
        <button onClick={onReset} data-testid="reset-btn">Reset</button>
      </div>
    )
  }
})

describe('CubeAdventure Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', () => {
    render(<CubeAdventure />)
    expect(screen.getByTestId('game-ui')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Cube Adventure' })).toBeInTheDocument()
  })

  test('displays initial game state', () => {
    render(<CubeAdventure />)
    expect(screen.getByTestId('score')).toHaveTextContent('Score: 0')
    expect(screen.getByTestId('status')).toHaveTextContent('Paused')
  })

  test('renders canvas element', () => {
    render(<CubeAdventure />)
    const canvas = document.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
    expect(canvas).toHaveClass('game-canvas')
  })

  test('shows loading state when loading is true', () => {
    const { useThree } = require('../../../src/hooks/useThree')
    useThree.mockReturnValue({
      canvasRef: { current: document.createElement('canvas') },
      isLoading: true,
      scene: { add: jest.fn(), remove: jest.fn() },
      camera: {}
    })

    render(<CubeAdventure />)
    expect(screen.getByText('Loading 3D Scene...')).toBeInTheDocument()
    expect(document.querySelector('.loading-spinner')).toBeInTheDocument()
  })

  test('starts game when start button is clicked', async () => {
    render(<CubeAdventure />)
    const startBtn = screen.getByTestId('start-btn')
    
    fireEvent.click(startBtn)
    
    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('Playing')
    })
  })

  test('pauses game when pause button is clicked', async () => {
    render(<CubeAdventure />)
    const startBtn = screen.getByTestId('start-btn')
    const pauseBtn = screen.getByTestId('pause-btn')
    
    fireEvent.click(startBtn)
    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('Playing')
    })
    
    fireEvent.click(pauseBtn)
    expect(screen.getByTestId('status')).toHaveTextContent('Paused')
  })

  test('resets game when reset button is clicked', async () => {
    render(<CubeAdventure />)
    const startBtn = screen.getByTestId('start-btn')
    const resetBtn = screen.getByTestId('reset-btn')
    
    // Start game 
    fireEvent.click(startBtn)
    
    // Reset game
    fireEvent.click(resetBtn)
    
    expect(screen.getByTestId('score')).toHaveTextContent('Score: 0')
    expect(screen.getByTestId('status')).toHaveTextContent('Paused')
  })

  test('handles canvas click events', () => {
    render(<CubeAdventure />)
    const canvas = document.querySelector('canvas')
    
    // Start the game first
    fireEvent.click(screen.getByTestId('start-btn'))
    
    // Mock getBoundingClientRect
    canvas.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      top: 0,
      width: 800,
      height: 600
    }))
    
    fireEvent.click(canvas, {
      clientX: 400,
      clientY: 300
    })
    
    // The click should be handled without errors
    expect(canvas).toBeInTheDocument()
  })

  test('component unmounts cleanly', () => {
    const { unmount } = render(<CubeAdventure />)
    
    // Start the game
    fireEvent.click(screen.getByTestId('start-btn'))
    
    // Unmounting should not throw errors
    expect(() => unmount()).not.toThrow()
  })

  test('handles Three.js scene initialization', () => {
    const { useThree } = require('../../../src/hooks/useThree')
    const mockScene = { add: jest.fn(), remove: jest.fn() }
    
    useThree.mockReturnValue({
      canvasRef: { current: document.createElement('canvas') },
      isLoading: false,
      scene: mockScene,
      camera: {}
    })

    render(<CubeAdventure />)
    
    // The useThree hook should be called with proper configuration
    expect(useThree).toHaveBeenCalledWith(
      expect.objectContaining({
        cameraPosition: [0, 0, 8],
        enableControls: true
      })
    )
  })
}) 