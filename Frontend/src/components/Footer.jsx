import React from 'react';
import '../App.css'; 
import githubIcon from '../assets/images/github-logo.png'; 
import discordIcon from '../assets/images/discord-logo.png';
import enumaIcon from "../assets/images/2.png";

const Footer = () => {
  const currentYear = new Date().getFullYear(); 
  return (
    <div className="footer-container">
      {/* <div className='footer-logo'>
        <img src={enumaIcon} className='social-icon' />
      </div> */}

      <div className="footer-section">
        <h4>Help</h4>
        <ul>
          <li><a href="/documentation">Documentation</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Join Our Community</h4>
        <div className="social-icons">
          <a href="https://github.com/Kiinzu/CASINO-HEIST" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="GitHub" className="social-icon" />
          </a>
          <a href="https://discord.gg/scwfGkERsj" target="_blank" rel="noopener noreferrer">
            <img src={discordIcon} alt="Discord" className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
