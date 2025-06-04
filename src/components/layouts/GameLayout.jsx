import { Outlet, Link, useLocation } from 'react-router-dom'
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Fab, 
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { ArrowBack, Home } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

// Styled components
const GameLayoutRoot = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
  overflow: 'hidden',
}))

const GameMain = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
})

const FloatingBackButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: 1000,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    backgroundColor: 'rgba(25, 118, 210, 0.2)',
    transform: 'translateY(-2px)',
  },
}))

const GameInfoPanel = styled(Paper)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(10px)',
  borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
  padding: theme.spacing(2),
  minHeight: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}))

function GameLayout() {
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isGamePage = location.pathname.includes('/games/play/')

  return (
    <GameLayoutRoot>
      {/* Floating back button for game pages */}
      {isGamePage && (
        <FloatingBackButton
          component={Link}
          to="/games"
          color="primary"
          size={isMobile ? "medium" : "large"}
          aria-label="back to games"
        >
          <ArrowBack />
        </FloatingBackButton>
      )}
      
      {/* Regular header for non-game pages */}
      {!isGamePage && (
        <StyledAppBar position="static" elevation={0}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Fab
                component={Link}
                to="/games"
                color="primary"
                size="small"
                sx={{ mr: 2 }}
                aria-label="back to games"
              >
                <ArrowBack />
              </Fab>
              <Typography variant="h6" component="div">
                Game Center
              </Typography>
            </Box>
            
            <Fab
              component={Link}
              to="/"
              color="secondary"
              size="small"
              aria-label="home"
            >
              <Home />
            </Fab>
          </Toolbar>
        </StyledAppBar>
      )}
      
      <GameMain>
        <Outlet />
      </GameMain>
      
      {/* Info panel for non-game pages */}
      {!isGamePage && (
        <GameInfoPanel elevation={0}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                margin: 0 
              }}
            >
              💡 Game controls and instructions will appear here
            </Typography>
          </Box>
        </GameInfoPanel>
      )}
    </GameLayoutRoot>
  )
}

export default GameLayout 