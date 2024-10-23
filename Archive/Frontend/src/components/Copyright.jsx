// Copyright.js
import React from 'react';
import '../App.css'; // Import the CSS file

const Copyright = () => {
    const currentYear = new Date().getFullYear(); // Dynamically get the current year

    return (
        <div className="copyright-container">
            <hr className="thin-line" />
            <p>© {currentYear} Enuma. All Rights Reserved.</p>
        </div>
    );
};

export default Copyright;
