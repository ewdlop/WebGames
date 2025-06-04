import { NavLink, useLocation } from 'react-router-dom'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Container
} from '@mui/material'
import { styled } from '@mui/material/styles'
import './Header.css'

const StyledAppBar = styled(AppBar)({
  background: 'rgba(26, 26, 26, 0.9)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
})

const Logo = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  background: 'linear-gradient(45deg, #646cff, #535bf2)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textDecoration: 'none',
  '&:hover': {
    background: 'linear-gradient(45deg, #535bf2, #646cff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
  },
})

const NavButton = styled(Button)(({ theme, isActive }) => ({
  color: isActive ? '#646cff' : 'rgba(255, 255, 255, 0.8)',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: isActive ? 600 : 400,
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(1),
  position: 'relative',
  '&:hover': {
    color: '#646cff',
    background: 'rgba(100, 108, 255, 0.1)',
  },
  '&::after': isActive ? {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    height: '2px',
    background: 'linear-gradient(45deg, #646cff, #535bf2)',
    borderRadius: '1px',
  } : {},
}))

function Header() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/games', label: 'Games' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <StyledAppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 0.5, minHeight: '48px' }}>
          <Logo 
            component={NavLink} 
            to="/" 
            variant="h6"
            sx={{ textDecoration: 'none' }}
          >
            WebGames
          </Logo>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <NavButton
                key={item.path}
                component={NavLink}
                to={item.path}
                isActive={location.pathname === item.path}
              >
                {item.label}
              </NavButton>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  )
}

export default Header 