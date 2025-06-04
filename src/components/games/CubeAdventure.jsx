import { useState, useCallback } from 'react'
import * as THREE from 'three'
import { useThree } from '../../hooks/useThree'
import GameUI from '../GameUI'
import '../layouts/GameLayout.css'

function CubeAdventure() {
  const [score, setScore] = useState(0)
  const [cubeCount, setCubeCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const cubesRef = { current: [] }

  const createCube = useCallback((scene) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6)
    })
    const cube = new THREE.Mesh(geometry, material)
    
    // Random position
    cube.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    )
    
    // Random rotation speed
    cube.userData.rotationSpeed = {
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.02
    }
    
    scene.add(cube)
    cubesRef.current.push(cube)
    setCubeCount(prev => prev + 1)
    
    return cube
  }, [])

  const onInit = useCallback(({ scene }) => {
    // Create initial cubes
    for (let i = 0; i < 5; i++) {
      createCube(scene)
    }
  }, [createCube])

  const onAnimate = useCallback(({ time, scene }) => {
    if (!isPlaying) return
    
    // Rotate all cubes
    cubesRef.current.forEach(cube => {
      if (cube.userData.rotationSpeed) {
        cube.rotation.x += cube.userData.rotationSpeed.x
        cube.rotation.y += cube.userData.rotationSpeed.y
        cube.rotation.z += cube.userData.rotationSpeed.z
      }
    })
    
    // Add new cube occasionally
    if (Math.random() < 0.002 && cubesRef.current.length < 20) {
      createCube(scene)
    }
  }, [isPlaying, createCube])

  const onCanvasClick = useCallback((event) => {
    if (!isPlaying) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const mouse = new THREE.Vector2()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    
    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, camera)
    
    const intersects = raycaster.intersectObjects(cubesRef.current)
    
    if (intersects.length > 0) {
      const clickedCube = intersects[0].object
      
      // Remove cube from scene and array
      scene.remove(clickedCube)
      cubesRef.current = cubesRef.current.filter(cube => cube !== clickedCube)
      
      // Dispose of geometry and material
      clickedCube.geometry.dispose()
      clickedCube.material.dispose()
      
      setScore(prev => prev + 10)
      setCubeCount(prev => prev - 1)
    }
  }, [isPlaying])

  const { canvasRef, isLoading, scene, camera } = useThree({
    onInit,
    onAnimate,
    cameraPosition: [0, 0, 8],
    enableControls: true
  })

  const startGame = () => {
    setIsPlaying(true)
    setScore(0)
  }

  const resetGame = () => {
    // Clear all cubes
    cubesRef.current.forEach(cube => {
      scene.remove(cube)
      cube.geometry.dispose()
      cube.material.dispose()
    })
    cubesRef.current = []
    
    // Create new cubes
    for (let i = 0; i < 5; i++) {
      createCube(scene)
    }
    
    setScore(0)
    setIsPlaying(false)
  }

  return (
    <div className="canvas-container">
      {isLoading && (
        <div className="game-loading">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading 3D Scene...</div>
        </div>
      )}
      
      <canvas 
        ref={canvasRef} 
        className="game-canvas"
        onClick={onCanvasClick}
      />
      
      <GameUI
        gameTitle="Cube Adventure"
        score={score}
        status={isPlaying ? 'Playing' : 'Paused'}
        isPlaying={isPlaying}
        additionalStats={{
          "Cubes": cubeCount
        }}
        instructions={[
          "🎯 Click cubes to destroy them",
          "🖱️ Move mouse to look around"
        ]}
        onStart={startGame}
        onPause={() => setIsPlaying(false)}
        onReset={resetGame}
      />
    </div>
  )
}

export default CubeAdventure 