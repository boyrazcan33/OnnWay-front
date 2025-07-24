import { createRoute } from './api';
import { City, ActivityType, BudgetRange, Duration } from '../types';

// Jest mock
jest.mock('axios', () => ({
    create: () => ({ post: jest.fn() })
}));

test('throws error when API fails', async () => {
    const axios = require('axios');
    axios.create().post.mockRejectedValue(new Error('Network Error'));

    const request = {
        startLat: 59.4370,
        startLon: 24.7536,
        city: City.TALLINN,
        activity: ActivityType.FOOD,
        budget: BudgetRange.MID_RANGE,
        duration: Duration.MEDIUM
    };

    await expect(createRoute(request)).rejects.toThrow('Failed to create route');
});