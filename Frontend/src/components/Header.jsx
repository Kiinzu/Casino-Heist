import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Import Link
import '../App.css';
import casinoheistLogo from "../assets/images/sidebar-logo.png";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate(); // Initialize navigate for redirection
  const location = useLocation(); // Track the current route location
  const apiURL = import.meta.env.VITE_BACKEND_IP; // Use the API URL from environment variable

  // Function to validate token from the backend (if not valid, show login/signup)
  const validateToken = async (token) => {
    try {
      console.log(apiUrl);
      const response = await fetch(`${apiURL}/validate-token`, {
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

  const handleHomeClick = async () => {
    navigate('/');
  }

  const handleLoginClick = async () => {
    navigate('/login');
  }

  const handleSignUpClick = async () => {
    navigate('/signup');
  }

  const handleLogout = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    try {
      const response = await fetch(`${apiURL}/logout`, {
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
          <img src={casinoheistLogo} alt="Casino-Heist-Logo" className="header-logo" onClick={handleHomeClick} />
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
            <button className="login-btn" onClick={handleLoginClick}>Login</button>
            <button className="signup-btn" onClick={handleSignUpClick}>Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
