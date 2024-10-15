import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ethereumFeature from "../assets/images/ethereum-coins.png";
import '../App.css'; // Import the CSS file

const Walkthrough = () => {
    const [challenges, setChallenges] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch the challenges from the Flask API when the component mounts
    useEffect(() => {
        fetch('http://127.0.0.1:5000/Challenge')
        .then((response) => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log("Fetched Data:", data); // Debugging: Check fetched data
            setChallenges(data); // Store the fetched data in the state
        })
        .catch((error) => console.error('Error fetching challenges:', error));
    }, []);

    // Handle click to navigate to the guide page with challengeName
    const handleChallengeClick = (challengeCode) => {
        navigate(`/guide/${challengeCode}`); // Redirect to /guide/challengeName
    };

    return (
        <div className="challenge-container">
        <h1>Walkthrough</h1>
        <div className="challenge-grid">
            {challenges.length > 0 ? (
                challenges.map((challenge) => (
                    // Check if the challengeDifficulty is "common"
                    challenge.challengeDifficulty === "common" ? (
                    <div
                        className="challenge-box"
                        key={challenge.challengeId}
                        onClick={() => handleChallengeClick(challenge.challengeCode)} // Call the click handler
                        style={{ cursor: 'pointer' }} // Change cursor to pointer for a clickable look
                    >
                        <img
                        src={ethereumFeature} // Replace with your icons
                        alt={challenge.challengeName} // Dynamically set alt based on challenge name
                        className="challenge-icon"
                        />
                        <p>{challenge.challengeName}</p> {/* Display challenge name */}
                    </div>
                    ) : null // Return null if challengeDifficulty is not "common"
                ))
            ) : (
            <p>Loading challenges...</p>
            )}
        </div>
        </div>
    );
};

export default Walkthrough;
