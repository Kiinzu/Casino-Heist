import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Import your global CSS or specific CSS file

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const displayNotification = (type, text) => {
    if (type === 'success') {
      setMessage(text);
    } else if (type === 'error') {
      setError(text);
    }

    // Clear the notification after 1 second
    setTimeout(() => {
      setMessage('');
      setError('');
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Invalid credentials');
        }
        return response.json();
      })
      .then((data) => {
        if (data.token) {
          // Save token in localStorage
          localStorage.setItem('token', data.token);
          displayNotification('success', 'Login successful!');
          setTimeout(() => {
            navigate('/'); // Redirect to home page
          }, 1000); // Delay for navigation
        } else if (data.error) {
          displayNotification('error', 'Invalid Credentials!');
        }
      })
      .catch((error) => {
        displayNotification('error', 'Invalid Credentials!');
      });
  };

  return (
    <div className='signup-main'>
      {message && (
        <div className="message-box success">
          {message}
        </div>
      )}
      {error && (
        <div className="message-box error">
          {error}
        </div>
      )}

      <div className="signup-container">
        <h1>Play Casino Heist Now</h1>
        <p>Outsmart the odds, crack the code—your blockchain skills are the key to escape!</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            Username*
            <input
              type="text"
              name="username"
              placeholder="E.g Kiinzu"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Password*
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </label>

          <button type="submit" className="signup-button">LOGIN</button>
        </form>

        <p className="signup-footer">
          Don't have an account? <Link to="/signup" className="login-link">Sign Up</Link> Now!
        </p>
      </div>
    </div>
  );
};

export default Login;
