import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ethereumFeature from "../assets/images/ethereum-coins.png";
import '../App.css'; // Import the CSS file

const Challenge = () => {
  const [challenges, setChallenges] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetch('http://127.0.0.1:5000/Challenge')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        setChallenges(data);
      })
      .catch((error) => console.error('Error fetching challenges:', error));
  }, []);

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 'basic':
        return 'challenge-box-basic';
      case 'common':
        return 'challenge-box-common';
      case 'vip':
        return 'challenge-box-vip';
      default:
        return 'challenge-box';
    }
  };

  // Handle click to navigate to the Settings page with the challengeCode
  const handleChallengeClick = (challengeCode) => {
    navigate(`/heist/${challengeCode}`); // Redirect to Settings with challengeCode
  };

  return (
    <div className="challenge-container">
      <h1>Challenges</h1>
      <div className="challenge-grid">
        {challenges.length > 0 ? (
          challenges.map((challenge) => (
            <div
              className={getDifficultyClass(challenge.challengeDifficulty)}
              key={challenge.challengeId}
              onClick={() => handleChallengeClick(challenge.challengeCode)} // Call the click handler
            >
              <img
                src={ethereumFeature}
                alt={challenge.challengeName}
                className="challenge-icon"
              />
              <p>{challenge.challengeName}</p>
            </div>
          ))
        ) : (
          <p>Loading challenges...</p>
        )}
      </div>
    </div>
  );
};

export default Challenge;
