// src/App.tsx
// Main application component
import React, { useState } from 'react';
import { useLocation } from './hooks/useLocation';
import { createRoute } from './services/api';
import CitySelector from './components/CitySelector';
import RouteDisplay from './components/RouteDisplay';
import { City, ActivityType, BudgetRange, Duration, FormState, RouteResponse, RouteRequest } from './types';
import './App.scss';

function App() {
  // Get user location using custom hook
  const { location, loading: locationLoading, error: locationError } = useLocation();

  // Form state for user selections
  const [formState, setFormState] = useState<FormState>({
    selectedCity: null,
    activity: null,
    budget: null,
    duration: null
  });

  // Route generation state
  const [route, setRoute] = useState<RouteResponse | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);

  // Handle city selection - blur the other side
  const handleCitySelect = (city: City) => {
    setFormState({
      selectedCity: city,
      activity: null,
      budget: null,
      duration: null
    });
    // Clear any existing route when changing city
    setRoute(null);
    setRouteError(null);
  };

  // Handle parameter changes
  const handleParameterChange = (param: 'activity' | 'budget' | 'duration', value: any) => {
    setFormState(prev => ({
      ...prev,
      [param]: value
    }));
  };

  // Handle route creation
  const handleApply = async () => {
    if (!location || !formState.selectedCity || !formState.activity || !formState.budget || !formState.duration) {
      return;
    }

    setRouteLoading(true);
    setRouteError(null);

    try {
      const request: RouteRequest = {
        startLat: location.lat,
        startLon: location.lon,
        city: formState.selectedCity,
        activity: formState.activity,
        budget: formState.budget,
        duration: formState.duration
      };

      const response = await createRoute(request);
      setRoute(response);
    } catch (error) {
      setRouteError(error instanceof Error ? error.message : 'Failed to create route');
    } finally {
      setRouteLoading(false);
    }
  };

  // Handle creating new route
  const handleCreateNew = () => {
    setRoute(null);
    setRouteError(null);
    setFormState({
      selectedCity: null,
      activity: null,
      budget: null,
      duration: null
    });
  };

  // Show loading spinner while getting location
  if (locationLoading) {
    return (
        <div className="app">
          <div className="loading-screen">
            <div className="spinner"></div>
            <h2>Getting your location...</h2>
            <p>Please allow location access for the app to work</p>
          </div>
        </div>
    );
  }

  // Show error if location access denied
  if (locationError) {
    return (
        <div className="app">
          <div className="error-screen">
            <h2>❌ Location Required</h2>
            <p>{locationError}</p>
            <p>This app needs your location to create optimized routes. Please refresh and allow location access.</p>
          </div>
        </div>
    );
  }

  return (
      <div className="app">
        <header className="app-header">
          <h1>🗺️ OnnWay </h1>
          <p>Create optimized tourism routes for Istanbul and Tallinn</p>
        </header>

        <main className="app-main">
          {/* Show route if generated, otherwise show city selector */}
          {route ? (
              <RouteDisplay
                  route={route}
                  onCreateNew={handleCreateNew}
              />
          ) : (
              <>
                <CitySelector
                    formState={formState}
                    onCitySelect={handleCitySelect}
                    onParameterChange={handleParameterChange}
                    onApply={handleApply}
                    loading={routeLoading}
                />

                {/* Show route error if any */}
                {routeError && (
                    <div className="error-message">
                      <p>❌ {routeError}</p>
                    </div>
                )}
              </>
          )}
        </main>

        <footer className="app-footer">
          <p>Built with React, TypeScript & SCSS</p>
        </footer>
      </div>
  );
}

export default App;