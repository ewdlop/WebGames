import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Text, Box, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import GameUI from '../GameUI'
import TwoSlotLayout from '../layouts/TwoSlotLayout'
import './CosmicDefender.css'

// Player Spaceship Component
function Spaceship({ position, onFire }) {
  const meshRef = useRef()
  const { camera } = useThree()
  const [shipPosition, setShipPosition] = useState([0, 0, 0])
  const velocity = useRef([0, 0, 0])

  useFrame(() => {
    if (!meshRef.current) return
    
    // Update position
    meshRef.current.position.x += velocity.current[0] * 0.016
    meshRef.current.position.y += velocity.current[1] * 0.016
    meshRef.current.position.z += velocity.current[2] * 0.016
    
    // Boundaries
    meshRef.current.position.x = Math.max(-10, Math.min(10, meshRef.current.position.x))
    meshRef.current.position.y = Math.max(-5, Math.min(5, meshRef.current.position.y))
    meshRef.current.position.z = Math.max(-5, Math.min(5, meshRef.current.position.z))
    
    // Camera follows spaceship
    const pos = meshRef.current.position
    camera.position.x = pos.x
    camera.position.y = pos.y + 5
    camera.position.z = pos.z + 10
    camera.lookAt(pos.x, pos.y, pos.z)
    
    // Update ship position for other components
    setShipPosition([pos.x, pos.y, pos.z])
    
    // Apply friction
    velocity.current[0] *= 0.9
    velocity.current[1] *= 0.9
    velocity.current[2] *= 0.9
  })

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch(event.code) {
        case 'KeyW':
        case 'ArrowUp':
          velocity.current[2] = -10
          break
        case 'KeyS':
        case 'ArrowDown':
          velocity.current[2] = 5
          break
        case 'KeyA':
        case 'ArrowLeft':
          velocity.current[0] = -8
          break
        case 'KeyD':
        case 'ArrowRight':
          velocity.current[0] = 8
          break
        case 'Space':
          event.preventDefault()
          onFire(shipPosition)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onFire, shipPosition])

  return (
    <Box ref={meshRef} args={[1, 0.5, 2]} position={position}>
      <meshStandardMaterial color="#00ff88" metalness={0.8} roughness={0.2} />
    </Box>
  )
}

// Asteroid Component
function Asteroid({ position, onDestroy, id }) {
  const meshRef = useRef()
  const speed = useRef(Math.random() * 2 + 1)

  useFrame(() => {
    if (!meshRef.current) return
    
    // Move asteroid forward
    meshRef.current.position.z += speed.current * 0.016
    
    // Remove asteroid if it goes too far
    if (meshRef.current.position.z > 20) {
      onDestroy(id)
    }
    
    // Rotate for visual effect
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.01
  })

  return (
    <Sphere ref={meshRef} args={[Math.random() * 0.8 + 0.5]} position={position}>
      <meshStandardMaterial color="#8B4513" roughness={0.8} />
    </Sphere>
  )
}

// Laser Projectile Component
function Laser({ position, onDestroy, id }) {
  const meshRef = useRef()

  useFrame(() => {
    if (!meshRef.current) return
    
    // Move laser forward
    meshRef.current.position.z -= 0.8
    
    // Remove laser if it goes too far
    if (meshRef.current.position.z < -50) {
      onDestroy(id)
    }
  })

  return (
    <Box ref={meshRef} args={[0.1, 0.1, 1]} position={position}>
      <meshBasicMaterial color="#ff0066" />
    </Box>
  )
}

// Explosion Effect Component
function Explosion({ position, onComplete }) {
  const meshRef = useRef()
  const scale = useRef(0)
  const opacity = useRef(1)

  useFrame((state, delta) => {
    if (meshRef.current) {
      scale.current += delta * 8
      opacity.current = Math.max(0, 1 - scale.current / 3)
      
      if (scale.current > 3) {
        onComplete()
        return
      }
      
      meshRef.current.scale.setScalar(scale.current)
      meshRef.current.material.opacity = opacity.current
    }
  })

  return (
    <Sphere ref={meshRef} position={position} args={[1]}>
      <meshBasicMaterial color="#ff4400" transparent />
    </Sphere>
  )
}

