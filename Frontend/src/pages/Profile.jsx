import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

// Import avatar images
import avatar1 from '../assets/profile-picture/madman.png';
import avatar2 from '../assets/profile-picture/queen.png';
import avatar3 from '../assets/profile-picture/king.png';
import avatar4 from '../assets/profile-picture/alien.png';
import avatar5 from '../assets/profile-picture/marshy.png';
import avatar6 from '../assets/profile-picture/pumpanout.png';
import avatar7 from '../assets/profile-picture/robo.png';
import avatar8 from '../assets/profile-picture/croco.png';

import changeAvatar from '../assets/images/change-profile.png';

const Profile = () => {
    const [profileImage, setProfileImage] = useState(avatar7); // Default avatar image
    const [showSelector, setShowSelector] = useState(false);
    const [challenges, setChallenges] = useState([]);
    const [completionDate, setCompletionDate] = useState([]);
    const [data, setData] = useState([]);
    const selectorRef = useRef(null);
    const navigate = useNavigate();

    // Array of avatar objects with aliases
    const avatarOptions = [
        { alias: 'madman', image: avatar1 },
        { alias: 'queen', image: avatar2 },
        { alias: 'king', image: avatar3 },
        { alias: 'alien', image: avatar4 },
        { alias: 'marshy', image: avatar5 },
        { alias: 'pumpanout', image: avatar6 },
        { alias: 'robo', image: avatar7 },
        { alias: 'croco', image: avatar8 },
    ];

    const validateToken = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');
            const response = await fetch('http://127.0.0.1:5000/validate-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Invalid token');
            console.log('Token is valid');
        } catch (error) {
            console.error('Token validation failed:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const fetchAllData = async (token) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await response.json();
            // Find the avatar that matches the alias from the result
            const selectedAvatar = avatarOptions.find(
                (avatar) => avatar.alias === result.avatar
            );

            if (selectedAvatar) {
                setProfileImage(selectedAvatar.image); // Set the image to the matched avatar
                setProfileAlias(selectedAvatar.alias); // Set the alias to display
            }
            setData(result);
            setChallenges(result.challenge_completions);
            console.log(result.challenge_completions)
        } catch (error) {
            console.error('Error fetching hint:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            validateToken(token);
            fetchAllData(token);
        }
    }, []);

    const handleImageSelect = (e, option) => {
        e.stopPropagation();
        setProfileImage(option.image); // Set selected image
        setProfileAlias(option.alias); // Set alias
        setShowSelector(false);
        console.log(`Selected: ${option.alias}`);

        const token = localStorage.getItem('token');
        fetch('http://127.0.0.1:5000/avatar-select', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ avatar: option.alias }),
        })
            .then((response) => {
                if (!response.ok) throw new Error('Failed to save avatar');
                return response.json();
            })
            .then((data) => console.log(data.message))
            .catch((error) => console.error('Error:', error));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectorRef.current && !selectorRef.current.contains(event.target)) {
                setShowSelector(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getHeistStatus = (challenge) => {
        switch (challenge.completion_status) {
            case 0: return 'Heist Not Started';
            case 1: return 'Completed';
        }
    };

    const getCompletionDate = (challenge) => {
        if (challenge.time_completion === null){
            return '';
        }else{
            return `(${challenge.time_completion})`;
        }
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar-wrapper">
                    <img src={profileImage} alt="Profile" className="profile-avatar" />
                    <div className="profile-avatar-edit" onClick={() => setShowSelector(!showSelector)}>
                        <img src={changeAvatar} alt="Change Avatar" />
                    </div>
                </div>
                <h2>{data.username}</h2>
                <p>{data.email}</p>
                {/* <p>Selected Avatar: {profileAlias}</p> */}

                {showSelector && (
                    <div className="profile-avatar-selector" ref={selectorRef}>
                        {avatarOptions.map((option, index) => (
                            <img
                                key={index}
                                src={option.image}
                                alt={`Avatar ${option.alias}`}
                                className="profile-avatar-option"
                                onClick={(e) => handleImageSelect(e, option)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="profile-white-box">
                <div className="profile-block">
                    <table className="profile-table">
                        <thead>
                            <tr>
                                <th>Heist List</th>
                                <th>|</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className='profile-table-content'>
                            {challenges.map((challenge) => (
                                <tr key={challenge.challengeId}>
                                    <td>{challenge.challengeName}</td>
                                    <td>|</td>
                                    <td>
                                        <div>{getHeistStatus(challenge)}{" "}{getCompletionDate(challenge)}</div> {/* Status on one line */}
                                        <div className="tags-container">
                                            {challenge.completion_status === 1 && challenge.hints_used !== 0 && (
                                                <div className="hint-assists-tag">#{challenge.hints_used}-Assists!</div>
                                            )}

                                            {challenge.completion_status === 1 && challenge.walkthrough_used === 1 && (
                                                <div className="wt-assists-tag">Guided Heist!</div>
                                            )}

                                            {challenge.completion_status === 1 && challenge.hints_used === 0 && challenge.walkthrough_used === 0  && (
                                                <div className="solo-assists-tag">PERFECT SOLO HEIST!</div>
                                            )}
                                        </div>
                                    </td>
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
