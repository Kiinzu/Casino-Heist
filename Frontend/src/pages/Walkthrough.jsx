import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import cornerIcon from "../assets/images/corner-icon.png";
import '../App.css'; // Import the CSS file

// Import all art assets
import cheapglitchArt from '../assets/Properties/blockchain-cheap-glitch/art.png';
import entrypointArt from '../assets/Properties/blockchain-entry-point/art.png';
import barArt from '../assets/Properties/blockchain-bar/art.png';
import rouletteArt from '../assets/Properties/blockchain-roulette/art.png';
import blackjackArt from '../assets/Properties/blockchain-master-of-blackjack/art.png';
import votingfrenzyArt from '../assets/Properties/blockchain-voting-frenzy/art.png';
import vvvipmemberArt from '../assets/Properties/blockchain-vvvip-member/art.png';
import injubankArt from '../assets/Properties/blockchain-inju-bank/art.png';
import silentDealerArt from '../assets/Properties/blockchain-silent-dealer/art.png';
import singularentityArt from '../assets/Properties/blockchain-singular-entity/art.png';
import unlimitedCreditArt from '../assets/Properties/blockchain-unlimited-credit-line/art.png';
import symbolofnobleArt from '../assets/Properties/blockchain-symbol-of-noble/art.png';
import casinovaultArt from '../assets/Properties/blockchain-casino-vault/art.png';

const Walkthrough = () => {
    const [challenges, setChallenges] = useState([]);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false); // Manage confirmation popup
    const [selectedChallengeCode, setSelectedChallengeCode] = useState(null); // Store selected challenge code
    const [solved, setSolved] = useState(false);
    const selectorRef = useRef(null);
    const navigate = useNavigate();

    // Map of challenge codes to corresponding images
    const challengeArtMap = {
        'blockchain-cheap-glitch': cheapglitchArt,
        'blockchain-entry-point': entrypointArt,
        'blockchain-bar': barArt,
        'blockchain-roulette': rouletteArt,
        'blockchain-master-of-blackjack': blackjackArt,
        'blockchain-voting-frenzy': votingfrenzyArt,
        'blockchain-vvvip-member': vvvipmemberArt,
        'blockchain-inju-bank': injubankArt,
        'blockchain-silent-dealer': silentDealerArt,
        'blockchain-singular-entity': singularentityArt,
        'blockchain-unlimited-credit-line': unlimitedCreditArt,
        'blockchain-symbol-of-noble': symbolofnobleArt,
        'blockchain-casino-vault' : casinovaultArt
    };

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
                console.log("Fetched Data:", data);
                setChallenges(data);
            })
            .catch((error) => console.error('Error fetching challenges:', error));
    }, []);

    const checkIfSolved = async (challengeCode) => {
        const token = localStorage.getItem('token');
        console.log(token);
        try {
            const response = await fetch(`http://127.0.0.1:5000/challenge-status/${challengeCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const result = await response.json();
            // console.log(result.isSolved);
            return result.isSolved === 1; // Return true or false directly
        } catch (error) {
            console.error(error);
            return false; // Return false in case of an error
        }
    };
    
    // Handle click to navigate to the guide page with challengeCode
    const handleChallengeClick = async (challengeCode) => {
        try {
            const isSolved = await checkIfSolved(challengeCode); // Wait for the result
            // console.log("Challenge Code:", challengeCode);
            // console.log("Condition is:", isSolved);
    
            if (!isSolved) { // If not solved, show confirmation popup
                setSelectedChallengeCode(challengeCode);
                setIsConfirmPopupOpen(true);
            } else { // If solved, navigate to the guide
                navigate(`/guide/${challengeCode}`);
                setSolved(false); // Reset solved state
            }
        } catch (error) {
            console.error("Error handling challenge click:", error);
        }
    };
    
    
    const handleConfirmYes = () =>{
        navigate(`/guide/${selectedChallengeCode}`);
        setIsConfirmPopupOpen(false);
        console.log(solved, "test");
    }

    const handleConfirmNo = () =>{
        setIsConfirmPopupOpen(false);
        console.log(solved);
    }

    return (
        <div className="walkthrough-container">
            <h1>Walkthrough</h1>
            <div className="walkthrough-grid">
                {challenges.length > 0 ? (
                    // Filter and display only "common" difficulty challenges
                    challenges
                        .filter((challenge) => challenge.challengeDifficulty === 'common')
                        .map((challenge) => (
                            <div
                                className="walkthrough-box"
                                key={challenge.challengeId}
                                onClick={() => handleChallengeClick(challenge.challengeCode)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={challengeArtMap[challenge.challengeCode] || cornerIcon} // Use dynamic icon or fallback to cornerIcon
                                    alt={challenge.challengeName}
                                    className="walkthrough-icon"
                                />
                                <img
                                    src={cornerIcon}
                                    alt="corner icon"
                                    className="walkthrough-corner-icon"
                                />
                                {/* <p className="walkthrough-challenge-name">{challenge.challengeName}</p> */}
                            </div>
                        ))
                ) : (
                    <p>Loading challenges...</p>
                )}
            </div>
            {/* Confirmation Popup */}
            {isConfirmPopupOpen && (
                <div className="popup-overlay">
                <div className="popup-content-walkthrough">
                    <p>Are you sure you want to start this challenge?</p>
                    <button onClick={handleConfirmYes} className='button-one'>Yes</button>
                    <button onClick={handleConfirmNo} className='button-two'>No</button>
                </div>
                </div>
            )}
        </div>
    );
};

export default Walkthrough;