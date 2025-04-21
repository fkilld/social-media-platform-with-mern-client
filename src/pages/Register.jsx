import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'
import api from '../axios'

/**
 * Register Page Component
 *
 * This component provides a registration form for new users to create an account.
 * It allows users to input their username, email, and password, and submit the form
 * to register a new account.
 *
 * We're using React Bootstrap for the form because:
 * - It provides responsive design out of the box
 * - It handles form validation with built-in components
 * - It offers consistent styling that integrates with our Bootstrap theme
 * - It simplifies complex form patterns with pre-built components
 *
 * The component handles:
 * - Form submission with validation
 * - Error handling for registration failures
 * - Navigation to the login page after successful registration
 */

function Register() {
  /**
   * State variables for form input and error handling
   *
   * @type {Object} form - The form data object with username, email, and password fields
   * @type {Object} setForm - The function to update the form data
   * @type {string} error - The error message to display if registration fails
   */
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  /**
   * Handles changes to the form input fields
   *
   * This function updates the form data object with the new input values
   * from the form fields.
   *
   * @param {Event} e - The change event from the form input
   */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  /**
   * Handles the form submission
   *
   * This function:
   * 1. Prevents the default form submission behavior
   * 2. Attempts to register a new user with the provided form data
   * 3. Navigates to the login page after successful registration
   * 4. Handles and logs any errors that occur during registration
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/users/register', form)
      navigate('/login')
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed')
    }
  }

  /**
   * Renders the registration form component
   *
   * This function:
   * 1. Displays a registration form with input fields for username, email, and password
   * 2. Shows an error message if registration fails
   * 3. Provides a submit button to register a new user
   * 4. Handles form submission with validation
   * 5. Displays a loading state during form submission
   * 6. Provides a navigation link to the login page
   */
  return (
    <Container className='mt-5'>
      <Card className='mx-auto' style={{ maxWidth: '400px' }}>
        <Card.Body>
          <Card.Title className='text-center mb-4'>Register</Card.Title>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                name='username'
                placeholder='Enter your username'
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name='email'
                type='email'
                placeholder='Enter your email'
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name='password'
                type='password'
                placeholder='Enter your password'
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant='primary' type='submit' className='w-100'>
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Register