// Main Game Scene Component
function GameScene({ 
  isPlaying, 
  onScoreUpdate, 
  onHealthUpdate, 
  score, 
  health,
  gameOver 
}) {
  const [asteroids, setAsteroids] = useState([])
  const [lasers, setLasers] = useState([])
  const [explosions, setExplosions] = useState([])
  const [nextAsteroidId, setNextAsteroidId] = useState(0)
  const [nextLaserId, setNextLaserId] = useState(0)
  const [nextExplosionId, setNextExplosionId] = useState(0)

  // Spawn asteroids
  useEffect(() => {
    if (!isPlaying || gameOver) return

    const spawnInterval = setInterval(() => {
      const newAsteroid = {
        id: nextAsteroidId,
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 8,
          -30
        ]
      }
      
      setAsteroids(prev => [...prev, newAsteroid])
      setNextAsteroidId(prev => prev + 1)
    }, 2000)

    return () => clearInterval(spawnInterval)
  }, [isPlaying, gameOver, nextAsteroidId])

  // Fire laser
  const fireLaser = (shipPosition) => {
    if (!isPlaying || gameOver) return

    const newLaser = {
      id: nextLaserId,
      position: [shipPosition[0], shipPosition[1], shipPosition[2] - 1]
    }
    
    setLasers(prev => [...prev, newLaser])
    setNextLaserId(prev => prev + 1)
  }

  // Remove asteroid
  const removeAsteroid = (id) => {
    setAsteroids(prev => prev.filter(asteroid => asteroid.id !== id))
  }

  // Remove laser
  const removeLaser = (id) => {
    setLasers(prev => prev.filter(laser => laser.id !== id))
  }

  // Create explosion
  const createExplosion = (position) => {
    const explosion = {
      id: nextExplosionId,
      position: position
    }
    setExplosions(prev => [...prev, explosion])
    setNextExplosionId(prev => prev + 1)
  }

  // Remove explosion
  const removeExplosion = (id) => {
    setExplosions(prev => prev.filter(explosion => explosion.id !== id))
  }

  // Collision detection
  useFrame(() => {
    if (!isPlaying || gameOver) return

    // Check laser-asteroid collisions
    lasers.forEach(laser => {
      asteroids.forEach(asteroid => {
        const distance = Math.sqrt(
          Math.pow(laser.position[0] - asteroid.position[0], 2) +
          Math.pow(laser.position[1] - asteroid.position[1], 2) +
          Math.pow(laser.position[2] - asteroid.position[2], 2)
        )
        
        if (distance < 2) {
          createExplosion(asteroid.position)
          removeAsteroid(asteroid.id)
          removeLaser(laser.id)
          onScoreUpdate(score + 100)
        }
      })
    })

    // Check spaceship-asteroid collisions (simplified)
    asteroids.forEach(asteroid => {
      const distance = Math.sqrt(
        Math.pow(asteroid.position[0], 2) +
        Math.pow(asteroid.position[1], 2) +
        Math.pow(asteroid.position[2], 2)
      )
      
      if (distance < 3 && asteroid.position[2] > -5) {
        createExplosion(asteroid.position)
        removeAsteroid(asteroid.id)
        onHealthUpdate(health - 20)
      }
    })
  })

  return (
    <>
      {/* Spaceship */}
      <Spaceship 
        position={[0, 0, 0]} 
        onFire={fireLaser}
      />
      
      {/* Asteroids */}
      {asteroids.map(asteroid => (
        <Asteroid
          key={asteroid.id}
          id={asteroid.id}
          position={asteroid.position}
          onDestroy={removeAsteroid}
        />
      ))}
      
      {/* Lasers */}
      {lasers.map(laser => (
        <Laser
          key={laser.id}
          id={laser.id}
          position={laser.position}
          onDestroy={removeLaser}
        />
      ))}
      
      {/* Explosions */}
      {explosions.map(explosion => (
        <Explosion
          key={explosion.id}
          position={explosion.position}
          onComplete={() => removeExplosion(explosion.id)}
        />
      ))}
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[0, 5, 5]} intensity={0.5} />
    </>
  )
}

// Main Game Component
function CosmicDefender() {
  const [score, setScore] = useState(0)
  const [health, setHealth] = useState(100)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  // Check game over
  useEffect(() => {
    if (health <= 0) {
      setGameOver(true)
      setIsPlaying(false)
    }
  }, [health])

  const startGame = () => {
    setIsPlaying(true)
    setGameOver(false)
    setScore(0)
    setHealth(100)
  }

  const pauseGame = () => {
    setIsPlaying(false)
  }

  const resetGame = () => {
    setIsPlaying(false)
    setGameOver(false)
    setScore(0)
    setHealth(100)
  }

  // Game Canvas Component (Top Slot)
  const GameCanvasComponent = () => (
    <div className="cosmic-game-canvas">
      <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        
        <GameScene
          isPlaying={isPlaying}
          onScoreUpdate={setScore}
          onHealthUpdate={setHealth}
          score={score}
          health={health}
          gameOver={gameOver}
        />
        
        {/* Game Over Text */}
        {gameOver && (
          <Text
            position={[0, 2, -5]}
            fontSize={2}
            color="#ff0000"
            anchorX="center"
            anchorY="middle"
          >
            GAME OVER
          </Text>
        )}
        
        <OrbitControls enabled={false} />
      </Canvas>
    </div>
  )

  // Controls Component (Bottom Slot)
  const GameControlsComponent = () => (
    <div className="cosmic-controls-section">
      <div className="control-instructions">
        <h4>🚀 Controls</h4>
        <div className="control-grid">
          <div className="control-item">
            <span className="key">WASD</span>
            <span className="action">Move Ship</span>
          </div>
          <div className="control-item">
            <span className="key">SPACE</span>
            <span className="action">Fire Laser</span>
          </div>
        </div>
      </div>
      
      <GameUI
        gameTitle="Cosmic Defender"
        score={score}
        status={gameOver ? 'Game Over!' : isPlaying ? 'Defending Space' : 'Ready'}
        isPlaying={isPlaying}
        additionalStats={{
          "Health": `${health}%`,
          "Score Multiplier": "1x"
        }}
        instructions={[
          "🎯 Destroy asteroids for points",
          "🛡️ Avoid collisions with asteroids",
          "🚀 Use WASD to move, SPACE to fire"
        ]}
        onStart={startGame}
        onPause={pauseGame}
        onReset={resetGame}
      />
    </div>
  )

  return (
    <div className="cosmic-defender-container">
      <TwoSlotLayout
        layout="vertical"
        className="cosmic-defender-layout"
        leftComponent={GameCanvasComponent}
        rightComponent={GameControlsComponent}
        containerStyle={{
          width: '100%',
          height: '100%'
        }}
        leftStyle={{
          flex: '4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        rightStyle={{
          flex: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    </div>
  )
}

export default CosmicDefender 