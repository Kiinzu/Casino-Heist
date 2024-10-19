import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Dashboard = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = async () => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        if (!token) {
            alert('No token found');
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }), // Send the token to logout endpoint
            });

            if (response.ok) {
                // Successfully logged out
                localStorage.removeItem('token'); // Remove token from localStorage
                alert('Logout successful');
                navigate('/login'); // Redirect to login page
            } else {
                const data = await response.json();
                alert(`Logout failed: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error during logout:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <p>Welcome to the Dashboard!</p>

            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
