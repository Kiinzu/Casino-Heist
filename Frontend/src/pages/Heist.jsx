import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // Use Prism or other themes
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a style
import remarkGfm from 'remark-gfm'; // For GitHub-flavored markdown

// Import all markdown files 
import briefingMarkdown from '../assets/Properties/blockchain-briefing/text.md';
import gearingupMarkdown from '../assets/Properties/blockchain-gearing-up/text.md';
import cheapglitchMarkdown from '../assets/Properties/blockchain-cheap-glitch/text.md';
import entrypointMarkdown from '../assets/Properties/blockchain-entry-point/text.md';
import barMarkdown from '../assets/Properties/blockchain-bar/text.md';
import rouletteMarkdown from '../assets/Properties/blockchain-roulette/text.md';
import blackjackMarkdown from '../assets/Properties/blockchain-master-of-blackjack/text.md';
import votingfrenzyMarkdown from '../assets/Properties/blockchain-voting-frenzy/text.md';
import vvvipmemberMarkdown from '../assets/Properties/blockchain-vvvip-member/text.md';
import injubankMarkdown from '../assets/Properties/blockchain-inju-bank/text.md';
import silentDealerMarkdown from '../assets/Properties/blockchain-silent-dealer/text.md';
import singularentityMarkdown from '../assets/Properties/blockchain-singular-entity/text.md';
import unlimitedCreditMarkdown from '../assets/Properties/blockchain-unlimited-credit-line/text.md';
import symbolofnobleMarkdown from '../assets/Properties/blockchain-symbol-of-noble/text.md';
import doubleornothingMarkdown from '../assets/Properties/blockchain-double-or-nothing/text.md';
import injusgambitMarkdown from '../assets/Properties/blockchain-injus-gambit/text.md';
import casinobankbusterMarkdown from '../assets/Properties/blockchain-casino-bankbuster/text.md';
import executiveproblemsMarkdown from '../assets/Properties/blockchain-executive-problems/text.md';
import casinovaultMarkdown from "../assets/Properties/blockchain-casino-vault/text.md";


// import all mitigation files
import cheapglitchMitigation from '../assets/Properties/blockchain-cheap-glitch/mitigation.md';
import entrypointMitigation from '../assets/Properties/blockchain-entry-point/mitigation.md';
import barMitigation from '../assets/Properties/blockchain-bar/mitigation.md';
import rouletteMitigation from '../assets/Properties/blockchain-roulette/mitigation.md';
import blackjackMitigation from '../assets/Properties/blockchain-master-of-blackjack/mitigation.md';
import votingfrenzyMitigation from '../assets/Properties/blockchain-voting-frenzy/mitigation.md';
import vvvipmemberMitigation from '../assets/Properties/blockchain-vvvip-member/mitigation.md';
import injubankMitigation from '../assets/Properties/blockchain-inju-bank/mitigation.md';
import silentDealerMitigation from '../assets/Properties/blockchain-silent-dealer/mitigation.md';
import singularentityMitigation from '../assets/Properties/blockchain-singular-entity/mitigation.md';
import unlimitedCreditMitigation from '../assets/Properties/blockchain-unlimited-credit-line/mitigation.md';
import symbolofnobleMitigation from '../assets/Properties/blockchain-symbol-of-noble/mitigation.md';
import casinovaultMitigation from "../assets/Properties/blockchain-casino-vault/mitigation.md";

// import all art files
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
import casinovaultArt from "../assets/Properties/blockchain-casino-vault/art.png";
import injusgambitArt from '../assets/Properties/blockchain-injus-gambit/art.png';
import casinobankbusterArt from '../assets/Properties/blockchain-casino-bankbuster/art.png';
import executiveproblemsArt from '../assets/Properties/blockchain-executive-problems/art.png';
import doubleornothingArt from '../assets/Properties/blockchain-double-or-nothing/art.png';

// Needed Logos
import downloadLogo from "../assets/images/download.png";
import backgroundImage from "../assets/images/background.jpg";

