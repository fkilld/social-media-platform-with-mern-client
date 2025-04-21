import { Link, useNavigate } from 'react-router-dom'
import {
  Navbar as BootstrapNavbar,
  Container,
  Nav,
  Button,
} from 'react-bootstrap'
import { logoutUser } from '../auth'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
      logout()
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  if (loading) {
    return (
      <BootstrapNavbar bg='light' expand='lg' className='mb-4'>
        <Container>
          <BootstrapNavbar.Brand>Loading...</BootstrapNavbar.Brand>
        </Container>
      </BootstrapNavbar>
    )
  }

  return (
    <BootstrapNavbar bg='light' expand='lg' className='mb-4'>
      <Container>
        <BootstrapNavbar.Brand as={Link} to='/'>
          Home
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls='basic-navbar-nav' />
        <BootstrapNavbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            {!user ? (
              <>
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/register'>
                  Register
                </Nav.Link>
              </>
            ) : (
              <div className='d-flex align-items-center'>
                <span className='me-3'>Welcome, {user.username}</span>
                <Button variant='danger' onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar
