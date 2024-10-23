import React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import homeIcon from '../assets/images/home.png';
import challengeIcon from '../assets/images/challenge.png';
import walkthroughIcon from '../assets/images/walkthrough.png';
import profileIcon from '../assets/images/profile.png';

const Sidebar = ({children}) => {
    const menuItem = [
        {
            path:"/",
            name:"home",
            icon: homeIcon
        },
        {
            path:"/challenge",
            name:"challenge",
            icon: challengeIcon
        },
        {
            path:"/walkthrough",
            name:"walkthrough",
            icon: walkthroughIcon
        },
        {
            path:"/profile",
            name:"profile",
            icon: profileIcon
        }
    ];

    return (
        <div className="sidebar-container">
            <div className="sidebar">
                {menuItem.map((item, index) => (
                    <NavLink 
                        to={item.path} 
                        key={index} 
                        className="link" 
                        activeClassName="active"
                    >
                        <div className="icon-container">
                            <img src={item.icon} className="sidebar-icon" alt={item.name} />
                            <div className="item-hover-text">{item.name}</div>
                        </div>
                    </NavLink>
                ))}
            </div>
            <main>{children}</main>
        </div>
    );
}

export default Sidebar;
