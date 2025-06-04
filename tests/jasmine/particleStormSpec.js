const GameTestUtils = require('./helpers/gameHelpers')

describe('Particle Storm Game Logic', function() {
  let mockCanvas, mockContext

  beforeEach(function() {
    mockCanvas = {
      width: 800,
      height: 600,
      getBoundingClientRect: jasmine.createSpy('getBoundingClientRect').and.returnValue({
        left: 0, top: 0, width: 800, height: 600
      })
    }
    
    mockContext = GameTestUtils.createMockCanvasContext()
  })

  describe('Particle Physics', function() {
    it('should create particle with correct initial properties', function() {
      const particle = GameTestUtils.createTestParticle(100, 200)
      
      expect(particle.x).toBe(100)
      expect(particle.y).toBe(200)
      expect(particle.life).toBe(1.0)
      expect(particle.isAlive()).toBe(true)
      expect(typeof particle.vx).toBe('number')
      expect(typeof particle.vy).toBe('number')
    })

    it('should update particle position and life', function() {
      const particle = GameTestUtils.createTestParticle(100, 100)
      const initialX = particle.x
      const initialY = particle.y
      const initialLife = particle.life
      
      particle.update()
      
      expect(particle.x).not.toBe(initialX)
      expect(particle.y).not.toBe(initialY)
      expect(particle.life).toBeLessThan(initialLife)
    })

    it('should correctly calculate distance between points', function() {
      const particle = GameTestUtils.createTestParticle(0, 0)
      const distance = particle.distanceTo(3, 4)
      
      expect(distance).toBe(5) // 3-4-5 triangle
    })

    it('should detect when particle dies', function() {
      const particle = GameTestUtils.createTestParticle(100, 100)
      particle.life = 0.01
      particle.decay = 0.02
      
      expect(particle.isAlive()).toBe(true)
      
      particle.update()
      
      expect(particle.isAlive()).toBe(false)
    })
  })

  describe('Particle Rendering', function() {
    it('should call canvas drawing methods', function() {
      const particle = GameTestUtils.createTestParticle(50, 75)
      
      particle.draw(mockContext)
      
      expect(mockContext.beginPath).toHaveBeenCalled()
      expect(mockContext.arc).toHaveBeenCalledWith(50, 75, particle.radius, 0, Math.PI * 2)
      expect(mockContext.fill).toHaveBeenCalled()
    })

    it('should handle transparency based on life', function() {
      const particle = GameTestUtils.createTestParticle(100, 100)
      particle.life = 0.5
      
      spyOn(mockContext, 'save')
      spyOn(mockContext, 'restore')
      
      particle.draw(mockContext)
      
      expect(mockContext.save).toHaveBeenCalled()
      expect(mockContext.restore).toHaveBeenCalled()
    })
  })

  describe('Game Mechanics', function() {
    let particles

    beforeEach(function() {
      particles = []
      for (let i = 0; i < 5; i++) {
        particles.push(GameTestUtils.createTestParticle(
          Math.random() * 800,
          Math.random() * 600
        ))
      }
    })

    it('should filter out dead particles', function() {
      // Kill some particles
      particles[0].life = 0
      particles[2].life = -0.1
      
      const aliveParticles = particles.filter(p => p.isAlive())
      
      expect(aliveParticles.length).toBe(3)
    })

    it('should handle particle collision detection', function() {
      const particle = GameTestUtils.createTestParticle(100, 100)
      particle.radius = 10
      
      // Click near particle
      const clickDistance = particle.distanceTo(105, 105)
      const isHit = clickDistance < particle.radius + 10 // 10px tolerance
      
      expect(isHit).toBe(true)
      
      // Click far from particle
      const farDistance = particle.distanceTo(200, 200)
      const isFarHit = farDistance < particle.radius + 10
      
      expect(isFarHit).toBe(false)
    })

    it('should handle mouse attraction', function() {
      const particle = GameTestUtils.createTestParticle(100, 100)
      const mouseX = 110
      const mouseY = 110
      
      const dx = mouseX - particle.x
      const dy = mouseY - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < 100) {
        const force = (100 - distance) / 1000
        const oldVx = particle.vx
        const oldVy = particle.vy
        
        particle.vx += (dx / distance) * force
        particle.vy += (dy / distance) * force
        
        expect(particle.vx).not.toBe(oldVx)
        expect(particle.vy).not.toBe(oldVy)
      }
    })
  })

  describe('Performance and Memory', function() {
    it('should limit maximum number of particles', function() {
      const maxParticles = 100
      const particles = []
      
      // Try to create more than max
      for (let i = 0; i < 150; i++) {
        if (particles.length < maxParticles) {
          particles.push(GameTestUtils.createTestParticle(
            Math.random() * 800,
            Math.random() * 600
          ))
        }
      }
      
      expect(particles.length).toBe(maxParticles)
    })

    it('should clean up particles efficiently', function() {
      let particles = []
      
      // Create particles
      for (let i = 0; i < 20; i++) {
        particles.push(GameTestUtils.createTestParticle(
          Math.random() * 800,
          Math.random() * 600
        ))
      }
      
      // Kill half of them
      for (let i = 0; i < 10; i++) {
        particles[i].life = 0
      }
      
      // Filter alive particles (simulating game loop)
      const initialLength = particles.length
      particles = particles.filter(p => p.isAlive())
      
      expect(particles.length).toBeLessThan(initialLength)
      expect(particles.length).toBe(10)
    })
  })
}) 