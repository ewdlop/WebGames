#!/usr/bin/env node

const { execSync, spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

class TestRunner {
  constructor() {
    this.results = {
      jest: { passed: false, output: '', error: '' },
      jasmine: { passed: false, output: '', error: '' },
      cypress: { passed: false, output: '', error: '' },
      playwright: { passed: false, output: '', error: '' },
      selenium: { passed: false, output: '', error: '' }
    }
    this.startTime = Date.now()
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString()
    const colors = {
      info: '\x1b[36m',    // cyan
      success: '\x1b[32m', // green
      error: '\x1b[31m',   // red
      warning: '\x1b[33m', // yellow
      reset: '\x1b[0m'
    }
    
    console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`)
  }

  async checkPrerequisites() {
    this.log('Checking prerequisites...', 'info')
    
    try {
      // Check Node.js version
      const nodeVersion = process.version
      this.log(`Node.js version: ${nodeVersion}`, 'info')
      
      // Check if package.json exists
      if (!fs.existsSync('package.json')) {
        throw new Error('package.json not found')
      }
      
      // Check if development server is running
      try {
        const response = await fetch('http://localhost:3001')
        this.log('Development server is running on localhost:3001', 'success')
      } catch (error) {
        this.log('Development server is not running. Please start it with "npm run dev"', 'warning')
        return false
      }
      
      return true
    } catch (error) {
      this.log(`Prerequisites check failed: ${error.message}`, 'error')
      return false
    }
  }

  async installDependencies() {
    this.log('Installing test dependencies...', 'info')
    
    try {
      execSync('npm install', { 
        stdio: 'inherit',
        timeout: 120000 // 2 minutes timeout
      })
      this.log('Dependencies installed successfully', 'success')
      return true
    } catch (error) {
      this.log(`Failed to install dependencies: ${error.message}`, 'error')
      return false
    }
  }

  async runCommand(command, framework) {
    return new Promise((resolve) => {
      this.log(`Running ${framework} tests...`, 'info')
      
      const child = spawn('npm', ['run', command], {
        stdio: 'pipe',
        shell: true
      })
      
      let stdout = ''
      let stderr = ''
      
      child.stdout.on('data', (data) => {
        stdout += data.toString()
      })
      
      child.stderr.on('data', (data) => {
        stderr += data.toString()
      })
      
      child.on('close', (code) => {
        this.results[framework] = {
          passed: code === 0,
          output: stdout,
          error: stderr
        }
        
        if (code === 0) {
          this.log(`${framework} tests passed`, 'success')
        } else {
          this.log(`${framework} tests failed with code ${code}`, 'error')
        }
        
        resolve(code === 0)
      })
      
      // Timeout after 5 minutes per test suite
      setTimeout(() => {
        child.kill('SIGKILL')
        this.log(`${framework} tests timed out`, 'error')
        resolve(false)
      }, 300000)
    })
  }

  async runJestTests() {
    return await this.runCommand('test', 'jest')
  }

  async runJasmineTests() {
    return await this.runCommand('test:jasmine', 'jasmine')
  }

  async runCypressTests() {
    return await this.runCommand('test:cypress:run', 'cypress')
  }

  async runPlaywrightTests() {
    return await this.runCommand('test:playwright', 'playwright')
  }

  async runSeleniumTests() {
    return await this.runCommand('test:selenium', 'selenium')
  }

  generateReport() {
    const endTime = Date.now()
    const duration = (endTime - this.startTime) / 1000
    
    this.log('\n=== TEST RESULTS SUMMARY ===', 'info')
    this.log(`Total duration: ${duration.toFixed(2)} seconds`, 'info')
    
    let totalPassed = 0
    let totalTests = 0
    
    Object.entries(this.results).forEach(([framework, result]) => {
      totalTests++
      if (result.passed) {
        totalPassed++
        this.log(`✓ ${framework.toUpperCase()}: PASSED`, 'success')
      } else {
        this.log(`✗ ${framework.toUpperCase()}: FAILED`, 'error')
        if (result.error) {
          this.log(`  Error: ${result.error.substring(0, 200)}...`, 'error')
        }
      }
    })
    
    this.log(`\nPassed: ${totalPassed}/${totalTests}`, totalPassed === totalTests ? 'success' : 'warning')
    
    // Generate detailed report file
    const reportPath = path.join(process.cwd(), 'test-results.json')
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      duration: duration,
      summary: {
        total: totalTests,
        passed: totalPassed,
        failed: totalTests - totalPassed
      },
      results: this.results
    }, null, 2))
    
    this.log(`Detailed report saved to: ${reportPath}`, 'info')
    
    return totalPassed === totalTests
  }

  async runAllTests() {
    this.log('Starting WebGames Test Suite', 'info')
    
    // Check prerequisites
    const prereqsOk = await this.checkPrerequisites()
    if (!prereqsOk) {
      this.log('Prerequisites check failed. Aborting tests.', 'error')
      return false
    }
    
    // Install dependencies
    const depsOk = await this.installDependencies()
    if (!depsOk) {
      this.log('Failed to install dependencies. Aborting tests.', 'error')
      return false
    }
    
    // Run each test suite
    await this.runJestTests()
    await this.runJasmineTests()
    await this.runCypressTests()
    await this.runPlaywrightTests()
    await this.runSeleniumTests()
    
    // Generate final report
    const allPassed = this.generateReport()
    
    if (allPassed) {
      this.log('All tests passed! 🎉', 'success')
      process.exit(0)
    } else {
      this.log('Some tests failed. Check the report for details.', 'error')
      process.exit(1)
    }
  }

  async runSingleFramework(framework) {
    this.log(`Running ${framework} tests only`, 'info')
    
    const prereqsOk = await this.checkPrerequisites()
    if (!prereqsOk) {
      return false
    }
    
    let result = false
    switch (framework.toLowerCase()) {
      case 'jest':
        result = await this.runJestTests()
        break
      case 'jasmine':
        result = await this.runJasmineTests()
        break
      case 'cypress':
        result = await this.runCypressTests()
        break
      case 'playwright':
        result = await this.runPlaywrightTests()
        break
      case 'selenium':
        result = await this.runSeleniumTests()
        break
      default:
        this.log(`Unknown framework: ${framework}`, 'error')
        return false
    }
    
    if (result) {
      this.log(`${framework} tests completed successfully`, 'success')
    } else {
      this.log(`${framework} tests failed`, 'error')
    }
    
    return result
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2)
  const runner = new TestRunner()
  
  if (args.length === 0) {
    // Run all tests
    runner.runAllTests()
  } else if (args.length === 1) {
    // Run specific framework
    runner.runSingleFramework(args[0])
  } else {
    console.log('Usage:')
    console.log('  node test-runner.js              # Run all tests')
    console.log('  node test-runner.js jest         # Run Jest tests only')
    console.log('  node test-runner.js jasmine      # Run Jasmine tests only')
    console.log('  node test-runner.js cypress      # Run Cypress tests only')
    console.log('  node test-runner.js playwright   # Run Playwright tests only')
    console.log('  node test-runner.js selenium     # Run Selenium tests only')
    process.exit(1)
  }
}

module.exports = TestRunner 