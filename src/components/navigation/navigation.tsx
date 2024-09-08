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
            <div className="navbar-logo">European Football Championship</div>
            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                <li><a href="/">TEAMS</a></li>
                <li><Link to="/">MATCHES</Link></li>
                <li><Link to="/records">RECORDS</Link></li>
                <li><a href="/contact">PLAYERS</a></li>
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
