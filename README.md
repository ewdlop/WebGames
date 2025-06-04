# WebGames - Modern React Gaming Platform

A cutting-edge React application showcasing modern web game development using various technologies including React Three Fiber, HTML5 Canvas, and traditional DOM manipulation. Built with Vite for optimal performance and featuring a comprehensive game collection.

## 🎮 Game Collection

### Available Games(not complete)

1. **🎯 Cube Adventure** (Three.js/WebGL)
   - Interactive 3D cube clicking game
   - Hardware-accelerated graphics with Three.js
   - Dynamic lighting and camera controls

2. **✨ Particle Storm** (HTML5 Canvas)
   - 2D particle physics simulation
   - Mouse interaction with colorful particle effects
   - Real-time canvas rendering

3. **🧠 Memory Match** (Vanilla JavaScript)
   - Classic card matching game
   - CSS3 animations and transitions
   - Pure JavaScript DOM manipulation

4. **🏰 Tower Defense** (jQuery)
   - Strategic tower placement game
   - Enemy waves and projectile physics
   - jQuery-powered interactions

5. **🚀 Cosmic Defender** (React Three Fiber) ⭐ **NEW**
   - 3D space shooter in zero gravity
   - Physics-based spaceship controls
   - Asteroid destruction with explosion effects
   - Uses TwoSlotLayout with vertical configuration

## 🚀 Features

- ⚡ **Vite** - Lightning-fast build tool and development server
- ⚛️ **React 18** - Latest React with Hooks and modern patterns
- 🚦 **React Router** - Client-side routing with nested layouts
- 🎨 **Material-UI** - Modern component library with dark theme
- 📱 **Responsive Design** - Mobile-first approach across all games
- 🎮 **Multiple Game Technologies** - Showcase of web game development approaches
- 🎯 **Game Layout System** - Specialized layouts for immersive gaming
- 🌟 **3D Graphics** - WebGL and React Three Fiber integration

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layouts/
│   │   ├── Layout.jsx           # Main app layout
│   │   ├── GameLayout.jsx       # Full-screen game layout
│   │   ├── TwoSlotLayout.jsx    # Flexible dual-slot layout
│   │   └── TwoSlotDemo.jsx      # Layout demonstration
│   ├── games/
│   │   ├── CubeAdventure.jsx    # Three.js 3D game
│   │   ├── ParticleStorm.jsx    # HTML5 Canvas game
│   │   ├── MemoryMatch.jsx      # Vanilla JS game
│   │   ├── TowerDefense.jsx     # jQuery strategy game
│   │   └── CosmicDefender.jsx   # React Three Fiber space shooter
│   ├── GameUI.jsx               # Reusable game interface
│   ├── Header.jsx               # Navigation header
│   └── Footer.jsx               # Footer component
├── pages/
│   ├── Home.jsx                 # Landing page with hero section
│   ├── Games.jsx                # Games catalog with tech showcase
│   ├── About.jsx                # About page
│   ├── Contact.jsx              # Contact form
│   └── NotFound.jsx             # 404 page
├── hooks/
│   └── useThree.js              # Custom Three.js hook
├── App.jsx                      # Main app with routing
└── main.jsx                     # React entry point
```

## 🎯 Game Technologies Showcase

### **React Three Fiber**
- Modern React-based 3D graphics
- Declarative Three.js components
- Physics simulation and interactive controls
- Used in: **Cosmic Defender**

### **WebGL & Three.js**
- Hardware-accelerated 3D graphics
- GPU-powered rendering for immersive experiences
- Used in: **Cube Adventure**

### **HTML5 Canvas**
- 2D graphics rendering with native browser APIs
- Particle effects and real-time animations
- Used in: **Particle Storm**

### **Vanilla JavaScript**
- Pure JavaScript DOM manipulation
- Event handling and fundamental web skills
- Used in: **Memory Match**

### **jQuery**
- Simplified DOM manipulation and animations
- Rapid game development and prototyping
- Used in: **Tower Defense**

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd WebGames
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3001`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🧪 Testing

This project includes comprehensive testing using **5 different testing frameworks** to ensure quality, compatibility, and performance across different browsers and environments.

### 🛠️ Testing Frameworks

#### **1. Jest** (Unit Testing)
- **Purpose**: React component testing, hooks, utility functions
- **Features**: React Testing Library, mocks for Three.js/Canvas APIs
- **Coverage**: Component rendering, user interactions, state management

```bash
npm test                    # Run all tests
npm run test:watch         # Run in watch mode
npm run test:coverage      # Generate coverage report
```

#### **2. Jasmine** (Behavior-Driven Testing)
- **Purpose**: Game logic, physics calculations, performance testing
- **Features**: Game mechanics validation, particle physics testing
- **Coverage**: Game rules, collision detection, memory management

```bash
npm run test:jasmine
```

#### **3. Cypress** (End-to-End Testing)
- **Purpose**: Full user journeys, integration testing
- **Features**: Real browser testing, custom game commands, video recording
- **Coverage**: Complete workflows, game interactions, navigation

```bash
npm run test:cypress        # Open Cypress GUI
npm run test:cypress:run    # Run headlessly
```

#### **4. Playwright** (Cross-Browser Testing)
- **Purpose**: Multi-browser compatibility, mobile testing
- **Features**: Chrome/Firefox/Safari testing, mobile simulation
- **Coverage**: Cross-browser compatibility, responsive design, performance

```bash
npm run test:playwright     # Run all browsers
npm run test:playwright:ui  # Open UI mode
```

#### **5. Selenium WebDriver** (Automated Testing)
- **Purpose**: Legacy browser support, automated testing, CI/CD
- **Features**: WebDriver automation, accessibility validation
- **Coverage**: Browser automation, accessibility, performance monitoring

