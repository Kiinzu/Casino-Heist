import React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import homeIcon from '../assets/images/home.png';
import challengeIcon from '../assets/images/challenge.png';
import walkthroughIcon from '../assets/images/walkthrough.png';
import settingIcon from '../assets/images/setting.png';

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
            path:"/setting",
            name:"setting",
            icon: settingIcon
        }
    ];

    return (
        <div className="container">
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
