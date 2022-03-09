import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import PieChart from '../PieChart';
window.React = React;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

describe('PieChart Component', () => {
  let mockAppState = {};
  beforeEach(() => {
    useDispatch.mockImplementation(() => () => {});
    useSelector.mockImplementation((callback) => {
      return callback(mockAppState);
    });
  });
  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });
  it('check loading', () => {
    mockAppState = {
      pieChart: {
        pieData: {},
        isLoading: true,
        isError: false
      }
    };
    const { container } = render(<PieChart />);
    expect(container).toMatchSnapshot();
    expect(container.querySelector('span'));
  });
  it('success task', () => {
    mockAppState = {
      pieChart: {
        pieData: { android: 70, iOS: 30 },
        isLoading: false,
        isError: false
      }
    };
    const { container } = render(<PieChart />);
    expect(container).toMatchSnapshot();
    expect(container.querySelector('canvas')).toBeTruthy();
  });
  it('error task', () => {
    mockAppState = {
      pieChart: {
        pieData: {},
        isLoading: false,
        isError: true
      }
    };
    const { container } = render(<PieChart />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Error')).toBeTruthy();
  });
});
