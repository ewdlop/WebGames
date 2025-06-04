import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import Header from './Header'
import Footer from './Footer'
import './Layout.css'

const LayoutContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
})

const MainContent = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
})

function Layout() {
  return (
    <LayoutContainer>
      <Header />
      <MainContent component="main">
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  )
}

export default Layout 