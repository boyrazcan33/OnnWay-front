// src/components/DancingTourist.tsx
import React from 'react';
import './DancingTourist.scss';

const DancingTourist: React.FC = () => {
    return (
        <div className="dancing-tourist">
            <svg width="300" height="340" viewBox="0 0 300 340">
                {/* Head (side view) */}
                <ellipse
                    cx="150"
                    cy="50"
                    rx="30"
                    ry="35"
                    fill="#8B4513"
                    className="head"
                />

                {/* Eye (side view - only one visible) */}
                <circle cx="165" cy="45" r="4" fill="#333" className="eye" />

                {/* Nose (side profile) */}
                <ellipse cx="175" cy="50" rx="3" ry="6" fill="#654321" className="nose" />

                {/* Michael Jackson Hat (black fedora) */}
                <ellipse
                    cx="150"
                    cy="25"
                    rx="40"
                    ry="15"
                    fill="#1a1a1a"
                    className="hat-top"
                />
                {/* Hat brim */}
                <ellipse
                    cx="150"
                    cy="35"
                    rx="50"
                    ry="8"
                    fill="#000"
                    className="hat-brim"
                />
                {/* Hat band */}
                <rect x="110" y="30" width="80" height="4" fill="#333" className="hat-band" />

                {/* Body (side view - oval) */}
                <ellipse
                    cx="150"
                    cy="140"
                    rx="45"
                    ry="65"
                    fill="#fff"
                    stroke="#000"
                    strokeWidth="3"
                    className="body"
                />

                {/* Black vest/jacket */}
                <ellipse
                    cx="150"
                    cy="120"
                    rx="40"
                    ry="40"
                    fill="#1a1a1a"
                    className="jacket"
                />

                {/* White shirt visible */}
                <ellipse
                    cx="150"
                    cy="130"
                    rx="30"
                    ry="25"
                    fill="#fff"
                    className="shirt"
                />

                {/* Left Arm (closer to viewer) */}
                <ellipse
                    cx="110"
                    cy="120"
                    rx="12"
                    ry="35"
                    fill="#8B4513"
                    className="left-arm"
                    style={{ transformOrigin: '110px 105px' }}
                />

                {/* Right Arm (further from viewer) */}
                <ellipse
                    cx="190"
                    cy="120"
                    rx="12"
                    ry="35"
                    fill="#8B4513"
                    className="right-arm"
                    style={{ transformOrigin: '190px 105px' }}
                />

                {/* Hand with ONNWAY text (appears during animation) */}
                <g className="onnway-hand">
                    <circle cx="90" cy="80" r="8" fill="#8B4513" />
                    <text
                        x="90"
                        y="60"
                        textAnchor="middle"
                        fontSize="16"
                        fontWeight="bold"
                        fill="#4ecdc4"
                        className="onnway-text"
                    >
                        ONNWAY
                    </text>
                </g>

                {/* Left Leg (closer) */}
                <ellipse
                    cx="130"
                    cy="240"
                    rx="15"
                    ry="50"
                    fill="#1a1a1a"
                    className="left-leg"
                />

                {/* Right Leg (further) */}
                <ellipse
                    cx="170"
                    cy="240"
                    rx="15"
                    ry="50"
                    fill="#1a1a1a"
                    className="right-leg"
                />

                {/* Feet (moonwalk shoes) */}
                <ellipse cx="130" cy="300" rx="18" ry="8" fill="#000" className="foot-left" />
                <ellipse cx="170" cy="300" rx="18" ry="8" fill="#000" className="foot-right" />

                {/* Shoe details (white socks visible) */}
                <rect x="125" y="290" width="10" height="8" fill="#fff" />
                <rect x="165" y="290" width="10" height="8" fill="#fff" />
            </svg>
        </div>
    );
};

export default DancingTourist;