import { useState } from 'react'
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  TextField,
  Button,
  Paper,
  Alert,
  Snackbar
} from '@mui/material'
import { styled } from '@mui/material/styles'
import './Contact.css'

const PageHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  textAlign: 'center',
  padding: theme.spacing(6, 0),
}))

const ContactCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
  },
}))

const FormPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.05)',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiOutlinedInput-input': {
    color: 'white',
  },
}))

const SubmitButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #646cff, #535bf2)',
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  fontWeight: 600,
  '&:hover': {
    background: 'linear-gradient(45deg, #535bf2, #646cff)',
    transform: 'translateY(-2px)',
  },
}))

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [showAlert, setShowAlert] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    setShowAlert(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

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
            Get in Touch
          </Typography>
          <Typography 
            variant="h5" 
            component="p" 
            sx={{ opacity: 0.9 }}
          >
            We'd love to hear from you! Send us a message and we'll respond as soon as possible.
          </Typography>
        </Container>
      </PageHeader>
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}
            >
              Contact Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ContactCard>
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      sx={{ fontWeight: 'bold', mb: 2 }}
                    >
                      📧 Email
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      hello@webgames.com
                    </Typography>
                  </CardContent>
                </ContactCard>
              </Grid>
              <Grid item xs={12}>
                <ContactCard>
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      sx={{ fontWeight: 'bold', mb: 2 }}
                    >
                      🌍 Website
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      www.webgames.com
                    </Typography>
                  </CardContent>
                </ContactCard>
              </Grid>
              <Grid item xs={12}>
                <ContactCard>
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      sx={{ fontWeight: 'bold', mb: 2 }}
                    >
                      ⏰ Response Time
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      We typically respond within 24 hours
                    </Typography>
                  </CardContent>
                </ContactCard>
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <FormPaper elevation={0}>
              <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom
                sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}
              >
                Send us a Message
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      id="subject"
                      name="subject"
                      label="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      id="message"
                      name="message"
                      label="Message"
                      multiline
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                      <SubmitButton
                        type="submit"
                        variant="contained"
                        size="large"
                      >
                        Send Message
                      </SubmitButton>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </FormPaper>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Thank you for your message! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Contact 