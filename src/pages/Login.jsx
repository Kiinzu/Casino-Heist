import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.jsx';

const Login = () => {
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
              Already have an account? <Link to="/login" className="login-link">Login</Link> Now!
            </p>
          </div>
        </div>
      );
    };

export default Login;