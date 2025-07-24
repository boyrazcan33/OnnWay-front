// src/types.ts
// All the types that match backend DTOs

export enum City {
    TALLINN = 'TALLINN',
    ISTANBUL = 'ISTANBUL'
}

export enum ActivityType {
    FOOD = 'FOOD',
    ART_HISTORY = 'ART_HISTORY',
    SOCIAL_MEDIA = 'SOCIAL_MEDIA',
    ADVENTURE = 'ADVENTURE'
}

export enum BudgetRange {
    BUDGET = 'BUDGET',
    MID_RANGE = 'MID_RANGE',
    PREMIUM = 'PREMIUM'
}

export enum Duration {
    SHORT = 'SHORT',
    MEDIUM = 'MEDIUM',
    LONG = 'LONG'
}

// Request to backend
export interface RouteRequest {
    startLat: number;
    startLon: number;
    city: City;
    activity: ActivityType;
    budget: BudgetRange;
    duration: Duration;
}

// Response from backend
export interface RouteResponse {
    optimizedRoute: RouteStop[];
    totalDistance: string;
    totalDuration: string;
    totalCost: number;
}

export interface RouteStop {
    order: number;
    name: string;
    address: string;
    description: string;
    estimatedDuration: number;
    walkingTime: string;
    cost: number;
}

// UI State types
export interface UserLocation {
    lat: number;
    lon: number;
}

export interface FormState {
    selectedCity: City | null;
    activity: ActivityType | null;
    budget: BudgetRange | null;
    duration: Duration | null;
}

// Enhanced interfaces for new features
export interface RouteStopEnhanced extends RouteStop {
    latitude?: number;
    longitude?: number;
}

// Interface for full attraction data from backend
export interface Attraction {
    id: number;
    name: string;
    address: string;
    description: string;
    latitude: number;
    longitude: number;
    city: string;
    activity_type: string;
    budget_range: string;
    estimated_duration: number;
    avg_cost: number;
}