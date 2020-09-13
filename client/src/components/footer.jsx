import React from 'react';

import '../styles/navbar.styles.css';

const Footer = (props) => {
    return (
        <div className="footer">
            <p>{ props.content }</p>
        </div>
    );
}

export default Footer;