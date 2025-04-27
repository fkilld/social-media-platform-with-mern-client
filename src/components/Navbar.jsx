import { useNavigate, useLocation } from 'react-router-dom'
import {
  Navbar as BootstrapNavbar,
  Container,
  Nav,
  Button,
} from 'react-bootstrap'
import { logoutUser } from '../auth'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

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
 * - SPA behavior ensuring page doesn't reload during navigation
 */
function Navbar() {
  const { user, loading, logout } = useAuth()
  /**
   * React Router hooks for navigation and location tracking
   * 
   * useNavigate:
   * - Provides programmatic navigation capabilities without using <Link> components
   * - Allows redirecting users after events like form submissions or authentication changes
   * - Supports navigation with history replacement to prevent back-button issues
   * - Enables passing state between routes for complex navigation scenarios
   * - More flexible than the older useHistory hook, with a simpler API
   * 
   * useLocation:
   * - Gives access to the current URL location object
   * - Allows components to react to URL changes without re-rendering the entire app
   * - Provides pathname, search params, and hash fragments from the current URL
   * - Useful for conditional rendering based on the current route
   * - Can be used in useEffect dependencies to trigger actions on route changes
   */
  const navigate = useNavigate()
  const location = useLocation()

  /**
   * Handles the user logout process
   *
   * This function:
   * 1. Calls the API to invalidate the session on the server
   * 2. Updates the local auth context to reflect logged out state
   * 3. Redirects the user to the login page
   * 4. Handles and logs any errors that occur during logout
   * 5. Uses SPA navigation to prevent page reload
   */
  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await logoutUser()
      logout()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  /**
   * Handles navigation links to ensure SPA behavior
   * 
   * This function:
   * 1. Prevents default link behavior
   * 2. Uses React Router's navigate function for client-side routing
   * 3. Ensures the page doesn't reload during navigation
   */
  const handleNavigation = (e, path) => {
    e.preventDefault()
    navigate(path)
  }

  // Redirect authenticated users trying to access login/register pages
  useEffect(() => {
    if (user && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/', { replace: true })
    }
  }, [user, location.pathname, navigate])

  // Display a simplified navbar during authentication loading state
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
        <BootstrapNavbar.Brand 
          as="a" 
          href="/" 
          onClick={(e) => handleNavigation(e, '/')}
        >
          Home
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls='basic-navbar-nav' />
        <BootstrapNavbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            {!user ? (
              <>
                <Nav.Link 
                  as="a" 
                  href="/login" 
                  onClick={(e) => handleNavigation(e, '/login')}
                >
                  Login
                </Nav.Link>
                <Nav.Link 
                  as="a" 
                  href="/register" 
                  onClick={(e) => handleNavigation(e, '/register')}
                >
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                <div className='d-flex align-items-center'>
                  <span className='me-3'>Welcome, {user.username}</span>
                  <Button variant='danger' onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar
