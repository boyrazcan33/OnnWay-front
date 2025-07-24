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
    const [progress, setProgress] = useState(0);

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

        // Simulate progress (this would be real progress in production)
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                return prev + Math.random() * 15;
            });
        }, 800);

        return () => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
        };
    }, [isVisible]);

    // Reset when modal closes
    useEffect(() => {
        if (!isVisible) {
            setCurrentMessage(0);
            setProgress(0);
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

                {/* Progress Bar */}
                <div className="progress-container">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                    <div className="progress-text">
                        {Math.round(Math.min(progress, 100))}%
                    </div>
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