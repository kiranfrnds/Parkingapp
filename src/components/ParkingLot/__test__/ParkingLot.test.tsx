import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import ParkingLot from '../ParkingLot'

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('input element in the admin page', () => {
    render(<ParkingLot />);
    const inputElement = screen.getByTestId("parking-drawing-registration-input"); 
    expect(inputElement).toBeInTheDocument()
  });

  test('button element in document', () => {
    render(<ParkingLot />);
    const buttonElement = screen.getByTestId("parking-drawing-add-car-button"); 
    expect(buttonElement).toBeInTheDocument()
  });

  test('value in the input field', () => {
    render(<ParkingLot />);
    const inputElement = screen.getByTestId("parking-drawing-registration-input"); 
    userEvent.type(inputElement, "2");
    expect(inputElement).toBeInTheDocument()
  });