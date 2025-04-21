import { Link, useNavigate } from 'react-router-dom'
import {
  Navbar as BootstrapNavbar,
  Container,
  Nav,
  Button,
} from 'react-bootstrap'
import { logoutUser } from '../auth'
import { useAuth } from '../context/AuthContext'

/**
 * Navigation Bar Component
 * 
 * This component provides the main navigation interface for the application.
 * It adapts its display based on authentication state, showing different options
 * for authenticated and unauthenticated users.
 * 
 * We're using React Bootstrap for the navbar because:
 * - It provides responsive design out of the box
 * - It handles mobile navigation with built-in toggle functionality
 * - It offers consistent styling that integrates with our Bootstrap theme
 * - It simplifies complex navigation patterns with pre-built components
 * 
 * The component handles:
 * - Conditional rendering based on authentication state
 * - User logout functionality
 * - Navigation between different application routes
 * - Loading state display during authentication checks
 */
function Navbar() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()

  /**
   * Handles the user logout process
   * 
   * This function:
   * 1. Calls the API to invalidate the session on the server
   * 2. Updates the local auth context to reflect logged out state
   * 3. Redirects the user to the login page
   * 4. Handles and logs any errors that occur during logout
   */

  /**
   * Handles the user logout process
   * 
   * This function:
   * 1. Calls the API to invalidate the session on the server
   * 2. Updates the local auth context to reflect logged out state
   * 3. Redirects the user to the login page
   * 4. Handles and logs any errors that occur during logout
   */
  const handleLogout = async () => {
    try {
      await logoutUser()
      logout()
      navigate('/login')
    } catch (error) {
      
      console.error('Error logging out:', error)
    }
  }

  // Display a simplified navbar during authentication loading state
  /**
   * Handles the user logout process
   * 
   * This function:
   * 1. Calls the API to invalidate the session on the server
   * 2. Updates the local auth context to reflect logged out state
   * 3. Redirects the user to the login page
   * 4. Handles and logs any errors that occur during logout
   */ 
  if (loading) {
    return (
      <BootstrapNavbar bg='light' expand='lg' className='mb-4'>
        <Container>
          <BootstrapNavbar.Brand>Loading...</BootstrapNavbar.Brand>
        </Container>
      </BootstrapNavbar>
    )
  }

  /**
   * Renders the main navigation bar component
   * 
   * This function:
   * 1. Displays a simplified loading state during authentication checks
   * 2. Conditionally renders the navbar based on authentication state
   * 3. Provides a logout button for authenticated users
   * 4. Handles the logout process with error handling
   */

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
