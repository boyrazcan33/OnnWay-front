// src/services/api.ts
// API calls to backend - FIXED VERSION
import axios from 'axios';
import { RouteRequest, RouteResponse, City, ActivityType, BudgetRange, Duration, Attraction } from '../types';

const API_BASE_URL = 'https://route-backend-419380759408.us-central1.run.app/api';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Create optimized route
export const createRoute = async (request: RouteRequest): Promise<RouteResponse> => {
    try {
        const response = await api.post<RouteResponse>('/route/create', request);
        return response.data;
    } catch (error) {
        console.error('Error creating route:', error);
        throw new Error('Failed to create route. Please try again.');
    }
};

// Get ALL attractions for coordinate lookup - FIXED VERSION
export const getAttractions = async (): Promise<Attraction[]> => {
    try {
        // Get attractions from both cities to have all coordinates available
        const tallinAttractions = await api.get<Attraction[]>(`/attractions?city=TALLINN`);
        const istanbulAttractions = await api.get<Attraction[]>(`/attractions?city=ISTANBUL`);

        // Combine both city results
        return [...tallinAttractions.data, ...istanbulAttractions.data];
    } catch (error) {
        console.error('Error fetching attractions:', error);
        throw new Error('Failed to fetch attractions.');
    }
};

// Get filtered attractions (for other use cases)
export const getFilteredAttractions = async (
    city: City,
    activity?: ActivityType,
    budget?: BudgetRange
): Promise<Attraction[]> => {
    try {
        const params = new URLSearchParams();
        params.append('city', city);
        if (activity) params.append('activity', activity);
        if (budget) params.append('budget', budget);

        const response = await api.get<Attraction[]>(`/attractions?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching filtered attractions:', error);
        throw new Error('Failed to fetch attractions.');
    }
};

export default api;