import React from 'react';
import casinoHeistLogo from "../assets/images/colored-logo.png";
import communityFeature from "../assets/images/community.png";
import ethereumFeature from "../assets/images/ethereum-coins.png";
import learnFeature from "../assets/images/learn-and-practice.png";

const Home = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="home-hero-section">
                <div className="home-hero-content">
                    <h1>Casino Heist</h1>
                    <p>Outsmart the odds, crack the code—your blockchain skills are the key to escape!</p>
                 <a href="/challenge"><button className="home-play-now-btn">Play Now</button></a>
                </div>
                <div className="home-hero-image">
                    <img src={casinoHeistLogo} alt="Casino Illustration" />
                </div>
            </section>

            {/* Features Section */}
            <section className="home-features-section">
                <div className="home-feature-card">
                    <img src={learnFeature} alt="Hands On Icon" className="home-feature-icon" />
                    <h3>HANDS ON</h3>
                    <p>Register now to face the fun challenges and become a blockchain master!</p>
                </div>
                <div className="home-feature-card">
                    <img src={ethereumFeature} alt="Cost Free Icon" className="home-feature-icon-special" />
                    <h3>COST FREE</h3>
                    <p>No need to topup or pay anything because we are open source and completely free!</p>
                </div>
                <div className="home-feature-card">
                    <img src={communityFeature} alt="Community Icon" className="home-feature-icon" />
                    <h3>JOIN THE COMMUNITY</h3>
                    <p>Join the community to discuss the challenge and meet new friends!</p>
                </div>
            </section>

            <section className="home-features-section">
                <div className="home-feature-card">
                    <img src={learnFeature} alt="Hands On Icon" className="home-feature-icon" />
                    <h3>HANDS ON</h3>
                    <p>Register now to face the fun challenges and become a blockchain master!</p>
                </div>
                <div className="home-feature-card">
                    <img src={ethereumFeature} alt="Cost Free Icon" className="home-feature-icon-special" />
                    <h3>COST FREE</h3>
                    <p>No need to topup or pay anything because we are open source and completely free!</p>
                </div>
                <div className="home-feature-card">
                    <img src={communityFeature} alt="Community Icon" className="home-feature-icon" />
                    <h3>JOIN THE COMMUNITY</h3>
                    <p>Join the community to discuss the challenge and meet new friends!</p>
                </div>
            </section>

        </div>
    );
};

export default Home;
