# WebGames Testing Suite

This project includes comprehensive testing using multiple frameworks to ensure quality, compatibility, and performance across different browsers and environments.

## Testing Frameworks

### 1. Jest (Unit Testing)
**Purpose**: Unit testing React components, hooks, and utility functions
**Location**: `tests/jest/`
**Configuration**: `jest.config.js`, `babel.config.js`

#### Features:
- React Testing Library integration
- Component rendering tests
- User interaction simulation
- Mock implementations for Three.js and Canvas APIs
- Code coverage reports

#### Run Jest Tests:
```bash
npm test                    # Run all tests
npm run test:watch         # Run in watch mode
npm run test:coverage      # Generate coverage report
```

#### Example Test Structure:
```javascript
// tests/jest/components/ParticleStorm.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import ParticleStorm from '../../../src/components/games/ParticleStorm'

test('renders game without crashing', () => {
  render(<ParticleStorm />)
  expect(screen.getByRole('heading')).toBeInTheDocument()
})
```

### 2. Jasmine (Behavior-Driven Testing)
**Purpose**: Game logic testing, physics calculations, and performance testing
**Location**: `tests/jasmine/`
**Configuration**: `spec/support/jasmine.json`

#### Features:
- Game mechanics testing
- Particle physics validation
- Performance benchmarking
- Memory management testing
- Cross-browser compatibility

#### Run Jasmine Tests:
```bash
npm run test:jasmine
```

#### Example Test Structure:
```javascript
// tests/jasmine/particleStormSpec.js
describe('Particle Physics', function() {
  it('should update particle position correctly', function() {
    const particle = GameTestUtils.createTestParticle(100, 100)
    particle.update()
    expect(particle.life).toBeLessThan(1.0)
  })
})
```

### 3. Cypress (End-to-End Testing)
**Purpose**: Full user journey testing, integration testing, and UI testing
**Location**: `tests/cypress/`
**Configuration**: `cypress.config.js`

#### Features:
- Real browser testing
- User interaction simulation
- Network request interception
- Screenshot and video recording
- Custom commands for game testing

#### Run Cypress Tests:
```bash
npm run test:cypress        # Open Cypress GUI
npm run test:cypress:run    # Run headlessly
```

#### Custom Commands:
```javascript
cy.visitGame('particle-storm')
cy.waitForGameToLoad()
cy.startGame()
cy.clickCanvas(200, 200)
cy.checkScore(50)
```

### 4. Playwright (Cross-Browser E2E Testing)
**Purpose**: Multi-browser testing, mobile testing, and performance testing
**Location**: `tests/playwright/`
**Configuration**: `playwright.config.js`

#### Features:
- Chrome, Firefox, Safari testing
- Mobile device simulation
- Performance metrics collection
- Accessibility testing
- Network condition simulation

#### Run Playwright Tests:
```bash
npm run test:playwright     # Run all browsers
npm run test:playwright:ui  # Open UI mode
```

#### Browser Coverage:
- Desktop Chrome, Firefox, Safari
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

### 5. Selenium WebDriver (Automated Browser Testing)
**Purpose**: Legacy browser support, automated testing, and CI/CD integration
**Location**: `tests/selenium/`
**Configuration**: Embedded in test files

#### Features:
- WebDriver automation
- Cross-browser compatibility
- Headless testing support
- Performance monitoring
- Accessibility validation

#### Run Selenium Tests:
```bash
npm run test:selenium
```

## Test Categories

### Unit Tests (Jest)
- **Component Rendering**: Verify components render without errors
- **Props Testing**: Test component behavior with different props
- **Event Handling**: Test user interactions (clicks, keyboard input)
- **State Management**: Test state changes and updates
- **Hook Testing**: Test custom React hooks

### Integration Tests (Jasmine)
- **Game Logic**: Test game mechanics and rules
- **Physics Systems**: Validate particle physics and collisions
- **Performance**: Test frame rates and memory usage
- **Cross-Component**: Test component interactions

### End-to-End Tests (Cypress & Playwright)
- **User Journeys**: Complete user workflows
- **Game Interactions**: Full game play testing
- **Navigation**: Route changes and page transitions
- **Form Submissions**: User input validation
- **Error Handling**: Error state testing

### Browser Tests (Selenium)
- **Cross-Browser**: Chrome, Firefox, Safari compatibility
- **Responsive Design**: Mobile and desktop layouts
- **Accessibility**: WCAG compliance testing
- **Performance**: Load times and resource usage

## Game-Specific Tests

### Particle Storm
- Canvas rendering
- Mouse interactions
- Particle physics
- Performance optimization

### Cube Adventure
- Three.js scene loading
- 3D interactions
- WebGL compatibility
- Memory management

