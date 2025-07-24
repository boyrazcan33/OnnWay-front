// src/components/RouteDisplay.tsx
// Component to display the generated route - FIXED VERSION
import React, { useState, useEffect } from 'react';
import { RouteResponse, RouteStopEnhanced, UserLocation } from '../types';
import RouteMap from './RouteMap';
import AttractionDetails from './AttractionDetails';
import { getAttractions } from '../services/api';
import './RouteDisplay.scss';

interface RouteDisplayProps {
    route: RouteResponse;
    userLocation: UserLocation;
    onCreateNew: () => void;
}

const RouteDisplay: React.FC<RouteDisplayProps> = ({ route, userLocation, onCreateNew }) => {
    const [selectedStop, setSelectedStop] = useState<RouteStopEnhanced | null>(null);
    const [enhancedRoute, setEnhancedRoute] = useState<RouteStopEnhanced[]>([]);

    useEffect(() => {
        // Fetch all attractions to get coordinates
        const fetchCoordinates = async () => {
            try {
                // Get ALL attractions from your API (no filters to avoid 400 error)
                const allAttractions = await getAttractions();

                // Match route stops with full attraction data
                const enhanced = route.optimizedRoute.map(stop => {
                    const fullAttraction = allAttractions.find(
                        attraction => attraction.name === stop.name
                    );

                    return {
                        ...stop,
                        latitude: fullAttraction?.latitude,
                        longitude: fullAttraction?.longitude
                    };
                });

                setEnhancedRoute(enhanced);
                console.log('Enhanced route with coordinates:', enhanced);
            } catch (error) {
                console.error('Failed to fetch attraction coordinates:', error);
                // Fallback: use route without coordinates (map won't show)
                setEnhancedRoute(route.optimizedRoute.map(stop => ({ ...stop })));
            }
        };

        fetchCoordinates();
    }, [route]);

    const handleStopClick = (stop: RouteStopEnhanced) => {
        setSelectedStop(stop);
    };

    const shareRoute = () => {
        if (navigator.share) {
            navigator.share({
                title: 'My Tourism Route',
                text: `Check out my optimized route: ${route.totalDistance}, ${route.totalDuration}`,
                url: window.location.href
            });
        } else {
            const routeText = `My Tourism Route:\n${enhancedRoute.map(stop => `${stop.order}. ${stop.name}`).join('\n')}`;
            navigator.clipboard.writeText(routeText);
            alert('Route copied to clipboard!');
        }
    };

    // Debug: Check if we have coordinates
    const hasCoordinates = enhancedRoute.some(stop => stop.latitude && stop.longitude);
    console.log('Has coordinates for map:', hasCoordinates);

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
                <div className="summary-actions">
                    <button className="share-btn" onClick={shareRoute}>
                        📤 Share Route
                    </button>
                </div>
            </div>

            {/* Debug info - remove this later */}
            <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
                <small>
                    Debug: Enhanced route loaded: {enhancedRoute.length} stops,
                    Has coordinates: {hasCoordinates ? 'Yes' : 'No'}
                    {hasCoordinates && ` (${enhancedRoute.filter(s => s.latitude).length} with coords)`}
                </small>
            </div>

            {/* Interactive Map - Shows when coordinates are loaded */}
            {hasCoordinates && (
                <RouteMap
                    route={enhancedRoute}
                    userLocation={userLocation}
                    onAttractionClick={handleStopClick}
                />
            )}

            {!hasCoordinates && (
                <div style={{ background: '#fff3cd', padding: '15px', margin: '15px 0', borderRadius: '5px', border: '1px solid #ffeaa7' }}>
                    <p><strong>Map temporarily unavailable</strong> - Could not load attraction coordinates. All other features work normally!</p>
                </div>
            )}

            {/* Route Steps */}
            <div className="route-steps">
                <h3>Route Steps</h3>
                {enhancedRoute.map((stop) => (
                    <div key={stop.order} className="route-step" onClick={() => handleStopClick(stop)}>
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
                            <button className="details-btn">
                                View Details →
                            </button>
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

            {/* Attraction Details Modal */}
            {selectedStop && (
                <AttractionDetails
                    stop={selectedStop}
                    onClose={() => setSelectedStop(null)}
                />
            )}
        </div>
    );
};

export default RouteDisplay;