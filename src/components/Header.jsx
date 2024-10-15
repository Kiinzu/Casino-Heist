import React from 'react';
import '../App.css'; 
import casinoheistLogo from "../assets/images/sidebar-logo.png";

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo-section">
        <img src={casinoheistLogo} alt="Casino-Heist-Logo" className="header-logo" />
      </div>
      <div className="auth-buttons">
        <a href="/login"><button className="login-btn">Login</button></a>
        <a href="/signup"><button className="signup-btn">Sign Up</button></a>
      </div>
    </header>
  );
};

export default Header;
