// src/services/api.ts
// API calls to backend
import axios from 'axios';
import { RouteRequest, RouteResponse } from '../types';

// Backend URL - change this to your backend URL
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

export default api;