// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Custom commands for game testing
Cypress.Commands.add('waitForGameToLoad', (gameSelector = 'canvas') => {
  cy.get(gameSelector, { timeout: 10000 }).should('be.visible')
  cy.wait(1000) // Allow time for game initialization
})

Cypress.Commands.add('startGame', () => {
  cy.get('[data-testid="start-btn"], button:contains("Start")').click()
  cy.wait(500) // Allow game to start
})

Cypress.Commands.add('pauseGame', () => {
  cy.get('[data-testid="pause-btn"], button:contains("Pause")').click()
})

Cypress.Commands.add('resetGame', () => {
  cy.get('[data-testid="reset-btn"], button:contains("Reset")').click()
})

Cypress.Commands.add('clickCanvas', (x = 200, y = 200) => {
  cy.get('canvas').click(x, y)
})

Cypress.Commands.add('moveMouseOnCanvas', (x = 200, y = 200) => {
  cy.get('canvas').trigger('mousemove', { clientX: x, clientY: y })
})

Cypress.Commands.add('pressKey', (key) => {
  cy.get('body').trigger('keydown', { key })
})

Cypress.Commands.add('releaseKey', (key) => {
  cy.get('body').trigger('keyup', { key })
})

Cypress.Commands.add('checkScore', (expectedScore) => {
  cy.get('[data-testid="score"]').should('contain', expectedScore.toString())
})

Cypress.Commands.add('checkGameStatus', (status) => {
  cy.get('[data-testid="status"]').should('contain', status)
})

// Handle uncaught exceptions (common in games)
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // due to uncaught exceptions from third-party libraries like Three.js
  if (err.message.includes('THREE') || 
      err.message.includes('WebGL') || 
      err.message.includes('canvas')) {
    return false
  }
  return true
}) 