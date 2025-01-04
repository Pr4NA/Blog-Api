import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
// import { Link } from "react-router-dom";
import "./viewAll.css" ;


function ViewAll() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [visibleComments, setVisibleComments] = useState({}); // Track visible comments per post
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwt') ;
        const response = await axios.get('http://localhost:8000/api/viewAll',
          {
            headers: {
            Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data); // Assuming response data contains the list of posts
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId], // Toggle visibility for the specific post
    }));
  };

  const handleAddComment = (postId) => {
    navigate(`/${postId}/addComment`);
  };

  async function handleLogOut(){
      try {
        // Remove the JWT token from localStorage
        localStorage.removeItem('jwt');
    
        // Optionally notify the server about the logout (if needed)
        // Uncomment the following lines if there's a server logout endpoint:
        // await axios.post('http://localhost:8000/api/logout', {}, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        //   },
        // });
    
        // Navigate to the login page
        navigate('/'); // Adjust the path to your login route
      } catch (error) {
        console.error('Error during logout:', error);
        alert('Failed to log out. Please try again.');
      }
  }

  return (
    <div>
      <h1>All Posts</h1>
      {error && <p className="error">{error}</p>}
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h2>{post.title}</h2>
            <p>Author: {post.user.username}</p>
            <p>{post.body}</p>
            <button className='comment-btn' onClick={() => toggleComments(post.id)}>
              {visibleComments[post.id] ? 'Hide Comments' : 'View Comments'}
            </button>
            {visibleComments[post.id] && (
              <div className="comments">
                <h3>Comments:</h3>
                {post.comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <p>{comment.body}</p>
                    <p>- {comment.user.username}</p>
                  </div>
                ))}
                <button className='comment-btn' onClick={() => handleAddComment(post.id)}>
                  Add New Comment
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className='logout' onClick={handleLogOut}>LogOut</button>
    </div>
  );
}

export default ViewAll;
