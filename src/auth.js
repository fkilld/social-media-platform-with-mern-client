import api from './axios'

// Get current user's profile using cookie-based token
export const fetchUserProfile = async () => {
  try {
    const res = await api.get('/users/profile')
    return res.data // returns user object
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

// Logout user by clearing the cookie
export const logoutUser = async () => {
  await api.post('/users/logout')
}
