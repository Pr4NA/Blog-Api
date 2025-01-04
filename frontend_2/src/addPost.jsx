import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const CreatePost = () => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({ title: '', body: '', isPublish: false });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/createPost`);
        const { fields } = response.data.form;

        setFormFields(fields);
      } catch (error) {
        console.error('Error fetching form fields:', error);
      }
    };
    fetchForm();
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    // Handle checkbox type inputs
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.post(
        `http://localhost:8000/api/createPost`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message || 'Comment added successfully.');
      navigate(`/viewYours`);
    } catch (error) {
      const serverResponse = error.response?.data;
      setMessage(serverResponse?.message || 'An error occurred while submitting your comment.');
    }
  };

  return (
    <div className="body">
      <h1 className="createPostHeading">Add Your Comment</h1>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.name} style={{ marginBottom: '15px' }}>
            <label htmlFor={field.name}>
              {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
            </label>
            {field.type === 'checkbox' ? (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                checked={formData[field.name] || false}
                onChange={handleChange}
              />
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={handleChange}
              />
            )}
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

export default CreatePost;
