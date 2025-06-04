import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ParticleStorm from '../../../src/components/games/ParticleStorm'

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

describe('ParticleStorm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', () => {
    render(<ParticleStorm />)
    expect(screen.getByTestId('game-ui')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Particle Storm' })).toBeInTheDocument()
  })

  test('displays initial game state', () => {
    render(<ParticleStorm />)
    expect(screen.getByTestId('score')).toHaveTextContent('Score: 0')
    expect(screen.getByTestId('status')).toHaveTextContent('Paused')
  })

  test('renders canvas element', () => {
    render(<ParticleStorm />)
    const canvas = document.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
    expect(canvas).toHaveClass('game-canvas')
  })

  test('starts game when start button is clicked', async () => {
    render(<ParticleStorm />)
    const startBtn = screen.getByTestId('start-btn')
    
    fireEvent.click(startBtn)
    
    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('Playing')
    })
  })

  test('pauses game when pause button is clicked', async () => {
    render(<ParticleStorm />)
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
    render(<ParticleStorm />)
    const startBtn = screen.getByTestId('start-btn')
    const resetBtn = screen.getByTestId('reset-btn')
    
    // Start game and let score change
    fireEvent.click(startBtn)
    
    // Reset game
    fireEvent.click(resetBtn)
    
    expect(screen.getByTestId('score')).toHaveTextContent('Score: 0')
    expect(screen.getByTestId('status')).toHaveTextContent('Paused')
  })

  test('handles canvas click events', () => {
    render(<ParticleStorm />)
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
      clientX: 100,
      clientY: 100
    })
    
    // The click should be handled without errors
    expect(canvas).toBeInTheDocument()
  })

  test('handles mouse move events', () => {
    render(<ParticleStorm />)
    const canvas = document.querySelector('canvas')
    
    // Mock getBoundingClientRect
    canvas.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      top: 0,
      width: 800,
      height: 600
    }))
    
    fireEvent.mouseMove(canvas, {
      clientX: 200,
      clientY: 150
    })
    
    // The mouse move should be handled without errors
    expect(canvas).toBeInTheDocument()
  })

  test('canvas has correct styling', () => {
    render(<ParticleStorm />)
    const canvas = document.querySelector('canvas')
    
    expect(canvas).toHaveStyle({ background: '#1a1a1a' })
  })

  test('component unmounts cleanly', () => {
    const { unmount } = render(<ParticleStorm />)
    
    // Start the game to ensure animation is running
    fireEvent.click(screen.getByTestId('start-btn'))
    
    // Unmounting should not throw errors
    expect(() => unmount()).not.toThrow()
  })
}) 