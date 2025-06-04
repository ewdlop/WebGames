import { 
  Box, 
  Container, 
  Typography 
} from '@mui/material'
import { styled } from '@mui/material/styles'
import './Footer.css'

const FooterContainer = styled(Box)({
  background: 'rgba(26, 26, 26, 0.95)',
  backdropFilter: 'blur(10px)',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  marginTop: 'auto',
})

function Footer() {
  return (
    <FooterContainer component="footer">
      <Container maxWidth="lg">
        <Box sx={{ py: 3, textAlign: 'center' }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              opacity: 0.8,
              fontSize: '0.9rem'
            }}
          >
            &copy; 2024 WebGames. Built with React & React Router.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  )
}

export default Footer 