import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Protected Route Component
 * 
 * This component serves as a wrapper for routes that require authentication.
 * It ensures that only authenticated users can access certain pages/routes
 * in the application.
 * 
 * How it works:
 * 1. It checks if the authentication is still being determined (loading state)
 * 2. If authentication is loading, it shows a loading indicator
 * 3. If the user is not authenticated (no user object), it redirects to the login page
 * 4. If the user is authenticated, it renders the protected content (children)
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The components/elements to render if authenticated
 * @returns {React.ReactElement} The protected content or a redirect
 */
function ProtectedRoute({ children }) {
  // Get authentication state from context
  const { user, loading } = useAuth()

  // Show loading state while authentication status is being determined
  if (loading) {
    return <div>Loading...</div>
  }

  // Redirect to login page if user is not authenticated
  // The 'replace' prop replaces the current entry in the history stack
  // instead of adding a new one, preventing navigation loops
  if (!user) {
    return <Navigate to='/login' replace />
  }

  // Render the protected content if user is authenticated
  return children
}

export default ProtectedRoute
