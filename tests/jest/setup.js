import '@testing-library/jest-dom'

// Mock Three.js for unit tests
global.THREE = {
  WebGLRenderer: class MockWebGLRenderer {
    constructor() {
      this.domElement = document.createElement('canvas')
    }
    setSize() {}
    render() {}
    dispose() {}
  },
  Scene: class MockScene {
    add() {}
    remove() {}
  },
  PerspectiveCamera: class MockPerspectiveCamera {},
  BoxGeometry: class MockBoxGeometry {},
  MeshPhongMaterial: class MockMeshPhongMaterial {},
  Mesh: class MockMesh {
    constructor() {
      this.position = { set: () => {}, x: 0, y: 0, z: 0 }
      this.rotation = { x: 0, y: 0, z: 0 }
      this.userData = {}
    }
  },
  DirectionalLight: class MockDirectionalLight {},
  AmbientLight: class MockAmbientLight {},
  Color: class MockColor {
    setHSL() { return this }
  },
  Vector2: class MockVector2 {},
  Raycaster: class MockRaycaster {
    setFromCamera() {}
    intersectObjects() { return [] }
  }
}

// Mock canvas context
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(() => ({ data: new Array(4) })),
  putImageData: jest.fn(),
  createImageData: jest.fn(() => []),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  fillText: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  measureText: jest.fn(() => ({ width: 0 })),
  transform: jest.fn(),
  rect: jest.fn(),
  clip: jest.fn(),
}))

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 0))
global.cancelAnimationFrame = jest.fn(id => clearTimeout(id))

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
}) 