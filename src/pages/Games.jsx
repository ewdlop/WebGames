import { Link } from 'react-router-dom'
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Button,
  Chip,
  Stack
} from '@mui/material'
import { styled } from '@mui/material/styles'
import './Games.css'

const PageHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  textAlign: 'center',
  padding: theme.spacing(6, 0),
}))

const GameCard = styled(Card)(({ theme, disabled }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: disabled ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  opacity: disabled ? 0.6 : 1,
  '&:hover': {
    transform: disabled ? 'none' : 'translateY(-5px)',
    boxShadow: disabled ? 'none' : '0 10px 30px rgba(0, 0, 0, 0.3)',
  },
}))

const TechBadge = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(45deg, #646cff, #535bf2)',
  color: 'white',
  fontWeight: 600,
  fontSize: '0.75rem',
  '& .MuiChip-deleteIcon': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}))

const TechCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
  },
}))

function Games() {
  const games = [
    {
      id: 1,
      title: "Cube Adventure",
      description: "Interactive 3D game with Three.js - Click rotating cubes to destroy them!",
      category: "3D/WebGL",
      players: "1 Player",
      technology: "Three.js",
      route: "/games/play/cube-adventure"
    },
    {
      id: 2,
      title: "Particle Storm",
      description: "2D Canvas particle effects - Control colorful particles with mouse interaction",
      category: "2D Canvas",
      players: "1 Player",
      technology: "HTML5 Canvas",
      route: "/games/play/particle-storm"
    },
    {
      id: 3,
      title: "Memory Match",
      description: "Classic memory card game with CSS animations - Match pairs as fast as possible!",
      category: "HTML/CSS/JS",
      players: "1 Player",
      technology: "Vanilla JavaScript",
      route: "/games/play/memory-match"
    },
    {
      id: 4,
      title: "Tower Defense",
      description: "Strategic tower placement game with jQuery - Defend your base from enemy waves!",
      category: "Strategy",
      players: "1 Player",
      technology: "jQuery",
      route: "/games/play/tower-defense"
    },
    {
      id: 5,
      title: "Cosmic Defender",
      description: "3D space shooter with React Three Fiber - Pilot your spaceship and destroy asteroids in zero gravity!",
      category: "3D Action",
      players: "1 Player",
      technology: "React Three Fiber",
      route: "/games/play/cosmic-defender"
    },
    {
      id: 6,
      title: "Space Adventure",
      description: "Explore the cosmos in this epic space journey",
      category: "Adventure",
      players: "1 Player",
      technology: "Coming Soon",
      route: null
    },
    {
      id: 7,
      title: "Racing Thunder",
      description: "High-speed racing action",
      category: "Racing",
      players: "1-4 Players",
      technology: "Coming Soon",
      route: null
    },
    {
      id: 8,
      title: "Word Wizard",
      description: "Test your vocabulary skills",
      category: "Word",
      players: "1-2 Players",
      technology: "Coming Soon",
      route: null
    },
    {
      id: 9,
      title: "Memory Challenge",
      description: "Train your memory with fun exercises",
      category: "Memory",
      players: "1 Player",
      technology: "Coming Soon",
      route: null
    }
  ]

  const techBadges = ['React Three Fiber', 'Three.js', 'WebGL', 'HTML5 Canvas', 'jQuery', 'Vanilla JS', 'CSS3', 'React']

  return (
    <Box>
      <PageHeader>
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            Our Games Collection
          </Typography>
          <Typography 
            variant="h5" 
            component="p" 
            sx={{ mb: 4, opacity: 0.9 }}
          >
            Discover amazing games built with modern web technologies!
          </Typography>
          <Stack 
            direction="row" 
            spacing={1} 
            justifyContent="center" 
            flexWrap="wrap"
            sx={{ gap: 1 }}
          >
            {techBadges.map((tech) => (
              <TechBadge key={tech} label={tech} size="small" />
            ))}
          </Stack>
        </Container>
      </PageHeader>
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {games.map(game => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
              <GameCard disabled={!game.route}>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip 
                      label={game.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                    <Chip 
                      label={game.technology} 
                      size="small" 
                      color="secondary"
                      variant={game.technology === 'Coming Soon' ? 'filled' : 'outlined'}
                    />
                  </Stack>
                  
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {game.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                  >
                    {game.description}
                  </Typography>
                  
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                  >
                    {game.players}
                  </Typography>
                </CardContent>
                
                <CardActions sx={{ p: 3, pt: 0 }}>
                  {game.route ? (
                    <Button 
                      component={Link} 
                      to={game.route} 
                      variant="contained" 
                      fullWidth
                      sx={{
                        background: 'linear-gradient(45deg, #646cff, #535bf2)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #535bf2, #646cff)',
                        }
                      }}
                    >
                      Play Now
                    </Button>
                  ) : (
                    <Button 
                      variant="outlined" 
                      disabled 
                      fullWidth
                    >
                      Coming Soon
                    </Button>
                  )}
                </CardActions>
              </GameCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)', py: 8 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ mb: 6, fontWeight: 'bold' }}
          >
            Web Game Technologies Showcase
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={3}>
              <TechCard>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    🚀 React Three Fiber
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Modern React-based 3D graphics with declarative Three.js components, physics, and interactive controls.
                  </Typography>
                </CardContent>
              </TechCard>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TechCard>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    🎨 HTML5 Canvas
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    2D graphics rendering for particle effects, animations, and classic game mechanics with native browser APIs.
                  </Typography>
                </CardContent>
              </TechCard>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TechCard>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    🌐 WebGL & Three.js
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hardware-accelerated 3D graphics for immersive gaming experiences with modern GPU acceleration.
                  </Typography>
                </CardContent>
              </TechCard>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TechCard>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    ⚡ Vanilla JavaScript
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pure JavaScript DOM manipulation and event handling showcasing fundamental web development skills.
                  </Typography>
                </CardContent>
              </TechCard>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TechCard>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    🔧 jQuery
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Simplified DOM manipulation, animations, and AJAX calls for rapid game development and prototyping.
                  </Typography>
                </CardContent>
              </TechCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default Games 