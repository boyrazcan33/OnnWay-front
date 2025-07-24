// src/components/DancingTourist.tsx
import React from 'react';
import './DancingTourist.scss';

const DancingTourist: React.FC = () => {
    return (
        <div className="dancing-tourist">
            <svg width="280" height="320" viewBox="0 0 280 320">
                {/* Head */}
                <circle
                    cx="140"
                    cy="50"
                    r="35"
                    fill="#ffdbac"
                    className="head"
                />

                {/* Eyes */}
                <circle cx="128" cy="42" r="4" fill="#333" className="eye-left" />
                <circle cx="152" cy="42" r="4" fill="#333" className="eye-right" />

                {/* Smile */}
                <path
                    d="M 125 58 Q 140 68 155 58"
                    stroke="#333"
                    strokeWidth="3"
                    fill="none"
                    className="smile"
                />

                {/* Proper Baseball Cap */}
                <path
                    d="M 105 35 Q 140 15 175 35 Q 175 25 140 25 Q 105 25 105 35"
                    fill="#ff4444"
                    className="hat-top"
                />
                {/* Cap visor */}
                <ellipse
                    cx="140"
                    cy="35"
                    rx="45"
                    ry="8"
                    fill="#cc3333"
                    className="hat-visor"
                />

                {/* Fat Body */}
                <ellipse
                    x="90"
                    y="85"
                    cx="140"
                    cy="140"
                    rx="60"
                    ry="70"
                    fill="#4ecdc4"
                    className="body"
                />

                {/* ONNWAY Text on torso */}
                <text
                    x="140"
                    y="135"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill="#2c3e50"
                    className="onnway-text"
                >
                    ONNWAY
                </text>

                {/* Left Arm */}
                <ellipse
                    cx="85"
                    cy="110"
                    rx="12"
                    ry="25"
                    fill="#ffdbac"
                    className="left-arm"
                    style={{ transformOrigin: '85px 95px' }}
                />

                {/* Right Arm */}
                <ellipse
                    cx="195"
                    cy="110"
                    rx="12"
                    ry="25"
                    fill="#ffdbac"
                    className="right-arm"
                    style={{ transformOrigin: '195px 95px' }}
                />

                {/* Backpack */}
                <ellipse
                    cx="140"
                    cy="90"
                    rx="35"
                    ry="25"
                    fill="#8b4513"
                    className="backpack"
                />

                {/* Backpack straps */}
                <rect x="115" y="85" width="6" height="30" fill="#654321" className="strap-left" />
                <rect x="159" y="85" width="6" height="30" fill="#654321" className="strap-right" />

                {/* Fat Legs */}
                <ellipse
                    cx="120"
                    cy="240"
                    rx="18"
                    ry="45"
                    fill="#333"
                    className="left-leg"
                />

                <ellipse
                    cx="160"
                    cy="240"
                    rx="18"
                    ry="45"
                    fill="#333"
                    className="right-leg"
                />

                {/* Feet for moonwalking */}
                <ellipse cx="120" cy="290" rx="20" ry="8" fill="#8b4513" className="foot-left" />
                <ellipse cx="160" cy="290" rx="20" ry="8" fill="#8b4513" className="foot-right" />

                {/* Shoe details */}
                <ellipse cx="120" cy="287" rx="8" ry="3" fill="#654321" />
                <ellipse cx="160" cy="287" rx="8" ry="3" fill="#654321" />
            </svg>
        </div>
    );
};

export default DancingTourist;