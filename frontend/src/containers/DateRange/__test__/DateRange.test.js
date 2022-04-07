import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DateRange from '../DateRange';
import { useDispatch } from 'react-redux';
import 'react-dates/initialize';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}));

describe('DateRange', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    useDispatch.mockImplementation(() => mockDispatch);
  });
  afterEach(() => {
    useDispatch.mockClear();
  });
  it('renders correctly', () => {
    const { container } = render(
      <BrowserRouter>
        <DateRange />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
    expect(container).toBeTruthy();
    expect(container.getElementsByClassName('dateRange'));
  });
  it('change date range and dispatch', () => {
    const mockDate = '04/03/2022';
    const { container, getByRole, getByText } = render(
      <BrowserRouter>
        <DateRange />
      </BrowserRouter>
    );
    // const input = getByRole('textbox', { name: /Start Date/i }).focus();
    const input = getByRole('textbox', { name: /Start Date/i });
    fireEvent.change(input, { target: { value: '04/03/2022' } });
    expect(input.value).toEqual(mockDate);
    const buttonOK = getByText('OKE');
    fireEvent.click(buttonOK);
    expect(container).toMatchSnapshot();
  });
});
