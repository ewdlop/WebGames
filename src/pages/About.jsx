import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Paper
} from '@mui/material'
import { styled } from '@mui/material/styles'
import './About.css'

const PageHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  textAlign: 'center',
  padding: theme.spacing(6, 0),
}))

const SectionBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}))

const ValueCard = styled(Card)(({ theme }) => ({
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

const StorySection = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
}))

function About() {
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
            About WebGames
          </Typography>
          <Typography 
            variant="h5" 
            component="p" 
            sx={{ opacity: 0.9 }}
          >
            Learn more about our mission and what makes us special
          </Typography>
        </Container>
      </PageHeader>
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <SectionBox>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}
          >
            Our Mission
          </Typography>
          <Typography 
            variant="h6" 
            component="p" 
            color="text.secondary"
            sx={{ 
              textAlign: 'center', 
              maxWidth: '800px', 
              mx: 'auto',
              lineHeight: 1.8
            }}
          >
            At WebGames, we're passionate about bringing the joy of gaming to everyone, everywhere. 
            Our platform offers a curated collection of high-quality web games that can be played 
            instantly in your browser without any downloads or installations.
          </Typography>
        </SectionBox>
        
        <SectionBox>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}
          >
            What We Stand For
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <ValueCard>
                <CardContent sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    🎯 Quality First
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Every game in our collection is carefully selected and tested to ensure the best gaming experience.
                  </Typography>
                </CardContent>
              </ValueCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ValueCard>
                <CardContent sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    🌍 Accessibility
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    We believe great games should be accessible to everyone, regardless of their device or technical expertise.
                  </Typography>
                </CardContent>
              </ValueCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ValueCard>
                <CardContent sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    ⚡ Performance
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Our platform is optimized for speed and efficiency, ensuring smooth gameplay on any device.
                  </Typography>
                </CardContent>
              </ValueCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ValueCard>
                <CardContent sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    🔒 Privacy
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    We respect your privacy and don't collect unnecessary data. Just pure gaming fun.
                  </Typography>
                </CardContent>
              </ValueCard>
            </Grid>
          </Grid>
        </SectionBox>
        
        <SectionBox>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}
          >
            Our Story
          </Typography>
          <StorySection elevation={0}>
            <Typography 
              variant="h6" 
              component="p" 
              paragraph
              sx={{ lineHeight: 1.8, mb: 3 }}
            >
              Founded in 2024, WebGames started as a simple idea: make great games accessible to everyone. 
              We noticed that while mobile app stores were flooded with games, the web gaming experience 
              was often overlooked. We set out to change that by creating a platform that showcases the 
              best of what web gaming has to offer.
            </Typography>
            <Typography 
              variant="h6" 
              component="p" 
              sx={{ lineHeight: 1.8 }}
            >
              Today, we continue to grow our collection and improve our platform, always with our users 
              at the center of everything we do.
            </Typography>
          </StorySection>
        </SectionBox>
      </Container>
    </Box>
  )
}

export default About 