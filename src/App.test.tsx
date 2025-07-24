import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Jest mock for geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};
Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
});

// Jest mock for API
jest.mock('./services/api', () => ({
  createRoute: jest.fn(),
  getAttractions: jest.fn(),
}));

test('shows cities when location granted', async () => {
  mockGeolocation.getCurrentPosition.mockImplementation((success) => {
    success({
      coords: { latitude: 59.4370, longitude: 24.7536 }
    });
  });

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/Tallinn/)).toBeInTheDocument();
    expect(screen.getByText(/Istanbul/)).toBeInTheDocument();
  });
});