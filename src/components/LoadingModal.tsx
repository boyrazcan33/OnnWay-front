// src/components/LoadingModal.tsx
import React, { useState, useEffect } from 'react';
import DancingTourist from './DancingTourist';
import './LoadingModal.scss';

interface LoadingModalProps {
    isVisible: boolean;
    onClose?: () => void;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isVisible, onClose }) => {
    const [currentMessage, setCurrentMessage] = useState(0);

    const messages = [
        "Teaching the map to dance too...",
        "Finding the best spots for you...",
        "Calculating walking distances...",
        "Optimizing your perfect route...",
        "Adding some travel magic...",
        "Almost ready for your adventure!"
    ];

    useEffect(() => {
        if (!isVisible) return;

        // Rotate messages every 2.5 seconds
        const messageInterval = setInterval(() => {
            setCurrentMessage(prev => (prev + 1) % messages.length);
        }, 2500);

        return () => {
            clearInterval(messageInterval);
        };
    }, [isVisible]);

    // Reset when modal closes
    useEffect(() => {
        if (!isVisible) {
            setCurrentMessage(0);
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="loading-overlay" onClick={onClose}>
            <div className="loading-modal" onClick={e => e.stopPropagation()}>
                {/* Dancing Tourist Character */}
                <div className="tourist-container">
                    <DancingTourist />
                </div>

                {/* Loading Message */}
                <div className="loading-message">
                    <h3>{messages[currentMessage]}</h3>
                </div>

                {/* Loading Dots */}
                <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* Optional Cancel Button */}
                {onClose && (
                    <button className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default LoadingModal;