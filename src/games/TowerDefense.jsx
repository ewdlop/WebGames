import { useEffect, useRef, useState } from 'react'
import $ from 'jquery'
import './TowerDefense.css'

function TowerDefense() {
  const gameContainerRef = useRef(null)
  const [score, setScore] = useState(0)
  const [health, setHealth] = useState(100)
  const [money, setMoney] = useState(500)
  const [wave, setWave] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  
  const gameStateRef = useRef({
    enemies: [],
    towers: [],
    projectiles: [],
    gameLoop: null,
    enemySpawnTimer: null,
    selectedTowerType: 'basic',
    waveEnemyCount: 0,
    maxEnemies: 10
  })

  const towerTypes = {
    basic: { cost: 100, damage: 25, range: 80, fireRate: 1000, color: '#ff6b6b' },
    fast: { cost: 150, damage: 15, range: 60, fireRate: 500, color: '#4ecdc4' },
    heavy: { cost: 300, damage: 50, range: 100, fireRate: 2000, color: '#45b7d1' }
  }

  useEffect(() => {
    if (!gameContainerRef.current) return

    const $container = $(gameContainerRef.current)
    
    const initializeGame = () => {
      $container.empty()
      
      // Create game board
      const $gameBoard = $('<div>').addClass('tower-game-board')
      
      // Create path (simple straight line for this demo)
      const $path = $('<div>').addClass('tower-path')
      for (let i = 0; i < 20; i++) {
        const $pathSegment = $('<div>')
          .addClass('path-segment')
          .css({
            left: `${i * 30}px`,
            top: '200px'
          })
        $path.append($pathSegment)
      }
      
      $gameBoard.append($path)
      
      // Add click handler for tower placement
      $gameBoard.on('click', handleBoardClick)
      
      $container.append($gameBoard)
      
      // Create tower selection panel
      const $towerPanel = $('<div>').addClass('tower-panel')
      Object.entries(towerTypes).forEach(([type, config]) => {
        const $towerBtn = $('<button>')
          .addClass('tower-btn')
          .addClass(gameStateRef.current.selectedTowerType === type ? 'selected' : '')
          .text(`${type.toUpperCase()} ($${config.cost})`)
          .css('background-color', config.color)
          .on('click', () => selectTowerType(type))
        $towerPanel.append($towerBtn)
      })
      
      $container.append($towerPanel)
    }

    const selectTowerType = (type) => {
      gameStateRef.current.selectedTowerType = type
      $('.tower-btn').removeClass('selected')
      $(`.tower-btn:contains("${type.toUpperCase()}")`).addClass('selected')
    }

    const handleBoardClick = (event) => {
      if (!isPlaying || gameOver) return
      
      const $board = $('.tower-game-board')
      const offset = $board.offset()
      const x = event.pageX - offset.left
      const y = event.pageY - offset.top
      
      // Don't place towers on the path
      if (y >= 190 && y <= 230) return
      
      const towerType = gameStateRef.current.selectedTowerType
      const config = towerTypes[towerType]
      
      if (money >= config.cost) {
        placeTower(x, y, towerType)
        setMoney(prev => prev - config.cost)
      }
    }

    const placeTower = (x, y, type) => {
      const config = towerTypes[type]
      const $tower = $('<div>')
        .addClass('tower')
        .addClass(`tower-${type}`)
        .css({
          left: `${x - 15}px`,
          top: `${y - 15}px`,
          backgroundColor: config.color
        })
      
      $('.tower-game-board').append($tower)
      
      const towerData = {
        $element: $tower,
        x: x,
        y: y,
        type: type,
        lastFired: 0,
        ...config
      }
      
      gameStateRef.current.towers.push(towerData)
    }

    const spawnEnemy = () => {
      if (!isPlaying || gameOver) return
      
      const $enemy = $('<div>')
        .addClass('enemy')
        .css({
          left: '-30px',
          top: '185px'
        })
      
      $('.tower-game-board').append($enemy)
      
      const enemyData = {
        $element: $enemy,
        x: -30,
        y: 200,
        health: wave * 25,
        maxHealth: wave * 25,
        speed: 1 + (wave * 0.2),
        value: 20 + (wave * 5)
      }
      
      gameStateRef.current.enemies.push(enemyData)
      gameStateRef.current.waveEnemyCount++
    }

    const updateEnemies = () => {
      gameStateRef.current.enemies = gameStateRef.current.enemies.filter(enemy => {
        enemy.x += enemy.speed
        enemy.$element.css('left', `${enemy.x}px`)
        
        // Update health bar
        const healthPercent = (enemy.health / enemy.maxHealth) * 100
        enemy.$element.css('background', 
          `linear-gradient(to right, 
            red ${healthPercent}%, 
            darkred ${healthPercent}%)`
        )
        
        // Check if enemy reached the end
        if (enemy.x > 600) {
          setHealth(prev => {
            const newHealth = prev - 10
            if (newHealth <= 0) {
              setGameOver(true)
              setIsPlaying(false)
            }
            return Math.max(0, newHealth)
          })
          enemy.$element.remove()
          return false
        }
        
        // Check if enemy is dead
        if (enemy.health <= 0) {
          setScore(prev => prev + enemy.value)
          setMoney(prev => prev + enemy.value)
          enemy.$element.remove()
          return false
        }
        
        return true
      })
    }

    const updateTowers = () => {
      const currentTime = Date.now()
      
      gameStateRef.current.towers.forEach(tower => {
        if (currentTime - tower.lastFired < tower.fireRate) return
        
        // Find nearest enemy in range
        let nearestEnemy = null
        let nearestDistance = Infinity
        
        gameStateRef.current.enemies.forEach(enemy => {
          const distance = Math.sqrt(
            Math.pow(tower.x - enemy.x, 2) + 
            Math.pow(tower.y - enemy.y, 2)
          )
          
          if (distance <= tower.range && distance < nearestDistance) {
            nearestEnemy = enemy
            nearestDistance = distance
          }
        })
        
        if (nearestEnemy) {
          fireProjectile(tower, nearestEnemy)
          tower.lastFired = currentTime
        }
      })
    }

    const fireProjectile = (tower, target) => {
      const $projectile = $('<div>')
        .addClass('projectile')
        .css({
          left: `${tower.x}px`,
          top: `${tower.y}px`,
          backgroundColor: tower.color
        })
      
      $('.tower-game-board').append($projectile)
      
      const projectileData = {
        $element: $projectile,
        x: tower.x,
        y: tower.y,
        targetX: target.x,
        targetY: target.y,
        damage: tower.damage,
        speed: 5
      }
      
      gameStateRef.current.projectiles.push(projectileData)
    }

    const updateProjectiles = () => {
      gameStateRef.current.projectiles = gameStateRef.current.projectiles.filter(projectile => {
        const dx = projectile.targetX - projectile.x
        const dy = projectile.targetY - projectile.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < projectile.speed) {
          // Hit target
          const enemy = gameStateRef.current.enemies.find(e => 
            Math.abs(e.x - projectile.targetX) < 20 && 
            Math.abs(e.y - projectile.targetY) < 20
          )
          
          if (enemy) {
            enemy.health -= projectile.damage
          }
          
          projectile.$element.remove()
          return false
        }
        
        // Move projectile
        const moveX = (dx / distance) * projectile.speed
        const moveY = (dy / distance) * projectile.speed
        projectile.x += moveX
        projectile.y += moveY
        
        projectile.$element.css({
          left: `${projectile.x}px`,
          top: `${projectile.y}px`
        })
        
        return true
      })
    }

    const gameLoop = () => {
      if (!isPlaying || gameOver) return
      
      updateEnemies()
      updateTowers()
      updateProjectiles()
      
      // Check if wave is complete
      if (gameStateRef.current.waveEnemyCount >= gameStateRef.current.maxEnemies && 
          gameStateRef.current.enemies.length === 0) {
        // Start next wave
        setWave(prev => prev + 1)
        gameStateRef.current.waveEnemyCount = 0
        gameStateRef.current.maxEnemies += 5
        setMoney(prev => prev + 100) // Bonus for completing wave
      }
    }

    initializeGame()

    return () => {
      if (gameStateRef.current.gameLoop) {
        clearInterval(gameStateRef.current.gameLoop)
      }
      if (gameStateRef.current.enemySpawnTimer) {
        clearInterval(gameStateRef.current.enemySpawnTimer)
      }
    }
  }, [isPlaying, gameOver, money])

  const startGame = () => {
    setIsPlaying(true)
    setGameOver(false)
    setScore(0)
    setHealth(100)
    setMoney(500)
    setWave(1)
    
    gameStateRef.current.waveEnemyCount = 0
    gameStateRef.current.maxEnemies = 10
    
    // Start game loops
    gameStateRef.current.gameLoop = setInterval(() => {
      gameLoop()
    }, 50)
    
    gameStateRef.current.enemySpawnTimer = setInterval(() => {
      if (gameStateRef.current.waveEnemyCount < gameStateRef.current.maxEnemies) {
        spawnEnemy()
      }
    }, 2000)
  }

  const resetGame = () => {
    setIsPlaying(false)
    setGameOver(false)
    setScore(0)
    setHealth(100)
    setMoney(500)
    setWave(1)
    
    // Clear intervals
    if (gameStateRef.current.gameLoop) {
      clearInterval(gameStateRef.current.gameLoop)
    }
    if (gameStateRef.current.enemySpawnTimer) {
      clearInterval(gameStateRef.current.enemySpawnTimer)
    }
    
    // Clear game objects
    gameStateRef.current.enemies = []
    gameStateRef.current.towers = []
    gameStateRef.current.projectiles = []
    
    // Remove all game elements
    $('.enemy, .tower, .projectile').remove()
  }

  return (
    <div className="tower-game-container">
      <div ref={gameContainerRef} className="tower-game-content">
        {/* Game board will be created here by jQuery */}
      </div>
      
      <div className="game-ui-overlay">
        <div className="game-stats">
          <h3>Tower Defense</h3>
          <p>Score: {score}</p>
          <p>Health: {health}/100</p>
          <p>Money: ${money}</p>
          <p>Wave: {wave}</p>
          <p>Status: {gameOver ? 'Game Over!' : isPlaying ? 'Playing' : 'Paused'}</p>
          <div style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
            <p>🏗️ Click to place towers</p>
            <p>💰 Earn money by defeating enemies</p>
            <p>❤️ Don't let enemies reach the end!</p>
          </div>
        </div>
        
        <div className="game-controls">
          {!isPlaying ? (
            <button className="game-button" onClick={startGame}>
              {gameOver ? 'Play Again' : 'Start Game'}
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

export default TowerDefense 