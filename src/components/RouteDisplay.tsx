// src/components/RouteDisplay.tsx
// Component to display the generated route
import React from 'react';
import { RouteResponse } from '../types';
import './RouteDisplay.scss';

interface RouteDisplayProps {
    route: RouteResponse;
    onCreateNew: () => void;
}

const RouteDisplay: React.FC<RouteDisplayProps> = ({ route, onCreateNew }) => {
    return (
        <div className="route-display">
            {/* Route Summary */}
            <div className="route-summary">
                <h2>🗺️ Your Optimized Route</h2>
                <div className="summary-stats">
                    <div className="stat">
                        <span className="label">Total Distance</span>
                        <span className="value">{route.totalDistance}</span>
                    </div>
                    <div className="stat">
                        <span className="label">Total Duration</span>
                        <span className="value">{route.totalDuration}</span>
                    </div>
                    <div className="stat">
                        <span className="label">Total Cost</span>
                        <span className="value">${route.totalCost}</span>
                    </div>
                </div>
            </div>

            {/* Route Steps */}
            <div className="route-steps">
                <h3>Route Steps</h3>
                {route.optimizedRoute.map((stop, index) => (
                    <div key={stop.order} className="route-step">
                        <div className="step-number">
                            {stop.order}
                        </div>
                        <div className="step-content">
                            <div className="step-header">
                                <h4>{stop.name}</h4>
                                <div className="step-meta">
                                    <span className="walking-time">🚶 {stop.walkingTime}</span>
                                    <span className="cost">💰 ${stop.cost}</span>
                                    <span className="duration">⏱️ {stop.estimatedDuration} min</span>
                                </div>
                            </div>
                            <p className="address">📍 {stop.address}</p>
                            <p className="description">{stop.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="route-actions">
                <button className="new-route-button" onClick={onCreateNew}>
                    Create New Route
                </button>
            </div>
        </div>
    );
};

export default RouteDisplay;