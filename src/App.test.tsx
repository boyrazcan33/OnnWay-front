import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
});

jest.mock('./services/api', () => ({
  createRoute: jest.fn(),
  getAttractions: jest.fn(),
}));

test('app renders loading screen initially', () => {
  mockGeolocation.getCurrentPosition.mockImplementation(() => {});

  render(<App />);

  expect(screen.getByText(/Getting your location/i)).toBeInTheDocument();
});

test('app shows error when location denied', async () => {
  mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
    error({
      code: 1,
      message: 'Permission denied',
    });
  });

  render(<App />);

  const errorElement = await screen.findByText(/Location Required/i);
  expect(errorElement).toBeInTheDocument();
});

test('shows cities when location granted', async () => {
  mockGeolocation.getCurrentPosition.mockImplementation((success) => {
    success({
      coords: { latitude: 59.4370, longitude: 24.7536 }
    });
  });

  render(<App />);

  // Use the exact text that appears in the HTML
  await waitFor(() => {
    expect(screen.getByText('🇪🇪 Tallinn')).toBeInTheDocument();
  });

  expect(screen.getByText('🇹🇷 Istanbul')).toBeInTheDocument();
});