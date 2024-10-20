import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // Use Prism or other themes
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a style
import remarkGfm from 'remark-gfm'; // For GitHub-flavored markdown

// Import all walkthrough
import cheapglitchWalkthrough from '../assets/Properties/blockchain-cheap-glitch/walkthrough.md';
import entrypointWalkthrough from '../assets/Properties/blockchain-entry-point/walkthrough.md';
import barWalkthrough from '../assets/Properties/blockchain-bar/walkthrough.md';
import rouletteWalkthrough from '../assets/Properties/blockchain-roulette/walkthrough.md';
import blackjackWalkthrough from '../assets/Properties/blockchain-master-of-blackjack/walkthrough.md';
import votingfrenzyWalkthrough from '../assets/Properties/blockchain-voting-frenzy/walkthrough.md';
import vvvipmemberWalkthrough from '../assets/Properties/blockchain-vvvip-member/walkthrough.md';
import injubankWalkthrough from '../assets/Properties/blockchain-inju-bank/walkthrough.md';
import silentDealerWalkthrough from '../assets/Properties/blockchain-silent-dealer/walkthrough.md';
import singularentityWalkthrough from '../assets/Properties/blockchain-singular-entity/walkthrough.md';
import unlimitedCreditWalkthrough from '../assets/Properties/blockchain-unlimited-credit-line/walkthrough.md';
import symbolofnobleWalkthrough from '../assets/Properties/blockchain-symbol-of-noble/walkthrough.md';
import doubleordelegateWalkthrough from '../assets/Properties/blockchain-double-or-delegate/walkthrough.md';


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

const Guide = () => {
  const { challengeCode } = useParams(); // Get the challengeCode from the URL
  const [post, setPost] = useState(''); // State to store the markdown content
  const [image, setImage] = useState('');
  const [data, setData] = useState(null); // State to store challenge data
  const navigate = useNavigate(); // Initialize navigate for redirection


  const validateToken = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
      if (!token) {
        throw new Error('No token found'); // Redirect if the token is missing
      }
  
      const response = await fetch('http://127.0.0.1:5000/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      });
  
      if (!response.ok) {
        throw new Error('Invalid token'); // Handle invalid token response
      }
  
      console.log('Token is valid');
    } catch (error) {
      console.error('Token validation failed:', error);
      localStorage.removeItem('token'); // Clear token if invalid
      navigate('/login'); // Redirect to login page
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // If no token, redirect to login
    } else {
      validateToken(token); // Validate the token if present
    }
  }, [navigate]); // Run this effect once on mount

  // Fetch the challenge data from the server and filter the appropriate challenge
  useEffect(() => {
    fetch('http://127.0.0.1:5000/Challenge')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
        console.log(response.json);
      })
      .then((challenges) => {
        // Find the specific challenge based on the challengeCode
        const selectedChallenge = challenges.find(
          (challenge) => challenge.challengeCode === challengeCode
        );

        if (selectedChallenge) {
          setData(selectedChallenge); // Store the challenge data
          // Map challenge codes to the corresponding markdown file
          const markdownMap = {
            'blockchain-cheap-glitch': [cheapglitchWalkthrough, cheapglitchArt],
            'blockchain-entry-point': [entrypointWalkthrough, entrypointArt],
            'blockchain-bar': [barWalkthrough, barArt],
            'blockchain-roulette': [rouletteWalkthrough, rouletteArt],
            'blockchain-master-of-blackjack': [blackjackWalkthrough, blackjackArt],
            'blockchain-voting-frenzy': [votingfrenzyWalkthrough, votingfrenzyArt],
            'blockchain-vvvip-member': [vvvipmemberWalkthrough, vvvipmemberArt],
            'blockchain-inju-bank': [injubankWalkthrough, injubankArt],
            'blockchain-silent-dealer': [silentDealerWalkthrough, silentDealerArt],
            'blockchain-singular-entity': [singularentityWalkthrough, singularentityArt],
            'blockchain-unlimited-credit-line': [unlimitedCreditWalkthrough, unlimitedCreditArt],
            'blockchain-symbol-of-noble': [symbolofnobleWalkthrough, symbolofnobleArt],
            'blockchain-double-or-delegate': [doubleordelegateWalkthrough, doubleordelegateArt],
          };

          // Set the markdown content for the selected challenge
          if (challengeCode in markdownMap) {
            const [markdown, art] = markdownMap[challengeCode]
            setPost(markdown);
            setImage(art);
          } else {
            console.error('Markdown file not found for challengeCode:', challengeCode);
          }
        } else {
          console.error('Challenge data not found for challengeCode:', challengeCode);
        }
      })
      .catch((error) => console.error('Error fetching challenges:', error));
  }, [challengeCode]);

  return (
    <div className="heist-container">
        {data ? <h1>{data.challengeName}</h1> : <h1>Loading...</h1>}

        <div className="heist-challenge-image">
          <img src={image} alt="Challenge" />
        </div>

        <div className="heist-description-container">
          <h2>Story</h2>
          {data ? (
            <>
              {/* ReactMarkdown with Syntax Highlighting for Code Blocks */}
              <ReactMarkdown
                children={post}
                remarkPlugins={[remarkGfm]} // Enables GitHub-flavored markdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    // Check if it's an inline code or a code block
                    if (inline) {
                      return (
                        <code className="react-markdown-inline-code" {...props}>
                          {children}
                        </code>
                      );
                    } else {
                      const match = /language-(\w+)/.exec(className || '');
                      return match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus} // Use the theme of your choice
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                  }
                }}
                className="react-markdown-loader" /* React Component for Markdown */
              />
            </>
          ) : (
            <p>Loading challenge details...</p>
          )}
        </div>

        <div className="heist-code-container">
          <h2>Code</h2>
          <div className="heist-code-block">
            <code>
              // Code block content goes here...
            </code>
          </div>
          <button className="heist-copy-button">Copy Code</button>
        </div>
    </div>
  );
};

export default Guide;
