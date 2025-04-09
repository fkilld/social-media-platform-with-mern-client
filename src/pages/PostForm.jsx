import { useState, useEffect } from 'react'
import api from '../axios'

function PostForm({ fetchPosts, editPost = null, onCancel }) {
  const [form, setForm] = useState({ title: '', content: '' })

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
      alert('Error: ' + err.response?.data?.message || 'Server error')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='title'
        value={form.title}
        onChange={handleChange}
        placeholder='Title'
        required
      />
      <textarea
        name='content'
        value={form.content}
        onChange={handleChange}
        placeholder='Content'
        required
      />
      <button type='submit'>{editPost ? 'Update' : 'Create'} Post</button>
      {editPost && <button onClick={onCancel}>Cancel</button>}
    </form>
  )
}

export default PostForm
