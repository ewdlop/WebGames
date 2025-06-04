const { Builder, By, Key, until, WebDriver } = require('selenium-webdriver')
const assert = require('assert')

describe('WebGames Selenium Tests', function() {
  let driver
  const baseUrl = 'http://localhost:3001'
  
  // Increase timeout for Selenium tests
  this.timeout(30000)

  beforeEach(async function() {
    // Initialize WebDriver - defaults to Chrome
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(
        require('selenium-webdriver/chrome').Options()
          .addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage')
      )
      .build()
    
    // Set window size
    await driver.manage().window().setRect({ width: 1280, height: 720 })
    
    // Set timeouts
    await driver.manage().setTimeouts({
      implicit: 10000,
      pageLoad: 30000,
      script: 30000
    })
  })

  afterEach(async function() {
    if (driver) {
      await driver.quit()
    }
  })

  describe('Application Navigation', function() {
    it('should load home page successfully', async function() {
      await driver.get(baseUrl)
      
      const title = await driver.getTitle()
      assert(title.includes('WebGames') || title.includes('Vite'))
      
      const heading = await driver.findElement(By.css('h1'))
      const headingText = await heading.getText()
      assert(headingText.includes('WebGames'))
      
      const nav = await driver.findElement(By.css('nav'))
      assert(await nav.isDisplayed())
    })

    it('should navigate to games page', async function() {
      await driver.get(baseUrl)
      
      const gamesLink = await driver.findElement(By.css('nav a[href="/games"]'))
      await gamesLink.click()
      
      await driver.wait(until.urlContains('/games'), 5000)
      
      const gameCards = await driver.findElements(By.css('.game-card'))
      assert(gameCards.length >= 1, 'Should have at least one game card')
    })

    it('should handle browser back and forward', async function() {
      await driver.get(baseUrl)
      
      await driver.findElement(By.css('nav a[href="/games"]')).click()
      await driver.wait(until.urlContains('/games'), 5000)
      
      await driver.navigate().back()
      await driver.wait(until.urlIs(baseUrl + '/'), 5000)
      
      await driver.navigate().forward()
      await driver.wait(until.urlContains('/games'), 5000)
    })
  })

  describe('Particle Storm Game', function() {
    beforeEach(async function() {
      await driver.get(`${baseUrl}/games/play/particle-storm`)
      await driver.wait(until.elementLocated(By.css('canvas')), 10000)
    })

    it('should load particle storm game', async function() {
      const canvas = await driver.findElement(By.css('canvas'))
      assert(await canvas.isDisplayed())
      
      const heading = await driver.findElement(By.css('h1, h2, h3'))
      const headingText = await heading.getText()
      assert(headingText.includes('Particle Storm'))
    })

    it('should start and pause the game', async function() {
      const startBtn = await driver.findElement(By.xpath('//button[contains(text(), "Start")]'))
      await startBtn.click()
      
      await driver.sleep(1000)
      
      const status = await driver.findElement(By.xpath('//*[contains(text(), "Playing")]'))
      assert(await status.isDisplayed())
      
      const pauseBtn = await driver.findElement(By.xpath('//button[contains(text(), "Pause")]'))
      await pauseBtn.click()
      
      await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Paused")]')), 5000)
    })

    it('should handle canvas interactions', async function() {
      const startBtn = await driver.findElement(By.xpath('//button[contains(text(), "Start")]'))
      await startBtn.click()
      
      const canvas = await driver.findElement(By.css('canvas'))
      
      // Get canvas size and click in different positions
      const size = await canvas.getSize()
      const location = await canvas.getLocation()
      
      // Click on canvas using Actions
      const actions = driver.actions()
      await actions
        .move({ origin: canvas, x: size.width / 4, y: size.height / 4 })
        .click()
        .perform()
      
      await driver.sleep(500)
      
      await actions
        .move({ origin: canvas, x: size.width / 2, y: size.height / 2 })
        .click()
        .perform()
      
      await driver.sleep(500)
    })

    it('should reset the game', async function() {
      const startBtn = await driver.findElement(By.xpath('//button[contains(text(), "Start")]'))
      await startBtn.click()
      
      await driver.sleep(2000)
      
      const resetBtn = await driver.findElement(By.xpath('//button[contains(text(), "Reset")]'))
      await resetBtn.click()
      
      const score = await driver.findElement(By.xpath('//*[contains(text(), "Score: 0")]'))
      assert(await score.isDisplayed())
    })
  })

  describe('Cube Adventure Game', function() {
    beforeEach(async function() {
      await driver.get(`${baseUrl}/games/play/cube-adventure`)
      await driver.wait(until.elementLocated(By.css('canvas')), 10000)
    })

    it('should load 3D scene', async function() {
      const canvas = await driver.findElement(By.css('canvas'))
      assert(await canvas.isDisplayed())
      
      // Wait for potential loading state to complete
      await driver.sleep(3000)
      
      const heading = await driver.findElement(By.css('h1, h2, h3'))
      const headingText = await heading.getText()
      assert(headingText.includes('Cube Adventure'))
    })

    it('should handle 3D interactions', async function() {
      const startBtn = await driver.findElement(By.xpath('//button[contains(text(), "Start")]'))
      await startBtn.click()
      
      const canvas = await driver.findElement(By.css('canvas'))
      const actions = driver.actions()
      
      // Click on different areas of the 3D canvas
      await actions
        .move({ origin: canvas, x: 200, y: 200 })
        .click()
        .perform()
      
      await driver.sleep(500)
      
      await actions
        .move({ origin: canvas, x: 400, y: 300 })
        .click()
        .perform()
      
      await driver.sleep(500)
    })
  })

  describe('Cosmic Defender Game', function() {
    beforeEach(async function() {
      await driver.get(`${baseUrl}/games/play/cosmic-defender`)
      await driver.wait(until.elementLocated(By.css('canvas')), 10000)
    })

    it('should handle keyboard controls', async function() {
      const startBtn = await driver.findElement(By.xpath('//button[contains(text(), "Start")]'))
      await startBtn.click()
      
      await driver.sleep(1000)
      
      // Test WASD movement
      const body = await driver.findElement(By.css('body'))
      
      await body.sendKeys('w')
      await driver.sleep(100)
      
      await body.sendKeys('a')
      await driver.sleep(100)
      
      await body.sendKeys('s')
      await driver.sleep(100)
      
      await body.sendKeys('d')
      await driver.sleep(100)
      
      // Test spacebar for shooting
      await body.sendKeys(Key.SPACE)
      await driver.sleep(500)
    })

    it('should display space theme', async function() {
      const canvas = await driver.findElement(By.css('canvas'))
      assert(await canvas.isDisplayed())
      
      const heading = await driver.findElement(By.css('h1, h2, h3'))
      const headingText = await heading.getText()
      assert(headingText.includes('Cosmic Defender'))
      
      // Check for dark background (space theme)
      const bodyStyle = await driver.executeScript('return window.getComputedStyle(document.body).backgroundColor')
      assert(bodyStyle.includes('0, 0, 0') || bodyStyle === 'rgba(0, 0, 0, 0)')
    })
  })

  describe('Cross-Game Functionality', function() {
    const games = [
      'particle-storm',
      'cube-adventure',
      'cosmic-defender',
      'memory-match',
      'tower-defense'
    ]

    games.forEach(game => {
      it(`should load ${game} without errors`, async function() {
        await driver.get(`${baseUrl}/games/play/${game}`)
        
        // Check for game canvas or container
        const gameElement = await driver.findElement(By.css('canvas, .game-container, .game-area'))
        assert(await gameElement.isDisplayed())
        
        // Check for start button
        const startBtn = await driver.findElement(By.xpath('//button[contains(text(), "Start")]'))
        assert(await startBtn.isDisplayed())
        
        // Check for score display
        const score = await driver.findElement(By.xpath('//*[contains(text(), "Score")]'))
        assert(await score.isDisplayed())
      })
    })

    it('should navigate between all games', async function() {
      for (const game of games) {
        await driver.get(`${baseUrl}/games/play/${game}`)
        await driver.wait(until.elementLocated(By.css('canvas, .game-container, .game-area')), 10000)
        
        const currentUrl = await driver.getCurrentUrl()
        assert(currentUrl.includes(game))
        
        await driver.sleep(1000)
      }
    })
  })

  describe('Performance and Error Handling', function() {
    it('should load pages within acceptable time', async function() {
      const startTime = Date.now()
      await driver.get(baseUrl)
      const loadTime = Date.now() - startTime
      
      assert(loadTime < 10000, `Page load took ${loadTime}ms, should be under 10 seconds`)
    })

    it('should handle JavaScript errors gracefully', async function() {
      // Get browser logs
      await driver.get(`${baseUrl}/games/play/particle-storm`)
      await driver.wait(until.elementLocated(By.css('canvas')), 10000)
      
      const startBtn = await driver.findElement(By.xpath('//button[contains(text(), "Start")]'))
      await startBtn.click()
      
      await driver.sleep(2000)
      
      // Check if page is still functional
      const canvas = await driver.findElement(By.css('canvas'))
      assert(await canvas.isDisplayed())
      
      const pauseBtn = await driver.findElement(By.xpath('//button[contains(text(), "Pause")]'))
      assert(await pauseBtn.isDisplayed())
    })

    it('should handle window resize', async function() {
      await driver.get(`${baseUrl}/games/play/particle-storm`)
      await driver.wait(until.elementLocated(By.css('canvas')), 10000)
      
      // Resize to smaller window
      await driver.manage().window().setRect({ width: 800, height: 600 })
      await driver.sleep(1000)
      
      const canvas = await driver.findElement(By.css('canvas'))
      assert(await canvas.isDisplayed())
      
      // Resize to larger window
      await driver.manage().window().setRect({ width: 1920, height: 1080 })
      await driver.sleep(1000)
      
      assert(await canvas.isDisplayed())
    })
  })

  describe('Accessibility', function() {
    it('should have proper heading structure', async function() {
      await driver.get(baseUrl)
      
      const h1Elements = await driver.findElements(By.css('h1'))
      assert(h1Elements.length > 0, 'Should have at least one h1 element')
    })

    it('should have focusable elements', async function() {
      await driver.get(baseUrl)
      
      const focusableElements = await driver.findElements(By.css('button, a, input, select, textarea'))
      assert(focusableElements.length > 0, 'Should have focusable elements')
      
      // Test tab navigation
      await driver.actions().sendKeys(Key.TAB).perform()
      await driver.sleep(500)
    })

    it('should have alt text for images', async function() {
      await driver.get(`${baseUrl}/games`)
      
      const images = await driver.findElements(By.css('img'))
      
      for (const img of images) {
        const alt = await img.getAttribute('alt')
        assert(alt !== null, 'Images should have alt attributes')
      }
    })
  })
})

// Helper function to run tests
if (require.main === module) {
  console.log('Running Selenium tests...')
  console.log('Make sure the development server is running on http://localhost:3001')
} 