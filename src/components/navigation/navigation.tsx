import React, { useState } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

export const Navigation: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="https://img.uefa.com/imgml/uefacom/euro2024/rebrand/newlogo_onDark.png" alt="logo" className="logo-image" />
            </div>
            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>

                <li><Link to="/groups">GROUPS</Link></li>
                <li><Link to="/">FINALS</Link></li>

            </ul>
            <div className="menu-toggle" onClick={toggleMenu}>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
            </div>
        </nav>
    );
};

export default Navigation;
