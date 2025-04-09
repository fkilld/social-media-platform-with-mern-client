import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchUserProfile, logoutUser } from '../auth'

function Navbar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkLogin = async () => {
      const userData = await fetchUserProfile()
      setUser(userData)
    }
    checkLogin()
  }, [])

  const handleLogout = async () => {
    await logoutUser()
    setUser(null)
    navigate('/login')
  }

  return (
    <nav>
      <Link to='/'>Home</Link>
      {!user ? (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </>
      ) : (
        <>
          <span>Hello, {user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  )
}

export default Navbar
