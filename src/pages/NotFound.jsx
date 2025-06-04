import { Link } from 'react-router-dom'
import { 
  Box, 
  Container, 
  Typography, 
  Button,
  Stack
} from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'
import './NotFound.css'

const float = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-20px) rotate(10deg); 
  }
`

const NotFoundContainer = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
}))

const ContentBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  zIndex: 2,
  position: 'relative',
}))

const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  fontSize: '3rem',
  opacity: 0.6,
  animation: `${float} 3s ease-in-out infinite`,
  '&:nth-of-type(1)': {
    top: '20%',
    left: '15%',
    animationDelay: '0s',
  },
  '&:nth-of-type(2)': {
    top: '60%',
    right: '20%',
    animationDelay: '1s',
  },
  '&:nth-of-type(3)': {
    bottom: '20%',
    left: '25%',
    animationDelay: '2s',
  },
  '&:nth-of-type(4)': {
    top: '30%',
    right: '10%',
    animationDelay: '1.5s',
  },
  '&:nth-of-type(5)': {
    bottom: '40%',
    right: '40%',
    animationDelay: '0.5s',
  },
}))

const StyledButton = styled(Button)(({ theme, variant }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.spacing(3),
  textTransform: 'none',
  fontSize: '1.1rem',
  fontWeight: 600,
  ...(variant === 'primary' && {
    background: 'linear-gradient(45deg, #646cff, #535bf2)',
    '&:hover': {
      background: 'linear-gradient(45deg, #535bf2, #646cff)',
      transform: 'translateY(-2px)',
    },
  }),
  ...(variant === 'secondary' && {
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-2px)',
    },
  }),
}))

function NotFound() {
  return (
    <NotFoundContainer>
      <Container maxWidth="md">
        <ContentBox>
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontSize: { xs: '4rem', md: '6rem' },
              fontWeight: 'bold',
              mb: 2,
              background: 'linear-gradient(45deg, #fff, #f0f0f0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </Typography>
          
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Page Not Found
          </Typography>
          
          <Typography 
            variant="h6" 
            component="p" 
            sx={{ 
              mb: 4, 
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1.1rem', md: '1.3rem' }
            }}
          >
            Oops! The page you're looking for doesn't exist. 
            It might have been moved, deleted, or you entered the wrong URL.
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            justifyContent="center"
          >
            <StyledButton 
              component={Link} 
              to="/" 
              variant="primary"
              size="large"
            >
              Back to Home
            </StyledButton>
            <StyledButton 
              component={Link} 
              to="/games" 
              variant="secondary"
              size="large"
            >
              Browse Games
            </StyledButton>
          </Stack>
        </ContentBox>
      </Container>
      
      {/* Floating Elements */}
      <FloatingElement>🎮</FloatingElement>
      <FloatingElement>🕹️</FloatingElement>
      <FloatingElement>🎯</FloatingElement>
      <FloatingElement>🎲</FloatingElement>
      <FloatingElement>🎪</FloatingElement>
    </NotFoundContainer>
  )
}

export default NotFound 