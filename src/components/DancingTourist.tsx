// src/components/DancingTourist.tsx
import React from 'react';
import './DancingTourist.scss';

import moonwalkCharacter from '../images/MJ.png';

const DancingTourist: React.FC = () => {
    return (
        <div className="dancing-tourist">
            <div className="character-container">
                {/* Your AI-generated PNG character */}
                <img
                    src={moonwalkCharacter}
                    alt="Moonwalking character"
                    className="moonwalk-character"
                />

                {/* ONNWAY text that appears above pointing finger */}
                <div className="onnway-text">
                    <span>ONNWAY</span>
                </div>

                {/* Moonwalk dust effects to simulate foot sliding */}
                <div className="moonwalk-effects">
                    <div className="dust-cloud dust-1"></div>
                    <div className="dust-cloud dust-2"></div>
                    <div className="dust-cloud dust-3"></div>
                </div>
            </div>
        </div>
    );
};

export default DancingTourist;