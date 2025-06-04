import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import Layout from './components/layouts/Layout'
import GameLayout from './components/layouts/GameLayout'
import Home from './pages/Home'
import About from './pages/About'
import Games from './pages/Games'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import CubeAdventure from './components/games/CubeAdventure'
import ParticleStorm from './components/games/ParticleStorm'
import MemoryMatch from './components/games/MemoryMatch'
import TowerDefense from './components/games/TowerDefense'
import CosmicDefender from './components/games/CosmicDefender'
import './App.css'

// Create Material UI theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#646cff',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#1a1a1a',
      paper: '#2a2a2a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
          <Route path="memory-match" element={<MemoryMatch />} />
          <Route path="tower-defense" element={<TowerDefense />} />
          <Route path="cosmic-defender" element={<CosmicDefender />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App 