```bash
npm run test:selenium
```

### 🎮 Game-Specific Testing

Each framework tests different aspects of the games:

- **🧪 Unit Tests (Jest)**: Component rendering, props, state changes
- **⚙️ Integration Tests (Jasmine)**: Physics systems, game mechanics
- **🌐 E2E Tests (Cypress/Playwright)**: User workflows, game interactions
- **🔧 Browser Tests (Selenium)**: Cross-browser compatibility, accessibility

### 📊 Testing Coverage

- **Particle Storm**: Canvas rendering, mouse interactions, particle physics
- **Cube Adventure**: Three.js scene loading, 3D interactions, WebGL compatibility
- **Cosmic Defender**: Keyboard controls (WASD + Space), collision detection
- **Memory Match**: Card flipping logic, game state management
- **Tower Defense**: Tower placement, enemy pathfinding, strategy validation

### 🚀 Quick Testing

```bash
# Run all tests sequentially
npm run test:all

# Or use the custom test runner
node test-runner.js

# Run specific framework
node test-runner.js jest
node test-runner.js cypress
node test-runner.js playwright
```

### 📋 Testing Prerequisites

- Development server running on `http://localhost:3001`
- Chrome browser installed (for Selenium/Playwright)
- All dependencies installed via `npm install`

### 📈 Test Reports

- **Jest**: Coverage reports in `coverage/` directory
- **Cypress**: Videos and screenshots in `tests/cypress/`
- **Playwright**: HTML reports in `tests/playwright-report/`
- **Test Runner**: Aggregated results in `test-results.json`

For detailed testing documentation, see [`tests/README.md`](tests/README.md).

## 🗺️ Routing Structure

### Main Routes
- `/` - Home page with hero section
- `/games` - Games catalog with technology showcase
- `/about` - About page
- `/contact` - Contact form with validation
- `/*` - 404 Not Found page

### Game Routes (Full-screen)
- `/games/play/cube-adventure` - Three.js 3D Game
- `/games/play/particle-storm` - HTML5 Canvas Game
- `/games/play/memory-match` - Vanilla JavaScript Game
- `/games/play/tower-defense` - jQuery Strategy Game
- `/games/play/cosmic-defender` - React Three Fiber Space Shooter

## 🎨 Layout System

### **Main Layout**
- Header with responsive navigation
- Main content area using React Router Outlet
- Footer with consistent branding

### **Game Layout**
- Full-screen immersive gaming experience
- Back button for easy navigation
- Optimized for game performance

### **TwoSlotLayout**
- Flexible dual-slot component system
- Vertical/horizontal/overlay configurations
- Used by Cosmic Defender for game canvas + controls

## 🛠️ Technologies Used

### **Frontend Framework**
- **React 18** - Modern UI library with Hooks
- **React Router DOM** - Client-side routing
- **Material-UI** - Component library and theming

### **Game Development**
- **React Three Fiber** - React-based 3D graphics
- **Three.js** - WebGL 3D graphics library
- **HTML5 Canvas** - 2D graphics rendering
- **jQuery** - DOM manipulation for legacy compatibility

### **Build Tools**
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing

### **Testing & Quality Assurance**
- **Jest** - Unit testing with React Testing Library
- **Jasmine** - Behavior-driven development testing
- **Cypress** - End-to-end testing with real browsers
- **Playwright** - Cross-browser and mobile testing
- **Selenium WebDriver** - Automated browser testing

### **Styling**
- **CSS3** - Modern styling with custom properties
- **CSS Grid & Flexbox** - Advanced layout systems
- **Material-UI Theming** - Consistent design system
- **Responsive Design** - Mobile-first approach

## 🎮 Game Features

### **Cosmic Defender** (Featured Game)
- **Controls**: WASD movement + Spacebar to fire
- **Physics**: Zero-gravity space environment
- **Gameplay**: Destroy asteroids, avoid collisions
- **Visual Effects**: Explosions, starfield, glowing UI
- **Layout**: Vertical split with 3D canvas and controls

### **Game UI System**
- Consistent interface across all games
- Score tracking and statistics
- Start/pause/reset controls
- Game-specific instructions
- Responsive design for mobile

## 📱 Browser Support

- **Chrome** (latest) - Full WebGL and Canvas support
- **Firefox** (latest) - Complete feature compatibility
- **Safari** (latest) - Optimized for mobile gaming
- **Edge** (latest) - Enhanced performance

## 🎯 Performance Features

- **Code Splitting** - Lazy loading for optimal bundle size
- **Game Optimization** - Efficient rendering and memory management
- **Mobile Performance** - Touch controls and responsive layouts
- **Hot Module Reload** - Fast development iteration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-game`)
3. Commit your changes (`git commit -m 'Add amazing new game'`)
4. Push to the branch (`git push origin feature/amazing-game`)
5. Open a Pull Request

### Adding New Games

1. Create game component in `src/components/games/`
2. Add route in `src/App.jsx`
3. Update games list in `src/pages/Games.jsx`
4. Include appropriate CSS styling
5. **Add comprehensive tests** for all testing frameworks
6. Test across different screen sizes

### Testing Guidelines

When contributing:
- Add unit tests for new components (Jest)
- Include game logic tests (Jasmine)
- Create E2E tests for user workflows (Cypress)
- Ensure cross-browser compatibility (Playwright/Selenium)
- Run `npm run test:all` before submitting PRs

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🌟 Acknowledgments

- **Three.js Community** - For excellent 3D web graphics tools
- **React Three Fiber Team** - For bringing React to 3D development
- **Vite Team** - For the incredible build tool experience
- **Testing Community** - Jest, Cypress, Playwright, Selenium, and Jasmine teams

---

**Built with ❤️ using modern web technologies for an immersive gaming experience.** 