const Heist = () => {
  const { challengeCode } = useParams();
  const [post, setPost] = useState('');
  const [mitigation, setMitigation] = useState('');
  const [image, setImage] = useState('');
  const [data, setData] = useState(null);
  const [flag, setFlag] = useState('');
  const [solved, setSolved] = useState(false); // New state for tracking challenge status
  const [flagResult, setFlagResult] = useState(''); // State for displaying flag result text
  const navigate = useNavigate(); 

  // Fetch and validate token
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
    } catch (error) {
      console.error('Token validation failed:', error);
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  // Fetch challenge status
  const checkChallengeStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(challengeCode)
      const response = await fetch(`http://127.0.0.1:5000/challenge-status/${challengeCode}`,{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      const result = await response.json();
      console.log(result)
      console.log(solved)
      setSolved(result['isSolved'] === 1); // Set solved state based on response
    } catch (error) {
      console.error('Error fetching challenge status:', error);
    }
  };

  // Submit flag with result displayed temporarily
  const handleFlagSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://127.0.0.1:5000/verify-flag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ flag, challengeCode }),
      });
      const result = await response.json();
      setFlagResult(result.message); // Show flag result message

      // Hide message after 1 second
      setTimeout(() => setFlagResult(''), 1000);

      // Check challenge status after flag submission
      checkChallengeStatus();
    } catch (error) {
      console.error('Error submitting flag:', error);
    }
  };

  const handleHintClick = async (hintNumber) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://127.0.0.1:5000/hint/${challengeCode}/${hintNumber}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      alert(`Hint ${hintNumber}: ${result['hint']}`); // Display the hint in an alert or update UI
    }catch (error) {
      console.error('Error fetching hint:', error);
    }
  };

  const handleDownload = () => {
    const fileUrl = '/path/to/your-file.txt'; // Replace with actual file path
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'file.txt'; // Name of the file to be downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      validateToken();
      checkChallengeStatus(); // Fetch challenge status on page load
    }
  }, [navigate]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/Challenge')
      .then((response) => response.json())
      .then((challenges) => {
        const selectedChallenge = challenges.find(
          (challenge) => challenge.challengeCode === challengeCode
        );

        if (selectedChallenge) {
          setData(selectedChallenge);

          const markdownMap = {
            'blockchain-briefing': [briefingMarkdown, '', briefingArt],
            'blockchain-gearing-up': [gearingupMarkdown, '', gearingupArt],
            'blockchain-cheap-glitch': [cheapglitchMarkdown, cheapglitchMitigation, cheapglitchArt],
            'blockchain-entry-point': [entrypointMarkdown, entrypointMitigation, entrypointArt],
            'blockchain-bar': [barMarkdown, barMitigation, barArt],
            'blockchain-roulette': [rouletteMarkdown, rouletteMitigation, rouletteArt],
            'blockchain-master-of-blackjack': [blackjackMarkdown, blackjackMitigation, blackjackArt],
            'blockchain-voting-frenzy': [votingfrenzyMarkdown, votingfrenzyMitigation, votingfrenzyArt],
            'blockchain-vvvip-member': [vvvipmemberMarkdown, vvvipmemberMitigation, vvvipmemberArt],
            'blockchain-inju-bank': [injubankMarkdown, injubankMitigation, injubankArt],
            'blockchain-silent-dealer': [silentDealerMarkdown, silentDealerMitigation, silentDealerArt],
            'blockchain-singular-entity': [singularentityMarkdown, singularentityMitigation, singularentityArt],
            'blockchain-unlimited-credit-line': [unlimitedCreditMarkdown, unlimitedCreditMitigation, unlimitedCreditArt],
            'blockchain-symbol-of-noble': [symbolofnobleMarkdown, symbolofnobleMitigation, symbolofnobleArt],
            'blockchain-casino-vault': [casinovaultMarkdown, casinovaultMitigation, casinovaultArt],
            'blockchain-injus-gambit': [injusgambitMarkdown, '', injusgambitArt],
            'blockchain-casino-bankbuster': [casinobankbusterMarkdown, '', casinobankbusterArt],
            'blockchain-executive-problems': [executiveproblemsMarkdown, '', executiveproblemsArt],
            'blockchain-double-or-nothing': [doubleornothingMarkdown, '', doubleornothingArt],
          };

          const [story, mitigation, art] = markdownMap[challengeCode] || [];
          setPost(story);
          setMitigation(mitigation);
          setImage(art);
        }
      })
      .catch(console.error);
  }, [challengeCode]);

  const renderBoxes = () => {
    if (!data) return null;

    const { challengeDifficulty } = data;

    const storyBox = (
      <div className="heist-description-container" key="story">
        <h2>Story</h2>
        <ReactMarkdown
          children={post}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
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
              }
            },
          }}
          className="react-markdown-loader"
        />
      </div>
    );

    const codeBox = (
      <div className="heist-code-container" key="code">
        <h2>Code</h2>
        <div className="heist-code-content">
          <div className="heist-description">
            <p>LOREM IPSUM DUAR DUAR NMAX MEMEK</p>
            <p>BUM BUM BUM PAW PAW PAW</p>
          </div>
          <div className="heist-download" onClick={handleDownload}>
            <img src={downloadLogo} alt="Download" />
            <p>Download</p>
          </div>
        </div>
        <div className="heist-input-container">
          <input
            type="text"
            className="heist-input-flag"
            placeholder="heist here!"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
          />
          <button className="heist-submit-button" onClick={handleFlagSubmit}>
            <p>Submit Flag</p>
          </button>
          <div className="heist-hints">
            {[1, 2, 3].map((hint) => (
              <div
                key={hint}
                className="heist-hint-box"
                onClick={() => handleHintClick(hint)}
              />
            ))}
          </div>
        </div>
      </div>
    );

    const mitigationBox = solved && (
      <div className="heist-code-container" key="mitigation">
        <h2>Mitigation</h2>
        <ReactMarkdown children={mitigation} remarkPlugins={[remarkGfm]} />
      </div>
    );

    switch (challengeDifficulty) {
      case 'basic':
      case 'vip':
        return [storyBox, codeBox];
      case 'common':
        return [storyBox, codeBox, mitigationBox];
      default:
        return [];
    }
  };

  return (
    <div className="heist-container">
      {data ? <h1>{data.challengeName}</h1> : <h1>Loading...</h1>}
      <div className="heist-challenge-image">
        <img src={image} alt="Challenge" />
      </div>
      {renderBoxes()}
    </div>
  );
};

export default Heist;