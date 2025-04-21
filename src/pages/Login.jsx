import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Container, Form, Button, Alert, Card } from 'react-bootstrap'
import api from '../axios'

/**
 * Login Page Component
 * 
 * This component provides a login form for existing users to access their accounts.
 * It allows users to input their email and password, and submit the form to log in.
 * 
 * We're using React Bootstrap for the form because:
 * - It provides responsive design out of the box
 * - It handles form validation with built-in components
 * - It offers consistent styling that integrates with our Bootstrap theme
 * - It simplifies complex form patterns with pre-built components
 *   
 * The component handles:
 * - Form submission with validation
 * - Error handling for login failures
 * - Navigation to the home page after successful login
 */

function Login() {
  /**
   * State variables for form input and error handling
   * 
   * @type {Object} formData - The form data object with email and password fields
   * @type {Object} setFormData - The function to update the form data
   * @type {string} error - The error message to display if login fails
   */
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  /**
   * Navigation and authentication utilities
   * 
   * @type {Object} navigate - The navigation function from react-router-dom
   * @type {Object} login - The login function from the AuthContext
   */
  const navigate = useNavigate()
  const { login } = useAuth()

  /**
   * Handles the form submission
   * 
   * This function:
   * 1. Prevents the default form submission behavior
   * 2. Attempts to login with the provided form data
   * 3. Navigates to the home page after successful login
   * 4. Handles and logs any errors that occur during login
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/users/login', formData)
      login(response.data.user)
      navigate('/')
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed')
    }
  }

  /**
   * Handles changes to the form input fields
   * 
   * This function updates the form data object with the new input values
   * from the form fields.
   * 
   * @param {Event} e - The change event from the form input
   */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  /**
   * Renders the login form component
   * 
   * This function:
   * 1. Displays a login form with input fields for email and password
   * 2. Shows an error message if login fails
   * 3. Provides a submit button to login
   * 4. Handles form submission with validation
   * 5. Displays a loading state during form submission
   * 6. Provides a navigation link to the register page
   */

  /**
   * Renders the login form component
   * 
   * This function:
   * 1. Displays a login form with input fields for email and password
   * 2. Shows an error message if login fails
   * 3. Provides a submit button to login
   * 4. Handles form submission with validation
   * 5. Displays a loading state during form submission
   * 6. Provides a navigation link to the register page
   */

  return (
    <Container className='mt-5'>
      <Card className='mx-auto' style={{ maxWidth: '400px' }}>
        <Card.Body>
          <Card.Title className='text-center mb-4'>Login</Card.Title>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                placeholder='Enter your email'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                placeholder='Enter your password'
              />
            </Form.Group>
            <Button variant='primary' type='submit' className='w-100'>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login
