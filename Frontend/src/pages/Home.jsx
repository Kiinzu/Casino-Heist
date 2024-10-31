import React from 'react';
import TCP1PLogo from "../assets/images/TCP1Plogo.png";
import ENUMAlogo from "../assets/images/enuma-logo.png";
import PETIRlogo from "../assets/images/petir.png";

const Home = () => {
    return (
        <div className="home-final-container">
            <div className='home-first-container'>
                <div className='home-first-looks'>
                    <div className="home-hero-content">
                        <h1 className='glitch' data-text="CONQUER THE ODDS!">CONQUER THE ODDS!</h1>
                        <p>Defy the odds and claim victory in Casino Heist—where only the bold emerge Victorious!</p>
                    <a href="/challenge"><button className="home-play-now-btn">Play Now</button></a>
                    </div>
                    {/* <div className="home-hero-image">
                        <img src={casinoHeistLogo} alt="Casino Illustration" />
                    </div> */}
                    <div className='home-first-bottom'>
                        <h1>CASINO HEIST</h1>
                        <p>Reveal the Secret</p>
                        <br />
                        {/* <div className='big-thanks'>
                            <img src={ENUMAlogo} className='enuma-sponsor-icon'/>
                            <img src={PETIRlogo} className='petir-sponsor-icon'/>
                            <img src={TCP1PLogo} className='tcp1p-sponsor-icon'/>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className='home-second-container'>
                <div className='home-second-intro'>
                    <p>Casino Heist was created as a response to the growing enthusiasm for web3 in recent years. While many playgrounds have emerged to give hands-on experience in smart contract security, the setup has often been complex, requiring wallets and testnet ether, which can create unnecessary friction for learners. Our aim is to offer a similar experience with a streamlined setup, making it more accessible and straightforward. More than just solving challenges, Casino Heist is dedicated to educating users on how to secure their code, with an emphasis on understanding and mitigating each vulnerability encountered.</p>
                    <br />
                    <p>The idea behind Casino Heist is rooted in the vibrant Indonesian web3 community, where we’ve observed a strong interest in development but less engagement with security—largely due to the obstacles involved. Our mission is to create not only skilled developers but also well-rounded professionals knowledgeable in security, contributing to a safer web3 ecosystem for everyone.</p>
                    <br />
                    <p>Casino Heist is also designed to be a collaborative project, welcoming contributions from the community. Whether you’re passionate about designing challenges or writing detailed walkthroughs, there’s an opportunity here to share your expertise and creativity. Using ParadigmXYZ’s custom infrastructure, adapted by Indonesia’s TCP1P Community, and  tested by PETIR Cybersecurity at Bina Nusantara University, ENUMA ID is proud to present this open-source initiative: Casino Heist.</p>
                </div>
            </div>
            <div className='home-filler-layer'>

            </div>
            <div className='home-third-container'>
                <div className="home-third-card-one">
                    <img src={ENUMAlogo} alt="Hands On Icon" className="home-feature-icon" />
                    <h3>HANDS ON</h3>
                    <p>Register now to face the fun challenges and become a blockchain master!</p>
                </div>
                <div className="home-third-card-two">
                    <img src={ENUMAlogo} alt="Hands On Icon" className="home-feature-icon" />
                    <h3>HANDS ON</h3>
                    <p>Register now to face the fun challenges and become a blockchain master!</p>
                </div>
                <div className="home-third-card-three">
                    <img src={ENUMAlogo} alt="Hands On Icon" className="home-feature-icon" />
                    <h3>HANDS ON</h3>
                    <p>Register now to face the fun challenges and become a blockchain master!</p>
                </div>
                <div className="home-third-card-three">
                    <img src={ENUMAlogo} alt="Hands On Icon" className="home-feature-icon" />
                    <h3>HANDS ON</h3>
                    <p>Register now to face the fun challenges and become a blockchain master!</p>
                </div>
            </div>
            <div className='home-fourth-container'>
                <div className="home-third-card-one">
                    <img src={ENUMAlogo} alt="Hands On Icon" className="home-feature-icon" />
                    <h3>HANDS ON</h3>
                    <p>Register now to face the fun challenges and become a blockchain master!</p>
                </div>
                <div className="home-third-card-two">
                    <img src={ENUMAlogo} alt="Hands On Icon" className="home-feature-icon" />
                    <h3>HANDS ON</h3>
                    <p>Register now to face the fun challenges and become a blockchain master!</p>
                </div>
                <div className="home-third-card-three">
                    <img src={ENUMAlogo} alt="Hands On Icon" className="home-feature-icon" />
                    <h3>HANDS ON</h3>
                    <p>Register now to face the fun challenges and become a blockchain master!</p>
                </div>
            </div>
            {/* Hero Section
            <div>
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
            </div>

            {/* Features Section */}
            {/* <section className="home-features-section">
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
            </section> */} 
        </div>
    );
};

export default Home;
