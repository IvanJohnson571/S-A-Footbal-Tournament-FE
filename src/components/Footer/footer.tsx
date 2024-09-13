import React from 'react';
import './footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} © 1998-2024 UEFA. All rights reserved.
                The UEFA word, the UEFA logo and all marks related to UEFA competitions, are protected by trademarks and/or copyright of UEFA. No use for commercial purposes may be made of such trademarks. Use of UEFA.com signifies your agreement to the Terms and Conditions and Privacy Policy.</p>
        </footer>
    );
};

export default Footer;
