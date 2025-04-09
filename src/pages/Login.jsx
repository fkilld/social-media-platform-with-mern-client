import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../axios'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await api.post('/users/login', form)
    navigate('/')
  } catch (err) {
    alert('Login failed: ' + err.response?.data?.message || 'Server error')
  }
}


  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        name='email'
        onChange={handleChange}
        placeholder='Email'
        required
      />
      <input
        name='password'
        type='password'
        onChange={handleChange}
        placeholder='Password'
        required
      />
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login
