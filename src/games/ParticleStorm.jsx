import { useEffect, useRef, useState, useCallback } from 'react'

function ParticleStorm() {
  const canvasRef = useRef(null)
  const animationIdRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [particleCount, setParticleCount] = useState(0)

  class Particle {
    constructor(x, y, canvas) {
      this.x = x
      this.y = y
      this.vx = (Math.random() - 0.5) * 4
      this.vy = (Math.random() - 0.5) * 4
      this.radius = Math.random() * 3 + 1
      this.color = `hsl(${Math.random() * 360}, 70%, 60%)`
      this.life = 1.0
      this.decay = Math.random() * 0.01 + 0.005
      this.canvas = canvas
    }

    update() {
      this.x += this.vx
      this.y += this.vy
      this.life -= this.decay
      
      // Bounce off walls
      if (this.x <= this.radius || this.x >= this.canvas.width - this.radius) {
        this.vx *= -0.8
        this.x = Math.max(this.radius, Math.min(this.canvas.width - this.radius, this.x))
      }
      if (this.y <= this.radius || this.y >= this.canvas.height - this.radius) {
        this.vy *= -0.8
        this.y = Math.max(this.radius, Math.min(this.canvas.height - this.radius, this.y))
      }
      
      // Gravity effect
      this.vy += 0.02
      
      // Friction
      this.vx *= 0.99
      this.vy *= 0.99
    }

    draw(ctx) {
      ctx.save()
      ctx.globalAlpha = this.life
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()
      
      // Glow effect
      ctx.shadowBlur = 10
      ctx.shadowColor = this.color
      ctx.fill()
      ctx.restore()
    }

    isAlive() {
      return this.life > 0
    }

    distanceTo(x, y) {
      const dx = this.x - x
      const dy = this.y - y
      return Math.sqrt(dx * dx + dy * dy)
    }
  }

  const createParticles = useCallback((x, y, count = 5) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(new Particle(x, y, canvasRef.current))
    }
    setParticleCount(particlesRef.current.length)
  }, [])

  const handleCanvasClick = useCallback((event) => {
    if (!isPlaying) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    // Check if clicked on a particle
    let hitParticle = false
    particlesRef.current = particlesRef.current.filter(particle => {
      if (!hitParticle && particle.distanceTo(x, y) < particle.radius + 10) {
        hitParticle = true
        setScore(prev => prev + 5)
        return false
      }
      return true
    })
    
    // Create explosion effect at click
    createParticles(x, y, hitParticle ? 10 : 3)
  }, [isPlaying, createParticles])

  const handleMouseMove = useCallback((event) => {
    const rect = canvasRef.current.getBoundingClientRect()
    mouseRef.current.x = event.clientX - rect.left
    mouseRef.current.y = event.clientY - rect.top
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    const resize = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }
    
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      // Clear canvas with trail effect
      ctx.fillStyle = 'rgba(26, 26, 26, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (isPlaying) {
        // Update particles
        particlesRef.current = particlesRef.current.filter(particle => {
          particle.update()
          particle.draw(ctx)
          return particle.isAlive()
        })

        // Add attraction to mouse
        particlesRef.current.forEach(particle => {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const force = (100 - distance) / 1000
            particle.vx += (dx / distance) * force
            particle.vy += (dy / distance) * force
          }
        })

        // Randomly add new particles
        if (Math.random() < 0.02 && particlesRef.current.length < 100) {
          createParticles(
            Math.random() * canvas.width,
            Math.random() * canvas.height / 2,
            1
          )
        }

        setParticleCount(particlesRef.current.length)
      }

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [isPlaying, createParticles])

  const startGame = () => {
    setIsPlaying(true)
    setScore(0)
    // Create initial particles
    for (let i = 0; i < 10; i++) {
      createParticles(
        Math.random() * canvasRef.current.width,
        Math.random() * canvasRef.current.height,
        1
      )
    }
  }

  const resetGame = () => {
    particlesRef.current = []
    setScore(0)
    setParticleCount(0)
    setIsPlaying(false)
  }

  return (
    <div className="canvas-container">
      <canvas 
        ref={canvasRef} 
        className="game-canvas"
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        style={{ background: '#1a1a1a' }}
      />
      
      <div className="game-ui-overlay">
        <div className="game-stats">
          <h3>Particle Storm</h3>
          <p>Score: {score}</p>
          <p>Particles: {particleCount}</p>
          <p>Status: {isPlaying ? 'Playing' : 'Paused'}</p>
          <div style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
            <p>🎯 Click particles to destroy them</p>
            <p>🖱️ Move mouse to attract particles</p>
            <p>✨ Click empty space for effects</p>
          </div>
        </div>
        
        <div className="game-controls">
          {!isPlaying ? (
            <button className="game-button" onClick={startGame}>
              Start Game
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

export default ParticleStorm 