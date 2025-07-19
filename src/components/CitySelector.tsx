// src/components/CitySelector.tsx
// Component for selecting city and parameters
import React from 'react';
import { City, ActivityType, BudgetRange, Duration, FormState } from '../types';
import './CitySelector.scss';

interface CitySelectorProps {
    formState: FormState;
    onCitySelect: (city: City) => void;
    onParameterChange: (param: 'activity' | 'budget' | 'duration', value: any) => void;
    onApply: () => void;
    loading: boolean;
}

const CitySelector: React.FC<CitySelectorProps> = ({
                                                       formState,
                                                       onCitySelect,
                                                       onParameterChange,
                                                       onApply,
                                                       loading
                                                   }) => {

    // Check if all parameters are selected for apply button
    const canApply = formState.selectedCity &&
        formState.activity &&
        formState.budget &&
        formState.duration &&
        !loading;

    // Get readable names for enum values
    const getActivityLabel = (activity: ActivityType): string => {
        switch (activity) {
            case ActivityType.FOOD: return 'Food & Restaurants';
            case ActivityType.ART_HISTORY: return 'Art & History';
            case ActivityType.SOCIAL_MEDIA: return 'Social Media Spots';
            case ActivityType.ADVENTURE: return 'Adventure';
        }
    };

    const getBudgetLabel = (budget: BudgetRange): string => {
        switch (budget) {
            case BudgetRange.BUDGET: return 'Budget Friendly';
            case BudgetRange.MID_RANGE: return 'Mid Range';
            case BudgetRange.PREMIUM: return 'Premium';
        }
    };

    const getDurationLabel = (duration: Duration): string => {
        switch (duration) {
            case Duration.SHORT: return 'Short (3-4 hours)';
            case Duration.MEDIUM: return 'Medium (1 day)';
            case Duration.LONG: return 'Long (2+ days)';
        }
    };

    return (
        <div className="city-selector">
            {/* City Selection */}
            <div className="city-selection">
                <div
                    className={`city-card tallinn ${formState.selectedCity === City.TALLINN ? 'selected' : ''} ${formState.selectedCity && formState.selectedCity !== City.TALLINN ? 'blurred' : ''}`}
                    onClick={() => onCitySelect(City.TALLINN)}
                >
                    <h2>🇪🇪 Tallinn</h2>
                    <p>Explore the medieval charm of Estonia's capital</p>
                </div>

                <div
                    className={`city-card istanbul ${formState.selectedCity === City.ISTANBUL ? 'selected' : ''} ${formState.selectedCity && formState.selectedCity !== City.ISTANBUL ? 'blurred' : ''}`}
                    onClick={() => onCitySelect(City.ISTANBUL)}
                >
                    <h2>🇹🇷 Istanbul</h2>
                    <p>Discover where Europe meets Asia</p>
                </div>
            </div>

            {/* Parameters Selection - only show when city is selected */}
            {formState.selectedCity && (
                <div className="parameters-section">
                    <h3>Choose Your Preferences</h3>

                    {/* Activity Type */}
                    <div className="parameter-group">
                        <h4>Activity Type</h4>
                        <div className="radio-group">
                            {Object.values(ActivityType).map((activity) => (
                                <label key={activity} className="radio-label">
                                    <input
                                        type="radio"
                                        name="activity"
                                        value={activity}
                                        checked={formState.activity === activity}
                                        onChange={() => onParameterChange('activity', activity)}
                                    />
                                    <span>{getActivityLabel(activity)}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Budget Range */}
                    <div className="parameter-group">
                        <h4>Budget Range</h4>
                        <div className="radio-group">
                            {Object.values(BudgetRange).map((budget) => (
                                <label key={budget} className="radio-label">
                                    <input
                                        type="radio"
                                        name="budget"
                                        value={budget}
                                        checked={formState.budget === budget}
                                        onChange={() => onParameterChange('budget', budget)}
                                    />
                                    <span>{getBudgetLabel(budget)}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="parameter-group">
                        <h4>Trip Duration</h4>
                        <div className="radio-group">
                            {Object.values(Duration).map((duration) => (
                                <label key={duration} className="radio-label">
                                    <input
                                        type="radio"
                                        name="duration"
                                        value={duration}
                                        checked={formState.duration === duration}
                                        onChange={() => onParameterChange('duration', duration)}
                                    />
                                    <span>{getDurationLabel(duration)}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Apply Button */}
                    <button
                        className={`apply-button ${canApply ? 'enabled' : 'disabled'}`}
                        onClick={onApply}
                        disabled={!canApply}
                    >
                        {loading ? 'Creating Route...' : 'Create My Route'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CitySelector;