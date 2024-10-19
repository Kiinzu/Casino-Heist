import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cornerIcon from "../assets/images/corner-icon.png";
import '../App.css'; // Import the CSS file

// Import all art assets
import briefingArt from '../assets/Properties/blockchain-briefing/art.png';
import gearingupArt from '../assets/Properties/blockchain-gearing-up/art.png';
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
import doubleordelegateArt from '../assets/Properties/blockchain-double-or-delegate/art.png';
import injusgambitArt from '../assets/Properties/blockchain-injus-gambit/art.png';
import casinobankbusterArt from '../assets/Properties/blockchain-casino-bankbuster/art.png';
import executiveproblemsArt from '../assets/Properties/blockchain-executive-problems/art.png';

const Walkthrough = () => {
    const [challenges, setChallenges] = useState([]);
    const navigate = useNavigate();

    // Map of challenge codes to corresponding images
    const challengeArtMap = {
        'blockchain-briefing': briefingArt,
        'blockchain-gearing-up': gearingupArt,
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
        'blockchain-double-or-delegate': doubleordelegateArt,
        'blockchain-injus-gambit': injusgambitArt,
        'blockchain-casino-bankbuster': casinobankbusterArt,
        'blockchain-executive-problems': executiveproblemsArt,
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

    // Handle click to navigate to the guide page with challengeCode
    const handleChallengeClick = (challengeCode) => {
        navigate(`/guide/${challengeCode}`);
    };

    return (
        <div className="walkthrough-container">
            <h1>Walkthrough</h1>
            <div className="walkthrough-grid">
                {challenges.length > 0 ? (
                    challenges.map((challenge) => (
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
        </div>
    );
};

export default Walkthrough;
