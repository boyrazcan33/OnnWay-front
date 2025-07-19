// src/hooks/useLocation.ts
// Custom hook for getting user location
import { useState, useEffect } from 'react';
import { UserLocation } from '../types';

interface LocationState {
    location: UserLocation | null;
    loading: boolean;
    error: string | null;
}

export const useLocation = () => {
    const [state, setState] = useState<LocationState>({
        location: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        // Ask for location immediately when component mounts
        if (!navigator.geolocation) {
            setState({
                location: null,
                loading: false,
                error: 'Geolocation is not supported by this browser'
            });
            return;
        }

        // Get current position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Success - got location
                setState({
                    location: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    },
                    loading: false,
                    error: null
                });
            },
            (error) => {
                // Error - permission denied or other issue
                let errorMessage = 'Unable to get location';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location access denied - app won\'t work without it';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information unavailable';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timeout';
                        break;
                }

                setState({
                    location: null,
                    loading: false,
                    error: errorMessage
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            }
        );
    }, []);

    return state;
};