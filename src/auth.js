import api from './axios'

/**
 * Authentication Utility Functions
 * 
 * This module provides functions for handling user authentication operations
 * such as fetching the current user's profile and logging out.
 * 
 * We're using cookie-based JWT authentication where:
 * - The server sets an HTTP-only cookie containing the JWT token
 * - This cookie is automatically sent with each request due to the 
 *   withCredentials: true setting in our axios configuration
 * - This approach is more secure than storing tokens in localStorage
 */

/**
 * Fetches the current user's profile information
 * 
 * Makes an authenticated request to the server to retrieve the current user's
 * profile data. The authentication is handled via the HTTP-only cookie
 * that contains the JWT token.
 * 
 * @returns {Promise<Object|null>} The user object if successful, null if failed
 */
export const fetchUserProfile = async () => {
  try {
    const res = await api.get('/users/profile')
    return res.data // returns user object with details like username, email, etc.
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

/**
 * Logs out the current user
 * 
 * Sends a request to the server to invalidate the current session and
 * clear the authentication cookie. The server will respond by setting
 * an expired cookie to replace the current one.
 * 
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  await api.post('/users/logout')
}
