import { Link } from 'react-router-dom'
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Stack
} from '@mui/material'
import { styled } from '@mui/material/styles'
import './Home.css'

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  textAlign: 'center',
  padding: theme.spacing(8, 0),
  minHeight: '60vh',
  display: 'flex',
  alignItems: 'center',
}))

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  },
}))

const CTAButton = styled(Button)(({ theme, variant }) => ({
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

function Home() {
  return (
    <Box>
      <HeroSection>
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2
            }}
          >
            Welcome to WebGames
          </Typography>
          <Typography 
            variant="h5" 
            component="p" 
            sx={{ 
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}
          >
            Your ultimate destination for web-based games and entertainment
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
          >
            <CTAButton 
              component={Link} 
              to="/games" 
              variant="primary"
              size="large"
            >
              Explore Games
            </CTAButton>
            <CTAButton 
              component={Link} 
              to="/about" 
              variant="secondary"
              size="large"
            >
              Learn More
            </CTAButton>
          </Stack>
        </Container>
      </HeroSection>
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          gutterBottom
          sx={{ mb: 6, fontWeight: 'bold' }}
        >
          What We Offer
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  gutterBottom
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  🎮 Diverse Games
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  From puzzle games to action adventures, we have something for everyone.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  gutterBottom
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  🚀 Instant Play
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  No downloads required. Play directly in your browser.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  gutterBottom
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  📱 Mobile Friendly
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Enjoy our games on any device, anywhere, anytime.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Home 