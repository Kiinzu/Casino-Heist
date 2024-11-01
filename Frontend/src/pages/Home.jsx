import React from 'react';
import TCP1PLogo from "../assets/images/TCP1Plogo.png";
import ENUMAlogo from "../assets/images/enuma-logo.png";
import PETIRlogo from "../assets/images/petir.png";
import homeSimplified from "../assets/images/home-simplified.png";
import homeSeamless from "../assets/images/home-seamless.png";
import homeFree from "../assets/images/home-free.png";
import homeContribution from "../assets/images/home-contribution.png";
import enumaLightLogo from "../assets/images/enuma-light.png";

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
                <h1>for <em>EVERYONE.</em></h1>
                <h4>Whether you are a new or expereienced player,</h4>
                <h4>There is something for everyone.</h4>
            </div>
            <div className='home-third-container'>
                <div className="home-third-card-one">
                    <img src={homeSeamless} className="home-feature-icon" />
                    <h3>SEAMLESS ONBOARDING</h3>
                    <br />
                    <p>Everything you need to solve the Challenge is provided! </p>
                </div>
                <div className="home-third-card-two">
                    <img src={homeSimplified} className="home-feature-icon" />
                    <h3>REAL-HACK SIMPLIFIED</h3>
                    <br />
                    <p>Real-hack are simplified for you to learn and exploit.</p>
                </div>
                <div className="home-third-card-three">
                    <img src={homeFree} className="home-feature-icon" />
                    <h3>IT'S FREE!</h3>
                    <br />
                    <br />
                    <p>It's cost FREE, you just need to learn and complete the Heist!</p>
                </div>
                <div className="home-third-card-four">
                    <img src={homeContribution} className="home-feature-icon" />
                    <h3>CONTRIBUTE WITH US!</h3>
                    <br />
                    <p>Got Challenge and Writeups that want to be featured? You can contribute with us!</p>
                </div>
            </div>
            <div className='home-fourth-container'>
                <div className='home-bottom'>
                    <div className='Appreciation'>
                        <h2>With heartfelt appreciation to the <em>Communities</em></h2>
                        <h4>this project would not have been possible without your support, collaboration, and inspiration.</h4>
                    </div>
                    <div className='big-thanks'>
                        <img src={enumaLightLogo} className='enuma-sponsor-icon'/>
                        <img src={PETIRlogo} className='petir-sponsor-icon'/>
                        <img src={TCP1PLogo} className='tcp1p-sponsor-icon'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
