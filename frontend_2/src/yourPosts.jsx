import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./yourPosts.css" ;

function YourPosts() {
  const [myPosts, setMyPosts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get('http://localhost:8000/api/viewYours', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMyPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const handlePublish = async (postId) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.put(
        `http://localhost:8000/api/viewYours/${postId}/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message); // Adjusted to log the correct response message
      setMyPosts(myPosts.map((post) => 
        post.id === postId ? { ...post, isPublish: true } : post
      )); // Optimistically update the post's published status
    } catch (error) {
      console.error('Error publishing post:', error);
      setError('Failed to publish post. Please try again later.');
    }
  };

  function handleAddNewPost() {
    navigate("/addPost");
  }

  async function handleLogOut() {
    try {
      localStorage.removeItem('jwt');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Failed to log out. Please try again.');
    }
  }

  return (
    <div>
      <h1>Your Posts</h1>
      {error && <p className="error">{error}</p>}
      <div className="posts">
        {myPosts.map((post) => (
          <div key={post.id} className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div>
              {post.isPublish ? (
                <p>Published</p>
              ) : (
                <div>
                  <p>Not published yet</p>
                  <button className='publish-btn' onClick={() => handlePublish(post.id)}>
                    Publish
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <button className='addNew-btn' onClick={handleAddNewPost}>Add New Post</button>
      </div>
      <button className='logout' onClick={handleLogOut}>LogOut</button>
    </div>
  );
}

export default YourPosts;
