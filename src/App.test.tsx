// src/App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock geolocation before importing App
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
  writable: true,
});

test('app renders loading screen initially', () => {
  // Mock geolocation to not call callback (simulates loading)
  mockGeolocation.getCurrentPosition.mockImplementation(() => {});

  render(<App />);

  // Should show loading message
  expect(screen.getByText(/Getting your location/i)).toBeInTheDocument();
});

test('app shows error when location denied', async () => {
  // Mock permission denied
  mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
    error({
      code: 1, // PERMISSION_DENIED
      message: 'Permission denied',
    });
  });

  render(<App />);

  // Wait for error to appear
  const errorElement = await screen.findByText(/Location Required/i);
  expect(errorElement).toBeInTheDocument();
});