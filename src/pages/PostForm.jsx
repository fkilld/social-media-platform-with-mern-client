import { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import api from '../axios'

function PostForm({ fetchPosts, editPost = null, onCancel }) {
  const [form, setForm] = useState({ title: '', content: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    if (editPost) setForm({ title: editPost.title, content: editPost.content })
  }, [editPost])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

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
