// src/components/RouteMap.tsx
import React, { useEffect, useRef, useState } from 'react';
import { RouteStopEnhanced, UserLocation } from '../types';
import './RouteMap.scss';

interface RouteMapProps {
    route: RouteStopEnhanced[];
    userLocation: UserLocation;
    onAttractionClick?: (stop: RouteStopEnhanced) => void;
}

declare global {
    interface Window {
        L: any;
    }
}

const RouteMap: React.FC<RouteMapProps> = ({ route, userLocation, onAttractionClick }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const [selectedStop, setSelectedStop] = useState<RouteStopEnhanced | null>(null);
    const [leafletLoaded, setLeafletLoaded] = useState(false);

    // Load Leaflet library
    useEffect(() => {
        if (window.L) {
            setLeafletLoaded(true);
            return;
        }

        // Load Leaflet CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.id = 'leaflet-css';
        if (!document.getElementById('leaflet-css')) {
            document.head.appendChild(link);
        }

        // Load Leaflet JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.id = 'leaflet-js';
        script.onload = () => {
            setLeafletLoaded(true);
        };

        if (!document.getElementById('leaflet-js')) {
            document.head.appendChild(script);
        }
    }, []);

    // Initialize map when Leaflet is loaded
    useEffect(() => {
        if (!leafletLoaded || !mapRef.current || !window.L) return;

        // Clean up existing map instance
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }

        // Initialize new map
        try {
            const map = window.L.map(mapRef.current, {
                center: [userLocation.lat, userLocation.lon],
                zoom: 13,
                zoomControl: true,
                attributionControl: true
            });

            mapInstanceRef.current = map;

            // Add tile layer
            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(map);

            // Add user location marker
            const userIcon = window.L.divIcon({
                html: '<div class="user-marker">📍</div>',
                className: 'custom-marker',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            window.L.marker([userLocation.lat, userLocation.lon], { icon: userIcon })
                .addTo(map)
                .bindPopup('Your Location');

            // Add route markers and polyline
            addRouteToMap(map);

        } catch (error) {
            console.error('Error initializing map:', error);
        }

        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [leafletLoaded, userLocation, route]);

    const addRouteToMap = (map: any) => {
        if (!map || !window.L) return;

        const routeCoordinates = [[userLocation.lat, userLocation.lon]];

        // Add route markers
        route.forEach((stop) => {
            if (stop.latitude && stop.longitude) {
                const stopIcon = window.L.divIcon({
                    html: `<div class="stop-marker">${stop.order}</div>`,
                    className: 'custom-marker',
                    iconSize: [40, 40],
                    iconAnchor: [20, 20]
                });

                const marker = window.L.marker([stop.latitude, stop.longitude], { icon: stopIcon })
                    .addTo(map)
                    .bindPopup(`<strong>${stop.name}</strong><br/>${stop.address}`);

                marker.on('click', () => {
                    setSelectedStop(stop);
                    onAttractionClick?.(stop);
                });

                routeCoordinates.push([stop.latitude, stop.longitude]);
            }
        });

        // Add route polyline
        if (routeCoordinates.length > 1) {
            window.L.polyline(routeCoordinates, {
                color: '#007bff',
                weight: 4,
                opacity: 0.7,
                smoothFactor: 1
            }).addTo(map);
        }

        // Fit map to show all points with padding
        if (routeCoordinates.length > 1) {
            const group = new window.L.featureGroup(
                routeCoordinates.map(coord => window.L.marker(coord))
            );
            map.fitBounds(group.getBounds().pad(0.1));
        }
    };

    const openInMaps = () => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const validStops = route.filter(stop => stop.latitude && stop.longitude);

        if (validStops.length === 0) return;

        const waypoints = validStops
            .map(stop => `${stop.latitude},${stop.longitude}`)
            .join('|');

        if (isIOS) {
            // Apple Maps
            const appleUrl = `http://maps.apple.com/?daddr=${waypoints}&dirflg=w`;
            window.open(appleUrl, '_blank');
        } else {
            // Google Maps
            const googleUrl = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lon}/${waypoints}`;
            window.open(googleUrl, '_blank');
        }
    };

    const openStreetView = (stop: RouteStopEnhanced) => {
        if (stop.latitude && stop.longitude) {
            const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${stop.latitude},${stop.longitude}`;
            window.open(streetViewUrl, '_blank');
        }
    };

    if (!leafletLoaded) {
        return (
            <div className="route-map">
                <div className="map-header">
                    <h3>📍 Loading Map...</h3>
                </div>
                <div className="map-container">
                    <div className="map" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f0f0f0',
                        color: '#666'
                    }}>
                        Loading map library...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="route-map">
            <div className="map-header">
                <h3>📍 Route Map</h3>
                <button className="open-maps-btn" onClick={openInMaps}>
                    Open in Maps
                </button>
            </div>

            <div className="map-container">
                <div ref={mapRef} className="map" />

                {selectedStop && (
                    <div className="map-sidebar">
                        <div className="selected-stop">
                            <h4>{selectedStop.name}</h4>
                            <p>{selectedStop.address}</p>
                            <div className="stop-actions">
                                <button
                                    className="street-view-btn"
                                    onClick={() => openStreetView(selectedStop)}
                                >
                                    👁️ Street View
                                </button>
                                <button
                                    className="close-btn"
                                    onClick={() => setSelectedStop(null)}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RouteMap;