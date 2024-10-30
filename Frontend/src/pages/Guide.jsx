import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // Use Prism or other themes
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a style
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
import casinovaultWalkthrough from "../assets/Properties/blockchain-casino-vault/walkthrough.md";


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
import casinovaultArt from "../assets/Properties/blockchain-casino-vault/art.png";
 
const Guide = () => {
  const { challengeCode } = useParams();
  const [post, setPost] = useState('');
  const [image, setImage] = useState('');
  const [data, setData] = useState(null);
  const [featuredWalkthroughs, setFeaturedWalkthroughs] = useState([[], [], [], [], []]);
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_BACKEND_IP; // Use the API URL from environment variable

  const validateToken = async (token) => {
    try {
      const response = await fetch(`${apiURL}/validate-token`, {
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

  const walkthroughUsed = async (token) => {
    try{
      const response = await fetch(`${apiURL}/update-walkthrough`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ challengeCode }),
      });

      if(!response.ok) {
        throw new Error('Walkthrough Failed to Used');
      }
      // console.log('Hint Sent');
    } catch (error){
      console.error('Error in aquiring Walkthrough');
    }
  }; 

  const fetchFeaturedWalkthroughs = async (token) => {
    try {
      const response = await fetch(
        `${apiURL}/featured-walkthrough`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ challengeCode }),
        }
      );

      if (!response.ok) throw new Error('Failed to fetch walkthroughs');
      const result = await response.json();
      console.log(result);
      const firstBox = result.slice(0, 10);
      const secondBox = result.slice(10, 20);
      const thirdBox = result.slice(20, 30);
      const fourthBox = result.slice(30, 40);
      const fifthBox = result.slice(40, 50);
      setFeaturedWalkthroughs([firstBox, secondBox, thirdBox, fourthBox, fifthBox]);
    } catch (error) {
      console.error('Error fetching walkthroughs:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      validateToken(token);
      walkthroughUsed(token);
      fetchFeaturedWalkthroughs(token);
    }
  }, [navigate]);


  useEffect(() => {
    fetch(`${apiURL}/Challenge`)
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
            'blockchain-casino-vault': [casinovaultWalkthrough, casinovaultArt],
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
          <ReactMarkdown
            children={post}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={xonokai}
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
              },
            }}
            className="react-markdown-loader"
          />
        ) : (
          <p>Loading challenge details...</p>
        )}
      </div>
      {featuredWalkthroughs.some((box) => box.length > 0) && (
        <div className="heist-contributor-container">
          <h2>Featured Walkthrough</h2>
          <p>Here are some Walkthrough that is written by our Contributors! If you have written one and want to get featured on the platform, please follow this <a href="https://google.com">Contribution Guide</a>!</p>
          <div className="walkthrough-boxes">
            {featuredWalkthroughs.map((walkthroughs, index) =>
              walkthroughs.length > 0 ? (
                <div
                  className={
                    index === 0
                      ? "walkthrough-featured-first-box"
                      : "walkthrough-featured-box"
                  }
                  key={index}
                >
                  <ul className="walkthrough-featured-list">
                    {walkthroughs.map((walkthrough, i) => (
                      <li key={i}>
                        <a
                          href={walkthrough.Link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="walkthrough-link"
                        >
                          {walkthrough.Name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null // Only render the box if it contains items
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Guide;