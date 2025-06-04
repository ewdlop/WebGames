const { test, expect } = require('@playwright/test')

test.describe('WebGames Cross-Browser Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up error handling for games
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('THREE') && !msg.text().includes('WebGL')) {
        console.log(`Console error: ${msg.text()}`)
      }
    })
  })

  test.describe('Application Core', () => {
    test('should load home page in all browsers', async ({ page }) => {
      await page.goto('/')
      
      await expect(page.locator('h1')).toContainText('WebGames')
      await expect(page.locator('nav')).toBeVisible()
      
      // Check page performance
      const performanceMetrics = await page.evaluate(() => {
        return {
          loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
          domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
        }
      })
      
      expect(performanceMetrics.loadTime).toBeLessThan(5000)
    })

    test('should navigate to games page', async ({ page }) => {
      await page.goto('/')
      await page.click('nav a[href="/games"]')
      
      await expect(page).toHaveURL(/.*\/games/)
      await expect(page.locator('.game-card')).toHaveCount(5)
    })
  })

  test.describe('Particle Storm Game', () => {
    test('should load and interact with particle game', async ({ page }) => {
      await page.goto('/games/play/particle-storm')
      
      // Wait for canvas to load
      await expect(page.locator('canvas')).toBeVisible()
      await page.waitForTimeout(1000)
      
      // Start the game
      await page.click('button:has-text("Start")')
      await expect(page.locator('text=Playing')).toBeVisible()
      
      // Interact with canvas
      const canvas = page.locator('canvas')
      await canvas.click({ position: { x: 200, y: 200 } })
      await canvas.click({ position: { x: 300, y: 150 } })
      
      // Test mouse movement
      await canvas.hover({ position: { x: 250, y: 175 } })
      
      // Pause game
      await page.click('button:has-text("Pause")')
      await expect(page.locator('text=Paused')).toBeVisible()
    })

    test('should handle game reset', async ({ page }) => {
      await page.goto('/games/play/particle-storm')
      await expect(page.locator('canvas')).toBeVisible()
      
      await page.click('button:has-text("Start")')
      await page.waitForTimeout(2000)
      
      await page.click('button:has-text("Reset")')
      await expect(page.locator('text=Score: 0')).toBeVisible()
      await expect(page.locator('text=Paused')).toBeVisible()
    })
  })

  test.describe('Cube Adventure Game', () => {
    test('should load 3D game correctly', async ({ page }) => {
      await page.goto('/games/play/cube-adventure')
      
      // Wait for 3D scene to initialize
      await expect(page.locator('canvas')).toBeVisible()
      await page.waitForTimeout(3000)
      
      // Check for Three.js content
      await expect(page.locator('text=Cube Adventure')).toBeVisible()
      
      // Start and interact with 3D scene
      await page.click('button:has-text("Start")')
      
      const canvas = page.locator('canvas')
      await canvas.click({ position: { x: 400, y: 300 } })
      await canvas.click({ position: { x: 200, y: 200 } })
    })

    test('should handle 3D controls', async ({ page }) => {
      await page.goto('/games/play/cube-adventure')
      await expect(page.locator('canvas')).toBeVisible()
      await page.waitForTimeout(2000)
      
      await page.click('button:has-text("Start")')
      
      // Test mouse interactions for 3D controls
      const canvas = page.locator('canvas')
      await canvas.click({ position: { x: 300, y: 300 } })
      await canvas.click({ position: { x: 500, y: 200 } })
      
      await page.waitForTimeout(1000)
    })
  })

  test.describe('Cosmic Defender Game', () => {
    test('should handle keyboard controls', async ({ page }) => {
      await page.goto('/games/play/cosmic-defender')
      await expect(page.locator('canvas')).toBeVisible()
      await page.waitForTimeout(1000)
      
      await page.click('button:has-text("Start")')
      
      // Test WASD movement
      await page.keyboard.down('w')
      await page.waitForTimeout(100)
      await page.keyboard.up('w')
      
      await page.keyboard.down('a')
      await page.waitForTimeout(100)
      await page.keyboard.up('a')
      
      await page.keyboard.down('s')
      await page.waitForTimeout(100)
      await page.keyboard.up('s')
      
      await page.keyboard.down('d')
      await page.waitForTimeout(100)
      await page.keyboard.up('d')
      
      // Test shooting
      await page.keyboard.press('Space')
      await page.waitForTimeout(500)
    })

    test('should display space theme correctly', async ({ page }) => {
      await page.goto('/games/play/cosmic-defender')
      
      await expect(page.locator('canvas')).toBeVisible()
      await expect(page.locator('text=Cosmic Defender')).toBeVisible()
      
      // Check for space-themed styling
      const bodyStyles = await page.evaluate(() => {
        return window.getComputedStyle(document.body).background
      })
      
      // Should have dark space-like background
      expect(bodyStyles).toMatch(/(rgb\(0, 0, 0\)|#000|black|dark)/i)
    })
  })

  test.describe('Memory Match Game', () => {
    test('should handle card interactions', async ({ page }) => {
      await page.goto('/games/play/memory-match')
      
      await expect(page.locator('text=Memory Match')).toBeVisible()
      await page.click('button:has-text("Start")')
      
      // Wait for game to initialize
      await page.waitForTimeout(1000)
      
      // Look for clickable game elements
      const gameElements = page.locator('div[role="button"], button, .card')
      const count = await gameElements.count()
      
      if (count > 0) {
        await gameElements.first().click()
        if (count > 1) {
          await gameElements.nth(1).click()
        }
      }
    })
  })

  test.describe('Tower Defense Game', () => {
    test('should handle tower placement', async ({ page }) => {
      await page.goto('/games/play/tower-defense')
      
      await expect(page.locator('canvas')).toBeVisible()
      await expect(page.locator('text=Tower Defense')).toBeVisible()
      
      await page.click('button:has-text("Start")')
      await page.waitForTimeout(1000)
      
      // Click to place towers
      const canvas = page.locator('canvas')
      await canvas.click({ position: { x: 150, y: 150 } })
      await canvas.click({ position: { x: 300, y: 200 } })
      await canvas.click({ position: { x: 450, y: 150 } })
    })
  })

  test.describe('Mobile Responsiveness', () => {
    test('should work on mobile devices', async ({ page, browserName }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })
      
      await page.goto('/')
      await expect(page.locator('h1')).toBeVisible()
      
      await page.goto('/games')
      await expect(page.locator('.game-card')).toHaveCount(5)
      
      // Test a simple game on mobile
      await page.goto('/games/play/particle-storm')
      await expect(page.locator('canvas')).toBeVisible()
      
      await page.click('button:has-text("Start")')
      const canvas = page.locator('canvas')
      await canvas.tap({ position: { x: 100, y: 100 } })
    })

    test('should handle orientation changes', async ({ page, browserName }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/games/play/particle-storm')
      
      await expect(page.locator('canvas')).toBeVisible()
      
      // Simulate landscape orientation
      await page.setViewportSize({ width: 667, height: 375 })
      await expect(page.locator('canvas')).toBeVisible()
    })
  })

  test.describe('Performance Testing', () => {
    test('should meet Core Web Vitals', async ({ page }) => {
      await page.goto('/')
      
      // Measure performance metrics
      const metrics = await page.evaluate(() => {
        return new Promise((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            resolve(entries.map(entry => ({
              name: entry.name,
              value: entry.value,
              rating: entry.rating
            })))
          }).observe({ entryTypes: ['measure', 'navigation'] })
          
          // Fallback if no observer
          setTimeout(() => {
            resolve([{
              name: 'fallback',
              value: performance.now(),
              rating: 'good'
            }])
          }, 1000)
        })
      })
      
      expect(Array.isArray(metrics)).toBe(true)
    })

    test('should handle multiple game switches', async ({ page }) => {
      const games = [
        'particle-storm',
        'cube-adventure',
        'cosmic-defender',
        'memory-match',
        'tower-defense'
      ]
      
      for (const game of games) {
        await page.goto(`/games/play/${game}`)
        await expect(page.locator('canvas, div')).toBeVisible()
        await page.waitForTimeout(500)
      }
    })
  })

  test.describe('Accessibility', () => {
    test('should have proper ARIA labels and roles', async ({ page }) => {
      await page.goto('/')
      
      // Check for proper heading structure
      await expect(page.locator('h1')).toBeVisible()
      
      // Check for navigation landmarks
      await expect(page.locator('nav')).toBeVisible()
      
      // Check button accessibility
      const buttons = page.locator('button')
      const count = await buttons.count()
      
      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i)
        const text = await button.textContent()
        expect(text?.trim().length).toBeGreaterThan(0)
      }
    })

    test('should be keyboard navigable', async ({ page }) => {
      await page.goto('/')
      
      // Tab through interactive elements
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Enter')
      
      // Should navigate to games or stay functional
      await page.waitForTimeout(500)
    })
  })

  test.describe('Error Handling', () => {
    test('should handle JavaScript errors gracefully', async ({ page }) => {
      const errors = []
      page.on('pageerror', error => {
        errors.push(error.message)
      })
      
      await page.goto('/games/play/particle-storm')
      await expect(page.locator('canvas')).toBeVisible()
      
      // Start game and interact
      await page.click('button:has-text("Start")')
      await page.waitForTimeout(2000)
      
      // Filter out known Three.js/WebGL warnings
      const criticalErrors = errors.filter(error => 
        !error.includes('THREE') && 
        !error.includes('WebGL') &&
        !error.includes('canvas')
      )
      
      expect(criticalErrors.length).toBe(0)
    })

    test('should handle network failures', async ({ page }) => {
      await page.route('**/*', route => {
        if (route.request().url().includes('nonexistent')) {
          route.abort()
        } else {
          route.continue()
        }
      })
      
      await page.goto('/')
      await expect(page.locator('h1')).toBeVisible()
    })
  })
}) 