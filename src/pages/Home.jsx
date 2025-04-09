import { useEffect, useState } from 'react'
import api from '../axios'
import PostForm from './PostForm'

function Home() {
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)

  const fetchPosts = async () => {
    const res = await api.get('/posts')
    setPosts(res.data)
  }

  const deletePost = async (id) => {
    if (window.confirm('Delete this post?')) {
      await api.delete(`/posts/${id}`)
      fetchPosts()
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
      <h2>All Posts</h2>
      <PostForm
        fetchPosts={fetchPosts}
        editPost={editingPost}
        onCancel={() => setEditingPost(null)}
      />
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>By: {post.author.username}</small>
            <br />
            <button onClick={() => setEditingPost(post)}>Edit</button>
            <button onClick={() => deletePost(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
