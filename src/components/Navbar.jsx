import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../auth'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
      logout()
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  if (loading) {
    return <nav className='navbar'>Loading...</nav>
  }

  return (
    <nav className='navbar'>
      <div className='nav-brand'>
        <Link to='/'>Home</Link>
      </div>
      <div className='nav-links'>
        {!user ? (
          <>
            <Link to='/login' className='nav-link'>
              Login
            </Link>
            <Link to='/register' className='nav-link'>
              Register
            </Link>
          </>
        ) : (
          <div className='user-section'>
            <span className='welcome-text'>Welcome, {user.username}</span>
            <button onClick={handleLogout} className='logout-btn'>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
