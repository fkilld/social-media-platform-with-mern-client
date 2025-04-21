import { useEffect, useState } from 'react'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import api from '../axios'
import PostForm from './PostForm'

/**
 * Home Page Component
 * 
 * This component displays a list of all posts and allows users to create new posts.
 * It also provides functionality to edit and delete existing posts.
 * 
 * We're using React Bootstrap for the component because:
 * - It provides responsive design out of the box
 * - It handles form validation with built-in components
 * - It offers consistent styling that integrates with our Bootstrap theme
 * - It simplifies complex form patterns with pre-built components
 *
 * The component handles:
 * - Displaying a list of all posts
 * - Creating new posts
 * - Editing existing posts
 * - Deleting posts
 * - Loading state display during post operations
 * - Error handling for post operations
 */

function Home() {
  /**
   * State variables for managing posts, editing post, loading state, and error handling
   * 
   * @type {Object} posts - The list of posts to display
   * @type {Object} editingPost - The post being edited
   * @type {boolean} loading - Whether the posts are being loaded
   * @type {string} error - The error message to display if post operations fail
   */
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /**
   * Fetches all posts from the server
   * 
   * This function:
   * 1. Sets the loading state to true
   * 2. Attempts to fetch all posts from the server
   * 3. Updates the posts state with the fetched posts
   * 4. Handles and logs any errors that occur during post fetching
   */
  const fetchPosts = async () => {
    try {
      setLoading(true)
      const res = await api.get('/posts')
      console.log('Posts response:', res.data)

      // Access the posts array within the response object
      const postsArray = res.data?.posts || []
      setPosts(Array.isArray(postsArray) ? postsArray : [])

      setError(null)
    } catch (error) {
      console.error('Error fetching posts:', error)
      setError('Failed to load posts. Please try again later.')
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  /**
   * Deletes a post from the server
   * 
   * This function:
   * 1. Confirms the deletion with the user
   * 2. Attempts to delete the post from the server
   * 3. Refetches the posts after deletion
   * 4. Handles and logs any errors that occur during post deletion
   */
  const deletePost = async (id) => {
    if (window.confirm('Delete this post?')) {
      try {
        await api.delete(`/posts/${id}`)
        fetchPosts()
      } catch (error) {
        console.error('Error deleting post:', error)
        alert('Failed to delete post')
      }
    }
  }

  /**
   * Fetches posts when the component mounts
   * 
   * This effect:
   * 1. Runs when the component mounts
   * 2. Calls the fetchPosts function to load posts
   */
  useEffect(() => {
    fetchPosts()
  }, [])

  /**
   * Logs the updated posts state
   * 
   * This effect:
   * 1. Logs the updated posts state to the console
   * 2. Runs when the posts state changes
   */
  useEffect(() => {
    console.log('Updated posts state:', posts)
  }, [posts])

  /**
   * Renders the home page component
   * 
   * This function:
   * 1. Displays a container with the title "All Posts"
   * 2. Displays a card with the form for creating and editing posts
   * 3. Displays a list of all posts in a grid layout
   * 4. Displays a loading state while posts are being loaded
   * 5. Displays an error message if posts fail to load
   * 6. Provides a button to refresh the posts
   */
  return (
    <Container className='mt-4'>
      <h2 className='mb-4'>All Posts</h2>
      <Card className='mb-4'>
        <Card.Body>
          <PostForm
            fetchPosts={fetchPosts}
            editPost={editingPost}
            onCancel={() => setEditingPost(null)}
          />
        </Card.Body>
      </Card>
      <Row>
        {loading ? (
          <Col>
            <Card>
              <Card.Body>
                <Card.Text className='text-center'>Loading posts...</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ) : error ? (
          <Col>
            <Card>
              <Card.Body>
                <Card.Text className='text-center error-message'>
                  {error}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ) : Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <Col key={post._id} xs={12} md={6} lg={4} className='mb-4'>
              <Card>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.content}</Card.Text>
                  <Card.Footer className='text-muted'>
                    By: {post.author?.username || 'Unknown user'}
                  </Card.Footer>
                  <div className='mt-3'>
                    <Button
                      variant='outline-primary'
                      className='me-2'
                      onClick={() => setEditingPost(post)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant='outline-danger'
                      onClick={() => deletePost(post._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <Card.Text className='text-center'>
                  No posts available
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
      <div className='mt-4 text-center'>
        <Button variant='outline-secondary' onClick={fetchPosts}>
          Refresh Posts
        </Button>
      </div>
    </Container>
  )
}

export default Home
