import { useEffect, useRef, useState } from 'react'
import './MemoryMatch.css'

function MemoryMatch() {
  const gameContainerRef = useRef(null)
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  
  // Game state stored in refs to avoid React re-renders affecting the vanilla JS game
  const gameStateRef = useRef({
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    totalPairs: 8,
    startTime: null,
    timer: null
  })

  const cardEmojis = ['🎮', '🎯', '🎲', '🃏', '🎪', '🎨', '🎭', '🎪']

  useEffect(() => {
    if (!gameContainerRef.current) return

    const container = gameContainerRef.current
    
    // Initialize the game board
    const initializeGame = () => {
      container.innerHTML = ''
      
      // Create card data
      const cardData = [...cardEmojis, ...cardEmojis] // Duplicate for pairs
      const shuffledCards = cardData.sort(() => Math.random() - 0.5)
      
      // Create game board
      const gameBoard = document.createElement('div')
      gameBoard.className = 'memory-game-board'
      
      shuffledCards.forEach((emoji, index) => {
        const card = document.createElement('div')
        card.className = 'memory-card'
        card.dataset.id = index
        card.dataset.emoji = emoji
        
        const cardInner = document.createElement('div')
        cardInner.className = 'memory-card-inner'
        
        const cardFront = document.createElement('div')
        cardFront.className = 'memory-card-front'
        cardFront.textContent = '?'
        
        const cardBack = document.createElement('div')
        cardBack.className = 'memory-card-back'
        cardBack.textContent = emoji
        
        cardInner.appendChild(cardFront)
        cardInner.appendChild(cardBack)
        card.appendChild(cardInner)
        
        // Add click event listener
        card.addEventListener('click', handleCardClick)
        
        gameBoard.appendChild(card)
        gameStateRef.current.cards.push(card)
      })
      
      container.appendChild(gameBoard)
    }

    const handleCardClick = (event) => {
      if (!isPlaying) return
      
      const card = event.currentTarget
      
      // Don't flip if card is already flipped or matched
      if (card.classList.contains('flipped') || card.classList.contains('matched')) {
        return
      }
      
      // Don't flip if two cards are already flipped
      if (gameStateRef.current.flippedCards.length >= 2) {
        return
      }
      
      // Flip the card
      flipCard(card)
      gameStateRef.current.flippedCards.push(card)
      
      // Check for match when two cards are flipped
      if (gameStateRef.current.flippedCards.length === 2) {
        setMoves(prev => prev + 1)
        setTimeout(checkForMatch, 800)
      }
    }

    const flipCard = (card) => {
      card.classList.add('flipped')
    }

    const unflipCard = (card) => {
      card.classList.remove('flipped')
    }

    const checkForMatch = () => {
      const [card1, card2] = gameStateRef.current.flippedCards
      
      if (card1.dataset.emoji === card2.dataset.emoji) {
        // Match found
        card1.classList.add('matched')
        card2.classList.add('matched')
        gameStateRef.current.matchedPairs++
        setScore(prev => prev + 100)
        
        // Check if game is completed
        if (gameStateRef.current.matchedPairs === gameStateRef.current.totalPairs) {
          setGameCompleted(true)
          setIsPlaying(false)
          if (gameStateRef.current.timer) {
            clearInterval(gameStateRef.current.timer)
          }
        }
      } else {
        // No match, flip cards back
        unflipCard(card1)
        unflipCard(card2)
      }
      
      gameStateRef.current.flippedCards = []
    }

    initializeGame()

    return () => {
      if (gameStateRef.current.timer) {
        clearInterval(gameStateRef.current.timer)
      }
    }
  }, [isPlaying])

  // Timer effect
  useEffect(() => {
    if (isPlaying && !gameCompleted) {
      gameStateRef.current.startTime = Date.now()
      gameStateRef.current.timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - gameStateRef.current.startTime) / 1000)
        setTimeElapsed(elapsed)
      }, 1000)
    } else {
      if (gameStateRef.current.timer) {
        clearInterval(gameStateRef.current.timer)
      }
    }

    return () => {
      if (gameStateRef.current.timer) {
        clearInterval(gameStateRef.current.timer)
      }
    }
  }, [isPlaying, gameCompleted])

  const startGame = () => {
    setIsPlaying(true)
    setScore(0)
    setMoves(0)
    setTimeElapsed(0)
    setGameCompleted(false)
    gameStateRef.current.matchedPairs = 0
    gameStateRef.current.flippedCards = []
  }

  const resetGame = () => {
    setIsPlaying(false)
    setScore(0)
    setMoves(0)
    setTimeElapsed(0)
    setGameCompleted(false)
    gameStateRef.current.matchedPairs = 0
    gameStateRef.current.flippedCards = []
    
    // Reset all cards
    gameStateRef.current.cards.forEach(card => {
      card.classList.remove('flipped', 'matched')
    })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="memory-game-container">
      <div ref={gameContainerRef} className="memory-game-content">
        {/* Game board will be created here by vanilla JS */}
      </div>
      
      <div className="game-ui-overlay">
        <div className="game-stats">
          <h3>Memory Match</h3>
          <p>Score: {score}</p>
          <p>Moves: {moves}</p>
          <p>Time: {formatTime(timeElapsed)}</p>
          <p>Status: {gameCompleted ? 'Completed!' : isPlaying ? 'Playing' : 'Paused'}</p>
          {gameCompleted && (
            <div className="completion-message">
              <p>🎉 Congratulations!</p>
              <p>Completed in {moves} moves!</p>
            </div>
          )}
          <div style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
            <p>🧠 Match all card pairs</p>
            <p>🎯 Click cards to flip them</p>
            <p>⏱️ Complete as fast as possible</p>
          </div>
        </div>
        
        <div className="game-controls">
          {!isPlaying && !gameCompleted ? (
            <button className="game-button" onClick={startGame}>
              Start Game
            </button>
          ) : gameCompleted ? (
            <button className="game-button" onClick={resetGame}>
              Play Again
            </button>
          ) : (
            <button className="game-button" onClick={() => setIsPlaying(false)}>
              Pause
            </button>
          )}
          <button className="game-button" onClick={resetGame}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default MemoryMatch 