import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../App.css'; // Import your CSS

// Import preloaded avatar images
import avatar1 from '../assets/images/challenge.png';
import avatar2 from '../assets/images/discord-logo.png';
import avatar3 from '../assets/images/discord-logo.png';
import avatar4 from '../assets/images/discord-logo.png';
import avatar5 from '../assets/images/discord-logo.png';
import avatar6 from '../assets/images/discord-logo.png';
import avatar7 from '../assets/images/discord-logo.png';
import avatar8 from '../assets/images/discord-logo.png';
import changeAvatar from '../assets/images/profile-change.png';

const Profile = () => {
    const [profileImage, setProfileImage] = useState(avatar1); // Default avatar image
    const [showSelector, setShowSelector] = useState(false); // Toggle avatar selection
    const [challenges, setChallenges] = useState([]); // Store challenge data
    const [loading, setLoading] = useState(true); // Track loading state
    const selectorRef = useRef(null); // Ref to detect clicks outside the selector
    const navigate = useNavigate(); // Initialize navigate for redirection

    const avatarOptions = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8];

    // Check if the token exists and validate it with the backend
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if no token found
            return;
        }

        fetch('http://127.0.0.1:5000/validate-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Token validation failed');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Token is valid:', data);
                setLoading(false); // Stop loading if token is valid
            })
            .catch((error) => {
                console.error('Error validating token:', error);
                localStorage.removeItem('token'); // Clear invalid token
                navigate('/login'); // Redirect to login
            });
    }, [navigate]);

    // Fetch challenges from the backend
    useEffect(() => {
        fetch('http://127.0.0.1:5000/Challenge')
            .then((response) => response.json())
            .then((data) => setChallenges(data))
            .catch((error) => console.error('Error fetching challenges:', error));
    }, []);

    // Handle image selection and close the selector
    const handleImageSelect = (e, image) => {
        e.stopPropagation(); // Prevent event propagation
        setProfileImage(image); // Set the selected image as profile image
        setShowSelector(false); // Close the selector
    };

    // Detect clicks outside of the avatar selector to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectorRef.current && !selectorRef.current.contains(event.target)) {
                setShowSelector(false); // Close the selector
            }
        };
        document.addEventListener('mousedown', handleClickOutside); // Add event listener

        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Cleanup listener
        };
    }, []);

    const getHeistStatus = (challenge) => {
        switch (challenge.challengeCompletion) {
            case 0:
                return 'HEIST NOT STARTED';
            case 1:
                return 'HEIST DONE SOLO';
            case 2:
                return 'HEIST DONE WITH 1 HELP';
            case 3:
                return 'HEIST DONE WITH 2 HELPS';
            case 4:
                return 'HEIST DONE WITH 3 HELPS';
            case 5:
                return 'HEIST DONE WITH GUIDE';
            default:
                return 'UNKNOWN STATUS';
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Display loading indicator while validating token
    }

    return (
        <div className="profile-container">
            {/* Header Section */}
            <div className="profile-header">
                <div className="profile-avatar-wrapper">
                    <img src={profileImage} alt="Profile" className="profile-avatar" />
                    <div
                        className="profile-avatar-edit"
                        onClick={() => setShowSelector(!showSelector)}
                    >
                        <img src={changeAvatar} alt="Change Avatar" />
                    </div>
                </div>
                <h2>Kiinzu</h2>
                <p>RICHARD TAN</p>

                {/* Avatar Selector */}
                {showSelector && (
                    <div className="profile-avatar-selector" ref={selectorRef}>
                        {avatarOptions.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Avatar ${index + 1}`}
                                className="profile-avatar-option"
                                onClick={(e) => handleImageSelect(e, image)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* White Box Section */}
            <div className="profile-white-box">
                <div className="profile-block">
                    <table className="profile-table">
                        <thead>
                            <tr>
                                <th>LAB LIST</th>
                                <th>|</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {challenges.map((challenge) => (
                                <tr key={challenge.challengeId}>
                                    <td>{challenge.challengeName.toUpperCase()}</td>
                                    <td>|</td>
                                    <td>{getHeistStatus(challenge)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Profile;