### Cosmic Defender
- Keyboard controls (WASD + Space)
- Game physics
- Collision detection
- Space theme rendering

### Memory Match
- Card flipping logic
- Game state management
- Timer functionality
- Score calculation

### Tower Defense
- Tower placement
- Enemy pathfinding
- Resource management
- Strategy validation

## Test Data and Fixtures

### Mock Data
```javascript
// tests/cypress/fixtures/gameData.json
{
  "scores": [100, 250, 500],
  "players": ["Player1", "Player2"],
  "settings": {
    "difficulty": "normal",
    "sound": true
  }
}
```

### Test Utilities
```javascript
// tests/jasmine/helpers/gameHelpers.js
const GameTestUtils = {
  createTestParticle(x, y) { /* ... */ },
  simulateMouseEvent(element, type, x, y) { /* ... */ },
  waitFor(condition, timeout) { /* ... */ }
}
```

## Running All Tests

### Sequential Run
```bash
npm run test:all
```

### Individual Frameworks
```bash
npm test              # Jest
npm run test:jasmine  # Jasmine
npm run test:cypress:run  # Cypress
npm run test:playwright   # Playwright
npm run test:selenium     # Selenium
```

## Continuous Integration

### Prerequisites
- Node.js 16+
- Chrome browser installed
- Development server running on port 3001

### CI Configuration
```yaml
# .github/workflows/test.yml
- name: Run Tests
  run: |
    npm ci
    npm run build
    npm run test:all
```

## Test Coverage

### Coverage Reports
- **Jest**: HTML report in `coverage/` directory
- **Playwright**: HTML report in `tests/playwright-report/`
- **Cypress**: Videos in `tests/cypress/videos/`

### Coverage Goals
- **Unit Tests**: >80% line coverage
- **Integration Tests**: All game mechanics covered
- **E2E Tests**: All user journeys covered
- **Browser Tests**: Chrome, Firefox, Safari support

## Debugging Tests

### Jest Debugging
```bash
npm run test:watch -- --verbose
```

### Cypress Debugging
```bash
# Open Cypress GUI for visual debugging
npm run test:cypress
```

### Playwright Debugging
```bash
# Run with UI mode
npm run test:playwright:ui
```

### Selenium Debugging
```javascript
// Add to test file
await driver.takeScreenshot().then(data => {
  fs.writeFileSync('screenshot.png', data, 'base64')
})
```

## Performance Testing

### Metrics Tracked
- **Load Times**: Page load performance
- **Frame Rates**: Game performance
- **Memory Usage**: Resource consumption
- **Network Requests**: API call efficiency

### Performance Thresholds
- Page load: <3 seconds
- Game start: <1 second
- Frame rate: >30fps
- Memory usage: <100MB per game

## Accessibility Testing

### WCAG Guidelines
- Keyboard navigation
- Screen reader compatibility
- Color contrast ratios
- Focus management

### Accessibility Tools
- Playwright accessibility audits
- Cypress accessibility testing
- Selenium ARIA validation

## Best Practices

### Test Writing
1. **Descriptive Names**: Use clear, descriptive test names
2. **Single Responsibility**: One assertion per test
3. **Independent Tests**: Tests should not depend on each other
4. **Clean Setup/Teardown**: Proper test isolation

### Game Testing
1. **State Management**: Test all game states
2. **User Interactions**: Test all input methods
3. **Error Conditions**: Test edge cases
4. **Performance**: Monitor resource usage

### Maintenance
1. **Regular Updates**: Keep frameworks updated
2. **Test Review**: Review and refactor tests regularly
3. **Documentation**: Keep test docs current
4. **Coverage Monitoring**: Track coverage trends

## Troubleshooting

### Common Issues
1. **Canvas Tests Failing**: Check mock implementations
2. **Three.js Errors**: Verify WebGL mocks
3. **Timing Issues**: Add appropriate waits
4. **Browser Crashes**: Check memory usage

### Solutions
1. **Increase Timeouts**: For slow operations
2. **Mock Heavy Libraries**: Reduce test complexity
3. **Use Test IDs**: For reliable element selection
4. **Parallel Execution**: Reduce test runtime

## Contributing

### Adding New Tests
1. Choose appropriate framework
2. Follow existing patterns
3. Add proper documentation
4. Ensure cross-browser compatibility

### Test Guidelines
1. Test both happy and error paths
2. Include performance considerations
3. Add accessibility checks
4. Document test purposes

---

For more information about specific testing frameworks, refer to their official documentation:
- [Jest](https://jestjs.io/)
- [Jasmine](https://jasmine.github.io/)
- [Cypress](https://docs.cypress.io/)
- [Playwright](https://playwright.dev/)
- [Selenium](https://selenium-python.readthedocs.io/) 