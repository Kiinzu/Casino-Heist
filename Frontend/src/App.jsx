import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Header from './components/Header';
import Liner from './components/Liner';
import Copyright from './components/Copyright';
import Challenge from './pages/Challenge';
import Walkthrough from './pages/Walkthrough';
import Home from './pages/Home';
import Heist from './pages/Heist';
import Guide from './pages/Guide';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Documentation from './pages/Documentation';

function App() {
  // const navigate = useNavigate(); // Initialize navigation hook
  // const location = useLocation(); // Track the current route

  // Handle refresh and re-navigate to the current location
  // useEffect(() => {
  //   const currentPath = location.pathname;
  //   console.log(`Navigating to ${currentPath} on refresh`);
  //   navigate(currentPath); // Ensure it navigates to the same route on refresh
  // }, [location.pathname, navigate]);

  return (
    <div>
      <Header />
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/walkthrough" element={<Walkthrough />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/heist/:challengeCode" element={<Heist />} />
          <Route path="/guide/:challengeCode" element={<Guide />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Sidebar>
      <Liner />
      <Footer />
      <Copyright />
    </div>
  );
}

export default App;
