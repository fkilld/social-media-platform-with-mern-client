import { useEffect, useState } from 'react'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import api from '../axios'
import PostForm from './PostForm'

function Home() {
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    console.log('Updated posts state:', posts)
  }, [posts])

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
