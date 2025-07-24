// src/components/DancingTourist.tsx
import React from 'react';
import './DancingTourist.scss';

const DancingTourist: React.FC = () => {
    return (
        <div className="dancing-tourist">
            <svg width="200" height="250" viewBox="0 0 200 250">
                {/* Head */}
                <circle
                    cx="100"
                    cy="40"
                    r="25"
                    fill="#ffdbac"
                    className="head"
                />

                {/* Eyes */}
                <circle cx="92" cy="35" r="3" fill="#333" className="eye-left" />
                <circle cx="108" cy="35" r="3" fill="#333" className="eye-right" />

                {/* Smile */}
                <path
                    d="M 90 45 Q 100 52 110 45"
                    stroke="#333"
                    strokeWidth="2"
                    fill="none"
                    className="smile"
                />

                {/* Hat */}
                <ellipse
                    cx="100"
                    cy="20"
                    rx="30"
                    ry="8"
                    fill="#ff6b6b"
                    className="hat"
                />

                {/* Hat detail */}
                <circle cx="100" cy="20" r="4" fill="#ff5252" />

                {/* Body */}
                <rect
                    x="80"
                    y="65"
                    width="40"
                    height="60"
                    rx="10"
                    fill="#4ecdc4"
                    className="body"
                />

                {/* Shirt details */}
                <rect x="85" y="70" width="30" height="3" fill="#45b7aa" />
                <rect x="85" y="76" width="30" height="3" fill="#45b7aa" />

                {/* Left Arm */}
                <rect
                    x="60"
                    y="75"
                    width="25"
                    height="8"
                    rx="4"
                    fill="#ffdbac"
                    className="left-arm"
                    style={{ transformOrigin: '72px 79px' }}
                />

                {/* Right Arm */}
                <rect
                    x="115"
                    y="75"
                    width="25"
                    height="8"
                    rx="4"
                    fill="#ffdbac"
                    className="right-arm"
                    style={{ transformOrigin: '128px 79px' }}
                />

                {/* Backpack */}
                <rect
                    x="85"
                    y="70"
                    width="30"
                    height="35"
                    rx="5"
                    fill="#8b4513"
                    className="backpack"
                />

                {/* Backpack straps */}
                <rect x="88" y="68" width="4" height="20" fill="#654321" className="strap-left" />
                <rect x="108" y="68" width="4" height="20" fill="#654321" className="strap-right" />

                {/* Backpack pocket */}
                <rect x="90" y="80" width="20" height="15" rx="3" fill="#a0522d" />
                <circle cx="100" cy="87" r="2" fill="#654321" />

                {/* Left Leg */}
                <rect
                    x="88"
                    y="125"
                    width="8"
                    height="40"
                    fill="#333"
                    className="left-leg"
                />

                {/* Right Leg */}
                <rect
                    x="104"
                    y="125"
                    width="8"
                    height="40"
                    fill="#333"
                    className="right-leg"
                />

                {/* Feet */}
                <ellipse cx="92" cy="170" rx="12" ry="6" fill="#8b4513" className="foot-left" />
                <ellipse cx="108" cy="170" rx="12" ry="6" fill="#8b4513" className="foot-right" />

                {/* Shoe laces */}
                <ellipse cx="92" cy="168" rx="4" ry="2" fill="#654321" />
                <ellipse cx="108" cy="168" rx="4" ry="2" fill="#654321" />
            </svg>
        </div>
    );
};

export default DancingTourist;