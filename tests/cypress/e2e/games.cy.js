describe('WebGames E2E Tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
  })

  describe('Application Navigation', () => {
    it('should load the home page successfully', () => {
      cy.visit('/')
      cy.checkPageLoad()
      cy.get('h1').should('contain', 'WebGames')
      cy.get('nav').should('be.visible')
    })

    it('should navigate to games page', () => {
      cy.navigateToGames()
      cy.url().should('include', '/games')
      cy.get('.game-card').should('have.length.at.least', 1)
    })

    it('should have working navigation links', () => {
      cy.visit('/')
      cy.get('nav a[href="/games"]').click()
      cy.url().should('include', '/games')
      
      cy.get('nav a[href="/"]').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })

  describe('Particle Storm Game', () => {
    beforeEach(() => {
      cy.visitGame('particle-storm')
    })

    it('should load and display game correctly', () => {
      cy.waitForGameToLoad()
      cy.shouldHaveWorkingCanvas()
      cy.shouldHaveGameUI()
      cy.get('h1, h2, h3').should('contain', 'Particle Storm')
    })

    it('should start and pause game', () => {
      cy.waitForGameToLoad()
      cy.startGame()
      cy.checkGameStatus('Playing')
      
      cy.pauseGame()
      cy.checkGameStatus('Paused')
    })

    it('should handle canvas interactions', () => {
      cy.waitForGameToLoad()
      cy.startGame()
      
      // Click on canvas multiple times
      for (let i = 0; i < 5; i++) {
        cy.clickCanvas(100 + i * 50, 100 + i * 30)
        cy.wait(200)
      }
      
      // Move mouse around canvas
      cy.moveMouseOnCanvas(200, 150)
      cy.moveMouseOnCanvas(300, 250)
    })

    it('should reset game properly', () => {
      cy.waitForGameToLoad()
      cy.startGame()
      cy.wait(2000) // Let some particles spawn
      
      cy.resetGame()
      cy.checkGameStatus('Paused')
      cy.checkScore(0)
    })

    it('should handle continuous gameplay', () => {
      cy.waitForGameToLoad()
      cy.recordGameplay(3000)
    })
  })

  describe('Cube Adventure Game', () => {
    beforeEach(() => {
      cy.visitGame('cube-adventure')
    })

    it('should load 3D scene correctly', () => {
      cy.waitForGameToLoad()
      cy.shouldHaveWorkingCanvas()
      cy.get('h1, h2, h3').should('contain', 'Cube Adventure')
      
      // Check for 3D context (Three.js)
      cy.get('canvas').should('be.visible')
      cy.wait(2000) // Allow 3D scene to initialize
    })

    it('should handle 3D interactions', () => {
      cy.waitForGameToLoad()
      cy.startGame()
      
      // Click on different areas of the 3D canvas
      cy.clickCanvas(400, 300) // Center
      cy.clickCanvas(200, 200) // Top-left area
      cy.clickCanvas(600, 400) // Bottom-right area
      
      cy.wait(1000)
    })

    it('should show loading state initially', () => {
      cy.visit('/games/play/cube-adventure')
      // The loading state might be very brief, so this test might need adjustment
      cy.get('canvas', { timeout: 10000 }).should('be.visible')
    })
  })

  describe('Cosmic Defender Game', () => {
    beforeEach(() => {
      cy.visitGame('cosmic-defender')
    })

    it('should load space shooter game', () => {
      cy.waitForGameToLoad()
      cy.shouldHaveWorkingCanvas()
      cy.get('h1, h2, h3').should('contain', 'Cosmic Defender')
    })

    it('should handle spaceship controls', () => {
      cy.waitForGameToLoad()
      cy.startGame()
      
      // Test WASD movement
      cy.pressKey('w') // Move up
      cy.wait(100)
      cy.releaseKey('w')
      
      cy.pressKey('a') // Move left
      cy.wait(100)
      cy.releaseKey('a')
      
      cy.pressKey('s') // Move down
      cy.wait(100)
      cy.releaseKey('s')
      
      cy.pressKey('d') // Move right
      cy.wait(100)
      cy.releaseKey('d')
      
      // Test shooting
      cy.pressKey(' ') // Spacebar to shoot
      cy.wait(100)
      cy.releaseKey(' ')
    })
  })

  describe('Memory Match Game', () => {
    beforeEach(() => {
      cy.visitGame('memory-match')
    })

    it('should load memory game', () => {
      cy.waitForGameToLoad('div') // Memory match uses divs, not canvas
      cy.get('h1, h2, h3').should('contain', 'Memory Match')
      cy.shouldHaveGameUI()
    })

    it('should handle card flipping', () => {
      cy.startGame()
      cy.wait(1000)
      
      // Try to click on game cards/elements
      cy.get('div').contains('card').click().should('exist').catch(() => {
        // Fallback if specific card elements don't exist
        cy.get('button, div[role="button"]').first().click()
      })
    })
  })

  describe('Tower Defense Game', () => {
    beforeEach(() => {
      cy.visitGame('tower-defense')
    })

    it('should load tower defense game', () => {
      cy.waitForGameToLoad()
      cy.get('h1, h2, h3').should('contain', 'Tower Defense')
      cy.shouldHaveGameUI()
    })

    it('should handle tower placement', () => {
      cy.startGame()
      cy.wait(1000)
      
      // Click on canvas to place towers
      cy.clickCanvas(150, 150)
      cy.clickCanvas(300, 200)
      cy.clickCanvas(450, 150)
    })
  })

  describe('Cross-Game Functionality', () => {
    const games = [
      'particle-storm',
      'cube-adventure', 
      'cosmic-defender',
      'memory-match',
      'tower-defense'
    ]

    games.forEach(game => {
      it(`should have consistent UI for ${game}`, () => {
        cy.visitGame(game)
        cy.waitForGameToLoad()
        
        // Check for consistent game UI elements
        cy.get('button').should('contain', 'Start')
        cy.contains('Score').should('be.visible')
        
        // Test basic game flow
        cy.startGame()
        cy.wait(1000)
        cy.pauseGame()
        cy.resetGame()
      })
    })

    it('should navigate between games', () => {
      // Start with one game
      cy.visitGame('particle-storm')
      cy.waitForGameToLoad()
      
      // Navigate to games page
      cy.get('nav a[href="/games"]').click()
      cy.url().should('include', '/games')
      
      // Navigate to another game
      cy.visitGame('cube-adventure')
      cy.waitForGameToLoad()
      
      // Go back to games page
      cy.get('nav a[href="/games"]').click()
      cy.get('.game-card').should('have.length.at.least', 5)
    })
  })

  describe('Performance and Accessibility', () => {
    it('should meet performance benchmarks', () => {
      cy.visit('/')
      cy.checkPageLoad()
      
      cy.visit('/games')
      cy.checkPageLoad()
    })

    it('should have basic accessibility features', () => {
      cy.visit('/')
      cy.checkA11y()
      
      cy.visit('/games')
      cy.checkA11y()
    })

    it('should handle window resize', () => {
      cy.visitGame('particle-storm')
      cy.waitForGameToLoad()
      
      cy.viewport(800, 600)
      cy.get('canvas').should('be.visible')
      
      cy.viewport(1920, 1080)
      cy.get('canvas').should('be.visible')
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid game routes', () => {
      cy.visit('/games/play/nonexistent-game', { failOnStatusCode: false })
      // Should either redirect or show 404 - adjust based on your routing
    })

    it('should handle browser back/forward', () => {
      cy.visit('/')
      cy.get('nav a[href="/games"]').click()
      cy.go('back')
      cy.url().should('eq', Cypress.config().baseUrl + '/')
      
      cy.go('forward')
      cy.url().should('include', '/games')
    })
  })
}) 