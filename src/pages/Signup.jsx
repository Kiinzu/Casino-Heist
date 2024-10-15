import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Import your global CSS or specific CSS file

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic client-side validation before sending the request
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Send POST request to backend /register route
    fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Convert formData to JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to register');
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data.message);
          setTimeout(() => {
            // Redirect to login page after a short delay
            navigate('/login');
          }, 2000); // Delay for 2 seconds
        }
      })
      .catch((error) => {
        setError('An error occurred. Please try again.');
        console.error('Error:', error);
      });
  };

  return (
    <div className='signup-main'>
      <div className="signup-container">
        <h1>Play Casino Heist Now</h1>
        <p>Outsmart the odds, crack the code—your blockchain skills are the key to escape!</p>

        {message && <p className="signup-success">{message}</p>}
        {error && <p className="signup-error">{error}</p>}

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
            Email*
            <input
              type="email"
              name="email"
              placeholder="E.g Richard"
              value={formData.email}
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

          <label>
            Confirm Password*
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </label>

          <button type="submit" className="signup-button">SIGN UP</button>
        </form>

        <p className="signup-footer">
          Already have an account? <Link to="/login" className="login-link">Login</Link> Now!
        </p>
      </div>
    </div>
  );
};

export default Signup;
