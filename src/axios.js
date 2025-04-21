import axios from 'axios'

/**
 * Axios API Client Configuration
 * 
 * This file creates and exports a pre-configured Axios instance for making
 * HTTP requests to our backend API.
 * 
 * @module api
 */

/**
 * Configured Axios instance for API requests
 * 
 * @constant {Object} api
 * @property {string} baseURL - The base URL for all API requests
 * @property {boolean} withCredentials - Whether to send cookies with requests
 */
const api = axios.create({
  // Set the base URL for all API requests to our backend server
  baseURL: 'http://localhost:8000/api',
  
  // Enable sending cookies with cross-origin requests
  // This is essential for authentication as it allows the JWT token
  // stored in cookies to be sent with each request
  withCredentials: true,
})

export default api
