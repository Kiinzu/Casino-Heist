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

  const [message, setMessage] = useState(null); // Store success or error message
  const [isError, setIsError] = useState(false); // Track if the message is an error
  const navigate = useNavigate(); // Initialize useNavigate
  const apiURL = import.meta.env.VITE_BACKEND_IP; // Use the API URL from environment variable

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showMessage('Passwords do not match', true);
      return;
    }

    fetch(`${apiURL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to register');
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          showMessage(data.error, true);
        } else {
          showMessage('Registration successful!', false);
          setTimeout(() => navigate('/login'), 1000); // Redirect after 2 seconds
        }
      })
      .catch((error) => {
        showMessage('An error occurred. Please try again.', true);
        console.error('Error:', error);
      });
  };

  const showMessage = (msg, isError) => {
    setMessage(msg);
    setIsError(isError);

    // Auto-hide the message after 3 seconds
    setTimeout(() => setMessage(null), 1000);
  };

  return (
    <div className="signup-main">
      {message && (
        <div className={`message-box ${isError ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="signup-container">
        <h1>Register</h1>
        <p>Create your unique Identity--</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            Username*
            <input
              type="text"
              name="username"
              placeholder="E.g Klonberg"
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
              placeholder="E.g test@enuma.io"
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
