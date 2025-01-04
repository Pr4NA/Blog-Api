import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

// eslint-disable-next-line react/prop-types
const CreateComment = ({ postId }) => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({ body: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/viewAll/${postId}/createComment`);
        const { fields } = response.data.form ;

        setFormFields(fields);
      } catch (error) {
        console.error('Error fetching form fields:', error);
      }
    };
    fetchForm();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt'); // Or however you store the token
      const response = await axios.post(
        `http://localhost:8000/api/viewAll/${postId}/createComment`,
          formData,
          {
            headers: {
            Authorization: `Bearer ${token}`,
            },
          }
);

      setMessage(response.data.message || 'Comment added successfully.');
      navigate(`/viewAll`) ;
    } catch (error) {
      const serverResponse = error.response?.data;
      setMessage(serverResponse?.message || 'An error occurred while submitting your comment.');
    }
  };

  return (
    <div className="body">
      <h1 className="createCommentHeading">Add Your Comment</h1>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.name} style={{ marginBottom: '15px' }}>
            <label htmlFor={field.name}>
              {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {message && (
        <p
          style={{
            color: message.includes('success') ? 'green' : 'red',
          }}
          className="message"
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateComment ;