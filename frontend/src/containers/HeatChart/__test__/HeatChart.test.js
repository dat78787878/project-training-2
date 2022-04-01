import React from 'react';
import { render } from '@testing-library/react';
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
      },
      dateRange: {
        fromDate: '2022-03-31',
        toDate: '2022-03-31'
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
      },
      dateRange: {
        fromDate: '2022-03-31',
        toDate: '2022-03-31'
      }
    };
    const { container, getByText } = render(<HeatChart />);
    expect(container).toMatchSnapshot();
    expect(getByText('Error')).toBeTruthy();
  });
  it('success task', () => {
    mockAppState = {
      heatChart: {
        heatData: [
          {
            name: 'Monday',
            data: [
              { x: '1:00', y: 5 },
              { x: '2:00', y: 5 },
              { x: '3:00', y: 5 }
            ]
          },
          {
            name: 'Tuesday',
            data: [
              { x: '2:00', y: 6 },
              { x: '10:00', y: 6 },
              { x: '3:00', y: 6 }
            ]
          },
          {
            name: 'March',
            data: [
              { x: '4:00', y: 2 },
              { x: '5:00', y: 2 },
              { x: '6:00', y: 2 }
            ]
          }
        ],
        isLoading: false,
        isError: false
      },
      dateRange: {
        fromDate: '2022-03-31',
        toDate: '2022-03-31'
      }
    };
    const { container } = render(<HeatChart />);
    expect(container.getElementsByClassName('heatChart'));
    expect(container.getElementsByClassName('barChart'));
    expect(container).toMatchSnapshot();
  });
});
