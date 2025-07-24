import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CitySelector from './CitySelector';
import { City } from '../types';

test('apply button disabled when form incomplete', () => {
    const props = {
        formState: { selectedCity: City.TALLINN, activity: null, budget: null, duration: null },
        onCitySelect: jest.fn(),
        onParameterChange: jest.fn(),
        onApply: jest.fn(),
        loading: false
    };

    render(<CitySelector {...props} />);

    const applyButton = screen.getByRole('button', { name: /Create My Route/ });
    expect(applyButton).toBeDisabled();
});