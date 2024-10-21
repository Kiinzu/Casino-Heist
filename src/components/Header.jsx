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
      const apiUrl = import.meta.env.VITE_BACKEND_IP; // Use the API URL from environment variable
      console.log(apiUrl);
      const response = await fetch(`${apiUrl}/validate-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
    navigate('/profile'); // Redirect to the profile on click
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
  
    try {
      const response = await fetch('http://127.0.0.1:5000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (response.ok) {
        console.log('Logged out successfully');
      } else {
        console.error('Failed to log out:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      localStorage.removeItem('token');
      setIsLoggedIn(false); // Update login state
      navigate('/'); // Redirect to home or login page
    }
  };

  return (
    <header className="header-container">
      <div className="logo-section">
        <img src={casinoheistLogo} alt="Casino-Heist-Logo" className="header-logo" />
      </div>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <>
            <button className="profile-btn" onClick={handleProfileClick}>
              Profile
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
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
