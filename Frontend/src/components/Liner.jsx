// Copyright.js
import React from 'react';
import '../App.css'; // Import the CSS file

const Liner = () => {
    const currentYear = new Date().getFullYear(); // Dynamically get the current year

    return (
        <div className="liner-container">
            <hr className="thin-line" />
        </div>
    );
};

export default Liner;
