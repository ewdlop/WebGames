// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Game navigation commands
Cypress.Commands.add('visitGame', (gameName) => {
  cy.visit(`/games/play/${gameName}`)
})

Cypress.Commands.add('navigateToGames', () => {
  cy.visit('/games')
  cy.get('h1').should('contain', 'Games')
})

Cypress.Commands.add('navigateHome', () => {
  cy.visit('/')
  cy.get('h1').should('contain', 'WebGames')
})

// Game interaction commands
Cypress.Commands.add('playGameSequence', (gameName, actions = []) => {
  cy.visitGame(gameName)
  cy.waitForGameToLoad()
  cy.startGame()
  
  actions.forEach(action => {
    switch(action.type) {
      case 'click':
        cy.clickCanvas(action.x, action.y)
        break
      case 'move':
        cy.moveMouseOnCanvas(action.x, action.y)
        break
      case 'key':
        cy.pressKey(action.key)
        break
      case 'wait':
        cy.wait(action.duration)
        break
    }
  })
})

// Assertion commands
Cypress.Commands.add('shouldHaveWorkingCanvas', () => {
  cy.get('canvas').should('be.visible')
  cy.get('canvas').should('have.attr', 'width')
  cy.get('canvas').should('have.attr', 'height')
})

Cypress.Commands.add('shouldHaveGameUI', () => {
  cy.get('button').should('contain', 'Start')
  cy.contains('Score').should('be.visible')
})

// Performance and accessibility commands
Cypress.Commands.add('checkPageLoad', () => {
  cy.window().then((win) => {
    const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart
    expect(loadTime).to.be.lessThan(5000) // Page should load in less than 5 seconds
  })
})

Cypress.Commands.add('checkA11y', () => {
  cy.get('h1').should('exist') // Page should have a heading
  cy.get('button').each(($btn) => {
    cy.wrap($btn).should('have.attr', 'type').or('contain.text')
  })
})

// Screenshot and video commands
Cypress.Commands.add('takeGameScreenshot', (name) => {
  cy.screenshot(`game-${name}-${Date.now()}`)
})

Cypress.Commands.add('recordGameplay', (duration = 5000) => {
  cy.startGame()
  cy.wait(duration)
  cy.takeGameScreenshot('gameplay')
}) 