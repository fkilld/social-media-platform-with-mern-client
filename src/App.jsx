import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'

/**
 * Main App Component
 * 
 * This component is the root of the application and provides the main routing structure.
 * It wraps the application in an AuthProvider and uses a Router to manage the routes.
 * 
 * We're using React Router for the routing because:
 * - It provides a declarative way to manage routes in the application
 * - It allows for nested routes and route parameters
 * - It provides a way to protect routes from unauthorized access
 * - It simplifies the process of adding new routes to the application
 *
 * The component handles:
 * - Routing to the home page
 * - Routing to the login page
 * - Routing to the register page
 * - Providing a protected route for the home page
 * - Providing a navbar for the application
 * - Providing a footer for the application
 */


function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
