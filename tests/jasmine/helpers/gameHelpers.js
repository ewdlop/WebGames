// Game testing utilities for Jasmine tests

// Mock DOM environment for Node.js testing
if (typeof window === 'undefined') {
  global.window = {
    requestAnimationFrame: (callback) => setTimeout(callback, 16),
    cancelAnimationFrame: (id) => clearTimeout(id),
    addEventListener: () => {},
    removeEventListener: () => {},
    location: { href: 'http://localhost:3001' }
  }
  
  global.document = {
    createElement: (tag) => ({
      tagName: tag.toUpperCase(),
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false
      },
      addEventListener: () => {},
      removeEventListener: () => {},
      getAttribute: () => null,
      setAttribute: () => {},
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 800, height: 600 })
    }),
    querySelector: () => null,
    querySelectorAll: () => [],
    body: {
      appendChild: () => {},
      removeChild: () => {}
    }
  }
  
  global.navigator = {
    userAgent: 'Node.js'
  }
}

// Game testing utilities
const GameTestUtils = {
  // Simulate mouse events
  simulateMouseEvent(element, eventType, x = 0, y = 0) {
    const event = {
      type: eventType,
      clientX: x,
      clientY: y,
      preventDefault: () => {},
      stopPropagation: () => {}
    }
    
    if (element && element.onclick && eventType === 'click') {
      element.onclick(event)
    }
    if (element && element.onmousemove && eventType === 'mousemove') {
      element.onmousemove(event)
    }
    
    return event
  },

  // Simulate keyboard events
  simulateKeyEvent(element, eventType, keyCode, key) {
    const event = {
      type: eventType,
      keyCode: keyCode,
      key: key,
      preventDefault: () => {},
      stopPropagation: () => {}
    }
    
    if (element && element.onkeydown && eventType === 'keydown') {
      element.onkeydown(event)
    }
    if (element && element.onkeyup && eventType === 'keyup') {
      element.onkeyup(event)
    }
    
    return event
  },

  // Wait for async operations
  async waitFor(conditionFn, timeout = 1000) {
    const startTime = Date.now()
    
    while (Date.now() - startTime < timeout) {
      if (conditionFn()) {
        return true
      }
      await new Promise(resolve => setTimeout(resolve, 10))
    }
    
    return false
  },

  // Create mock canvas context
  createMockCanvasContext() {
    return {
      fillRect: jasmine.createSpy('fillRect'),
      clearRect: jasmine.createSpy('clearRect'),
      beginPath: jasmine.createSpy('beginPath'),
      moveTo: jasmine.createSpy('moveTo'),
      lineTo: jasmine.createSpy('lineTo'),
      arc: jasmine.createSpy('arc'),
      fill: jasmine.createSpy('fill'),
      stroke: jasmine.createSpy('stroke'),
      save: jasmine.createSpy('save'),
      restore: jasmine.createSpy('restore'),
      translate: jasmine.createSpy('translate'),
      rotate: jasmine.createSpy('rotate'),
      scale: jasmine.createSpy('scale'),
      fillStyle: '#000000',
      strokeStyle: '#000000',
      globalAlpha: 1,
      shadowBlur: 0,
      shadowColor: 'transparent'
    }
  },

  // Particle test utilities
  createTestParticle(x = 0, y = 0) {
    return {
      x: x,
      y: y,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
      radius: 5,
      color: '#ff0000',
      life: 1.0,
      decay: 0.01,
      update() {
        this.x += this.vx
        this.y += this.vy
        this.life -= this.decay
      },
      draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      },
      isAlive() {
        return this.life > 0
      },
      distanceTo(x, y) {
        const dx = this.x - x
        const dy = this.y - y
        return Math.sqrt(dx * dx + dy * dy)
      }
    }
  }
}

// Make utilities available globally for Jasmine tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameTestUtils
} else {
  window.GameTestUtils = GameTestUtils
} 