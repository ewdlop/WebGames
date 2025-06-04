import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export function useThree(options = {}) {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const animationIdRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  const {
    antialias = true,
    alpha = true,
    cameraPosition = [0, 0, 5],
    cameraFov = 75,
    enableControls = true,
    backgroundColor = 0x1a1a1a,
    onInit,
    onAnimate,
    onResize
  } = options

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      cameraFov,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(...cameraPosition)
    cameraRef.current = camera

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias,
      alpha
    })
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(backgroundColor, alpha ? 0 : 1)
    rendererRef.current = renderer

    // Add basic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    scene.add(directionalLight)

    // Mouse controls
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (event) => {
      if (!enableControls) return
      const rect = canvasRef.current.getBoundingClientRect()
      mouseX = (event.clientX - rect.left) / rect.width * 2 - 1
      mouseY = -(event.clientY - rect.top) / rect.height * 2 + 1
      targetX = mouseX * 0.5
      targetY = mouseY * 0.5
    }

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current || !camera || !renderer) return
      
      const container = canvasRef.current.parentElement
      const width = container.clientWidth
      const height = container.clientHeight
      
      // Force canvas to match container size
      canvasRef.current.width = width
      canvasRef.current.height = height
      canvasRef.current.style.width = width + 'px'
      canvasRef.current.style.height = height + 'px'
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      
      if (onResize) {
        onResize({ width, height, camera, renderer })
      }
    }

    // Animation loop
    const animate = (time) => {
      // Smooth camera movement based on mouse
      if (enableControls) {
        camera.position.x += (targetX - camera.position.x) * 0.05
        camera.position.y += (targetY - camera.position.y) * 0.05
        camera.lookAt(scene.position)
      }

      // Custom animation callback
      if (onAnimate) {
        onAnimate({ time, scene, camera, renderer })
      }

      renderer.render(scene, camera)
      animationIdRef.current = requestAnimationFrame(animate)
    }

    // Event listeners
    canvasRef.current.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    // Initialize callback
    if (onInit) {
      onInit({ scene, camera, renderer })
    }

    // Start animation and force initial resize
    animate()
    
    // Force resize after component is mounted
    setTimeout(() => {
      handleResize()
    }, 10)
    
    setIsLoading(false)

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousemove', handleMouseMove)
      }
      window.removeEventListener('resize', handleResize)
      
      // Dispose of Three.js objects
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) {
            object.geometry.dispose()
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        })
      }
    }
  }, [])

  const addToScene = (object) => {
    if (sceneRef.current) {
      sceneRef.current.add(object)
    }
  }

  const removeFromScene = (object) => {
    if (sceneRef.current) {
      sceneRef.current.remove(object)
    }
  }

  const getScene = () => sceneRef.current
  const getCamera = () => cameraRef.current
  const getRenderer = () => rendererRef.current

  return {
    canvasRef,
    isLoading,
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    addToScene,
    removeFromScene,
    getScene,
    getCamera,
    getRenderer
  }
} 