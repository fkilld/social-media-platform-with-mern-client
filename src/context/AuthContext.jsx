import { createContext, useContext, useState, useEffect } from 'react'
import { fetchUserProfile } from '../auth'

/**
 * Authentication Context
 * 
 * This module provides a React Context for managing authentication state throughout the application.
 * It handles user authentication status, loading states, and authentication-related actions.
 * 
 * We're using a Context-based approach because:
 * - It allows any component in the component tree to access authentication state
 * - It centralizes authentication logic in one place
 * - It prevents prop drilling through multiple component layers
 * - It provides a clean API for components to interact with auth functionality
 */

// Create a context for authentication data
const AuthContext = createContext()

/**
 * Authentication Provider Component
 * 
 * Wraps the application and provides authentication state and functions to all children.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to auth context
 * @returns {React.ReactElement} Provider component with auth context
 */
export function AuthProvider({ children }) {
  // Track the authenticated user
  const [user, setUser] = useState(null)
  // Track loading state during authentication checks
  const [loading, setLoading] = useState(true)

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Attempt to fetch the user profile from the server
        const userData = await fetchUserProfile()
        setUser(userData)
      } catch (error) {
        console.error('Authentication check failed:', error)
        // If there's an error, clear the user state
        // This handles cases where the token is invalid or expired
        setUser(null)
      } finally {
        // Always mark loading as complete when the check is done
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  /**
   * Sets the user state after successful login
   * 
   * @param {Object} userData - The user data returned from the server
   */
  const login = (userData) => {
    setUser(userData)
  }

  /**
   * Clears the user state for logout
   * Note: This should be used alongside the actual logout API call
   */
  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Custom hook to use the authentication context
 * 
 * Provides a convenient way for components to access the auth context
 * 
 * @returns {Object} Authentication context object with user, loading state, and auth functions
 * @throws {Error} If used outside of an AuthProvider
 */
export function useAuth() {
  return useContext(AuthContext)
}
