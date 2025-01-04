import { useState } from 'react';
import axios from 'axios';
import "./LogIn.css" ;
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom' ;

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate() ;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault() ;
    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
      const token = response.data.token;
      localStorage.setItem('jwt', token);
      setMessage('Login successful!');
      navigate(`/viewAll`) ;
    } catch (error) {
      setMessage(error.response?.data || 'Error logging in');
    }
  };

  return (
    <div className="body">
      <h1 className="logInHeading">Log In</h1>
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
      <div>Do not have an Account!</div>
      <Link to="signup">Sign-Up</Link>
    </div>
  );
};
export default Login;
