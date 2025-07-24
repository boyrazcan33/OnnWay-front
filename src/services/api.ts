// src/services/api.ts
// API calls to backend
import axios from 'axios';
import { RouteRequest, RouteResponse, City, ActivityType, BudgetRange, Duration, Attraction } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

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

// Get attractions with coordinates - FIXED VERSION
export const getAttractions = async (
    city?: City,
    activity?: ActivityType,
    budget?: BudgetRange
    // Removed duration parameter - your backend doesn't support it
): Promise<Attraction[]> => {
    try {
        const params = new URLSearchParams();
        if (city) params.append('city', city);
        if (activity) params.append('activity', activity);
        if (budget) params.append('budget', budget);
        // Removed duration from params

        const response = await api.get<Attraction[]>(`/attractions?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching attractions:', error);
        throw new Error('Failed to fetch attractions.');
    }
};

export default api;