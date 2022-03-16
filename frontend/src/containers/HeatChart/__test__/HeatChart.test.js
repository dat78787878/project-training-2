import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import HeatChart from '../HeatChart';
window.React = React;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));
jest.mock('react-apexcharts', () => 'Chart');
describe('HeatChart Component', () => {
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
      heatChart: {
        heatData: [],
        isLoading: true,
        isError: false
      }
    };
    const { container } = render(<HeatChart />);
    expect(container).toMatchSnapshot();
    expect(container.querySelector('div').firstChild.className).toEqual('loading');
  });
  it('error task', () => {
    mockAppState = {
      heatChart: {
        heatData: [],
        isLoading: false,
        isError: true
      }
    };
    const { container } = render(<HeatChart />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Error')).toBeTruthy();
  });
  it('success task', () => {
    mockAppState = {
      heatChart: {
        heatData: [
          {
            name: 'Monday',
            data: [
              { x: '1', y: 5 },
              { x: '2', y: 5 },
              { x: '3', y: 5 }
            ]
          },
          {
            name: 'Tuesday',
            data: [
              { x: '1', y: 6 },
              { x: '2', y: 6 },
              { x: '3', y: 6 }
            ]
          },
          {
            name: 'March',
            data: [
              { x: '1', y: 2 },
              { x: '2', y: 2 },
              { x: '3', y: 2 }
            ]
          }
        ],
        isLoading: false,
        isError: false
      }
    };
    const { container } = render(<HeatChart />);
    expect(container).toMatchSnapshot();
    expect(container.getElementsByClassName('apexcharts-canvas'));
  });
});
