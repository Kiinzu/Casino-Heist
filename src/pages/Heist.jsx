import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // Use Prism or other themes
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a style
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
import doubleordelegateMarkdown from '../assets/Properties/blockchain-double-or-delegate/text.md';
import injusgambitMarkdown from '../assets/Properties/blockchain-injus-gambit/text.md';
import casinobankbusterMarkdown from '../assets/Properties/blockchain-casino-bankbuster/text.md';
import executiveproblemsMarkdown from '../assets/Properties/blockchain-executive-problems/text.md';

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
import doubleordelegateMitigation from '../assets/Properties/blockchain-double-or-delegate/mitigation.md';

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
import doubleordelegateArt from '../assets/Properties/blockchain-double-or-delegate/art.png';
import injusgambitArt from '../assets/Properties/blockchain-injus-gambit/art.png';
import casinobankbusterArt from '../assets/Properties/blockchain-casino-bankbuster/art.png';
import executiveproblemsArt from '../assets/Properties/blockchain-executive-problems/art.png';

// Needed Logos
import downloadLogo from "../assets/images/download.png";
import backgroundImage from "../assets/images/background.jpg";

const Heist = () => {
  const { challengeCode } = useParams();
  const [tag, setTag] = useState('');
  const [post, setPost] = useState('');
  const [mitigation, setMitigation] = useState('');
  const [image, setImage] = useState('');
  const [data, setData] = useState(null);
  const [flag, setFlag] = useState('');

  const handleDownload = () => {
    const fileUrl = '/path/to/your-file.txt'; // Replace with actual file path
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'file.txt'; // Name of the file to be downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleHintClick = async (hintNumber) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/hint/${hintNumber}`, {
        method: 'GET',
      });
      const result = await response.json();
      alert(`Hint ${hintNumber}: ${result.message}`); // Display the hint in an alert or update UI
    } catch (error) {
      console.error('Error fetching hint:', error);
    }
  };

  const handleFlagSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/verifyFlag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ flag }),
      });
      const result = await response.json();
      alert(result.message); // Handle response (success/failure) as needed
    } catch (error) {
      console.error('Error submitting flag:', error);
    }
  };

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
            'blockchain-double-or-delegate': [doubleordelegateMarkdown, doubleordelegateMitigation, doubleordelegateArt],
            'blockchain-injus-gambit': [injusgambitMarkdown, '', injusgambitArt],
            'blockchain-casino-bankbuster': [casinobankbusterMarkdown, '', casinobankbusterArt],
            'blockchain-executive-problems': [executiveproblemsMarkdown, '', executiveproblemsArt],
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
                    style={vscDarkPlus}
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
            <p>// Code block content or description goes here...</p>
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
    

    const mitigationBox = (
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


// const Heist = () => {
//   const { challengeCode } = useParams(); // Get the challengeCode from the URL
//   const [post, setPost] = useState(''); // State to store the markdown content
//   const [image, setImage] = useState('');
//   const [data, setData] = useState(null); // State to store challenge data

//   // Fetch the challenge data from the server and filter the appropriate challenge
//   useEffect(() => {
//     fetch('http://127.0.0.1:5000/Challenge')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not OK');
//         }
//         return response.json();
//       })
//       .then((challenges) => {
//         const selectedChallenge = challenges.find(
//           (challenge) => challenge.challengeCode === challengeCode
//         );

//         if (selectedChallenge) {
//           setData(selectedChallenge);

//           const markdownMap = {
//             'blockchain-briefing': [briefingMarkdown, briefingArt],
//             'blockchain-gearing-up': [gearingupMarkdown, gearingupArt],
//             'blockchain-cheap-glitch': [cheapglitchMarkdown, cheapglitchArt],
//             'blockchain-entry-point': [entrypointMarkdown, entrypointArt],
//             'blockchain-bar': [barMarkdown, barArt],
//             'blockchain-roulette': [rouletteMarkdown, rouletteArt],
//             'blockchain-master-of-blackjack': [blackjackMarkdown, blackjackArt],
//             'blockchain-voting-frenzy': [votingfrenzyMarkdown, votingfrenzyArt],
//             'blockchain-vvvip-member': [vvvipmemberMarkdown, vvvipmemberArt],
//             'blockchain-inju-bank': [injubankMarkdown, injubankArt],
//             'blockchain-silent-dealer': [silentDealerMarkdown, silentDealerArt],
//             'blockchain-singular-entity': [singularentityMarkdown, singularentityArt],
//             'blockchain-unlimited-credit-line': [unlimitedCreditMarkdown, unlimitedCreditArt],
//             'blockchain-symbol-of-noble': [symbolofnobleMarkdown, symbolofnobleArt],
//             'blockchain-double-or-delegate': [doubleordelegateMarkdown, doubleordelegateArt],
//             'blockchain-injus-gambit': [injusgambitMarkdown, injusgambitArt],
//             'blockchain-casino-bankbuster': [casinobankbusterMarkdown, casinobankbusterArt],
//             'blockchain-executive-problems': [executiveproblemsMarkdown, executiveproblemsArt],
//           };

//           if (challengeCode in markdownMap) {
//             const [markdown, art] = markdownMap[challengeCode];
//             setPost(markdown);
//             setImage(art);
//           }
//         } else {
//           console.error('Challenge data not found');
//         }
//       })
//       .catch((error) => console.error('Error fetching challenges:', error));
//   }, [challengeCode]);

//   const renderBoxes = () => {
//     if (!data) return null;

//     const { challengeDifficulty } = data;

//     const storyBox = (
//       <div className="heist-description-container" key="story">
//         <h2>Story</h2>
//         <ReactMarkdown
//           children={post}
//           remarkPlugins={[remarkGfm]}
//           components={{
//             code({ node, inline, className, children, ...props }) {
//               if (inline) {
//                 return (
//                   <code className="react-markdown-inline-code" {...props}>
//                     {children}
//                   </code>
//                 );
//               } else {
//                 const match = /language-(\w+)/.exec(className || '');
//                 return match ? (
//                   <SyntaxHighlighter
//                     style={vscDarkPlus}
//                     language={match[1]}
//                     PreTag="div"
//                     {...props}
//                   >
//                     {String(children).replace(/\n$/, '')}
//                   </SyntaxHighlighter>
//                 ) : (
//                   <code className={className} {...props}>
//                     {children}
//                   </code>
//                 );
//               }
//             },
//           }}
//           className="react-markdown-loader"
//         />
//       </div>
//     );

//     const codeBox = (
//       <div className="heist-code-container" key="code">
//         <h2>Code</h2>
//         <div className="heist-code-block">
//           <code>// Code block content goes here...</code>
//         </div>
//         <button className="heist-copy-button">Copy Code</button>
//       </div>
//     );

//     const mitigationBox = (
//       <div className="heist-code-container" key="mitigation">
//         <h2>Mitigation</h2>
//         <div className="heist-code-block">
//           <code>// Mitigation content goes here...</code>
//         </div>
//       </div>
//     );

//     // Render boxes based on challenge difficulty
//     switch (challengeDifficulty) {
//       case 'basic':
//         return [storyBox, codeBox];
//       case 'common':
//         return [storyBox, codeBox, mitigationBox];
//       case 'vip':
//         return [storyBox, codeBox];
//       default:
//         return [];
//     }
//   };

//   return (
//     <div className="heist-container">
//       {data ? <h1>{data.challengeName}</h1> : <h1>Loading...</h1>}
//       <div className="heist-challenge-image">
//         <img src={image} alt="Challenge" />
//       </div>
//       {renderBoxes()}
//     </div>
//   );
// };

// export default Heist;