import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './BackToHomeButton.css';

const BackToHomeButton = () => {
    return (
        <div className="back-to-home">
            <Link to="/">
                <FaHome className="home-icon" />
                Voltar para Home
            </Link>
        </div>
    );
};

export default BackToHomeButton;
