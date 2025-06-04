import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import GameLayout from './components/GameLayout'
import Home from './pages/Home'
import About from './pages/About'
import Games from './pages/Games'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import CubeAdventure from './games/CubeAdventure'
import ParticleStorm from './games/ParticleStorm'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="games" element={<Games />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      
      {/* Game sublayout routes */}
      <Route path="/games/play" element={<GameLayout />}>
        <Route path="cube-adventure" element={<CubeAdventure />} />
        <Route path="particle-storm" element={<ParticleStorm />} />
      </Route>
    </Routes>
  )
}

export default App 