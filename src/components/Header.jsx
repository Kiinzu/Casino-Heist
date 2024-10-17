import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for tracking route changes
import '../App.css'; 
import casinoheistLogo from "../assets/images/sidebar-logo.png";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate(); // Initialize navigate for redirection
  const location = useLocation(); // Track the current route location

  // Function to validate token from the backend (if not valid, show login/signup)
  const validateToken = async (token) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        setIsLoggedIn(true); // Mark user as logged in if the token is valid
      } else {
        localStorage.removeItem('token'); // Remove invalid token
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error validating token:', error);
      localStorage.removeItem('token'); // Remove token in case of error
      setIsLoggedIn(false);
    }
  };

  // Validate token on route change
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token); // Validate token on every route change
    } else {
      setIsLoggedIn(false); // No token, mark as not logged in
    }
  }, [location]); // Run this effect whenever the location changes

  const handleProfileClick = () => {
    navigate('/dashboard'); // Redirect to the dashboard on profile click
  };

  return (
    <header className="header-container">
      <div className="logo-section">
        <img src={casinoheistLogo} alt="Casino-Heist-Logo" className="header-logo" />
      </div>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <button className="profile-btn" onClick={handleProfileClick}>
            Profile
          </button>
        ) : (
          <>
            <a href="/login">
              <button className="login-btn">Login</button>
            </a>
            <a href="/signup">
              <button className="signup-btn">Sign Up</button>
            </a>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
