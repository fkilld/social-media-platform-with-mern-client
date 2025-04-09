import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../axios'

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

const handleSubmit = async (e) => {
  e.preventDefault()
  await api.post('/users/register', form)
  navigate('/login')
}

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        name='username'
        placeholder='Username'
        onChange={handleChange}
        required
      />
      <input
        name='email'
        placeholder='Email'
        onChange={handleChange}
        required
      />
      <input
        name='password'
        type='password'
        placeholder='Password'
        onChange={handleChange}
        required
      />
      <button type='submit'>Register</button>
    </form>
  )
}

export default Register
