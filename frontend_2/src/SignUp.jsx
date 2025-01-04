import { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import Validate from './signUpValidate';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = Validate(formData) ;
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8000/api/signup', formData);
        setMessage(response.data.message || 'Signup successful!') ;
      } catch (error) {
        setMessage(error.response?.data.message || 'Error signing up') ;
      }
    }
  };

  return (
    <div className="body">
      <h1 className="signUpHeading">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="input">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {message && (
        <p
          style={{ color: message.includes('successful') ? 'green' : 'red' }}
          className="message"
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Signup;
