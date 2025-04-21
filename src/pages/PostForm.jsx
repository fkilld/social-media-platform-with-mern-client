import { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import api from '../axios'

/**
 * PostForm Component
 *
 * This component provides a form for creating and updating posts.
 * It allows users to input a title and content for a post, and submit the form
 * to create or update a post.
 *
 * We're using React Bootstrap for the form because:
 * - It provides responsive design out of the box
 * - It handles form validation with built-in components
 * - It offers consistent styling that integrates with our Bootstrap theme
 * - It simplifies complex form patterns with pre-built components
 *
 * The component handles:
 * - Form submission with validation
 * - Error handling for post creation and update failures
 * - Navigation to the home page after successful post operation
 */

function PostForm({ fetchPosts, editPost = null, onCancel }) {
  /**
   * State variables for form input and error handling
   *
   * @type {Object} form - The form data object with title and content fields
   * @type {Object} setForm - The function to update the form data
   * @type {string} error - The error message to display if post operation fails
   */
  const [form, setForm] = useState({ title: '', content: '' })
  const [error, setError] = useState('')

  /**
   * Effect hook to update the form data when editing a post
   *
   * This effect:
   * 1. Checks if the editPost prop is provided
   * 2. If true, updates the form data with the editPost's title and content
   * 3. Runs when the editPost prop changes
   */
  useEffect(() => {
    if (editPost) setForm({ title: editPost.title, content: editPost.content })
  }, [editPost])

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
   * 2. Attempts to create or update a post with the provided form data
   * 3. Navigates to the home page after successful post operation
   * 4. Handles and logs any errors that occur during post operation
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editPost) {
        await api.put(`/posts/${editPost._id}`, form)
      } else {
        await api.post('/posts', form)
      }
      fetchPosts()
      setForm({ title: '', content: '' })
      if (onCancel) onCancel()
    } catch (err) {
      setError(err.response?.data?.message || 'Server error')
    }
  }

  /**
   * Renders the post form component
   *
   * This function:
   * 1. Displays a form with input fields for title and content
   * 2. Shows an error message if post operation fails
   * 3. Provides a submit button to create or update a post
   * 4. Handles form submission with validation
   * 5. Displays a loading state during form submission
   * 6. Provides a navigation link to the home page
   */

  /**
   * Renders the post form component
   *
   * This function:
   * 1. Displays a form with input fields for title and content
   * 2. Shows an error message if post operation fails
   * 3. Provides a submit button to create or update a post
   * 4. Handles form submission with validation
   * 5. Displays a loading state during form submission
   * 6. Provides a navigation link to the home page
   */
  
  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form.Group className='mb-3'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          name='title'
          value={form.title}
          onChange={handleChange}
          placeholder='Enter post title'
          required
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          name='content'
          value={form.content}
          onChange={handleChange}
          placeholder='Enter post content'
          required
        />
      </Form.Group>
      <div className='d-flex gap-2'>
        <Button variant='primary' type='submit'>
          {editPost ? 'Update' : 'Create'} Post
        </Button>
        {editPost && (
          <Button variant='secondary' onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </Form>
  )
}

export default PostForm
