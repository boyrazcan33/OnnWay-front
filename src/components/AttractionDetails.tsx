// src/components/AttractionDetails.tsx
import React from 'react';
import { RouteStopEnhanced } from '../types';
import './AttractionDetails.scss';

interface AttractionDetailsProps {
    stop: RouteStopEnhanced;
    onClose: () => void;
}

const AttractionDetails: React.FC<AttractionDetailsProps> = ({ stop, onClose }) => {
    const openGoogleMaps = () => {
        if (stop.latitude && stop.longitude) {
            const url = `https://www.google.com/maps/search/?api=1&query=${stop.latitude},${stop.longitude}`;
            window.open(url, '_blank');
        } else {
            // Fallback to search by name
            const query = encodeURIComponent(stop.name + ' ' + stop.address);
            const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
            window.open(url, '_blank');
        }
    };

    const openTripAdvisor = () => {
        const query = encodeURIComponent(stop.name);
        const url = `https://www.tripadvisor.com/Search?q=${query}`;
        window.open(url, '_blank');
    };

    const openStreetView = () => {
        if (stop.latitude && stop.longitude) {
            const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${stop.latitude},${stop.longitude}`;
            window.open(url, '_blank');
        } else {
            // Fallback to regular maps
            openGoogleMaps();
        }
    };

    return (
        <div className="attraction-details-overlay" onClick={onClose}>
            <div className="attraction-details" onClick={e => e.stopPropagation()}>
                <div className="details-header">
                    <div className="header-content">
                        <h2>{stop.name}</h2>
                        <p className="address">📍 {stop.address}</p>
                    </div>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="details-content">
                    <div className="description">
                        <h3>About</h3>
                        <p>{stop.description}</p>
                        <div className="visit-info">
                            <div className="info-item">
                                <span className="label">Duration:</span>
                                <span className="value">{stop.estimatedDuration} minutes</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Cost:</span>
                                <span className="value">${stop.cost}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Walking Time:</span>
                                <span className="value">{stop.walkingTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className="actions">
                        <h3>Quick Actions</h3>
                        <div className="action-buttons">
                            <button className="action-btn maps" onClick={openGoogleMaps}>
                                🗺️ Google Maps
                            </button>
                            <button className="action-btn street-view" onClick={openStreetView}>
                                👁️ Street View
                            </button>
                            <button className="action-btn reviews" onClick={openTripAdvisor}>
                                📝 TripAdvisor
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttractionDetails;