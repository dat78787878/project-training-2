import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import LineChart from '../LineChart';
window.React = React;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));
jest.mock('react-apexcharts', () => 'Chart');
describe('LineChart component', () => {
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
      lineChart: {
        lineData: [],
        isLoading: true,
        isError: false
      },
      dateRange: {
        fromDate: '08/08/2021',
        toDate: '09/09/2021'
      }
    };
    const { container } = render(<LineChart />);
    expect(container).toMatchSnapshot();
    expect(container.querySelector('div').firstChild.className).toEqual('loading');
  });
  it('success task', () => {
    mockAppState = {
      lineChart: {
        lineData: [
          {
            name: 'Android',
            data: [
              { x: '01/01/2021', y: 4 },
              { x: '02/01/2021', y: 3 },
              { x: '03/01/2021', y: 5 }
            ]
          },
          {
            name: 'iOS',
            data: [
              { x: '01/01/2021', y: 1 },
              { x: '02/01/2021', y: 6 },
              { x: '03/01/2021', y: 4 }
            ]
          }
        ],
        isloading: false,
        isError: false
      },
      dateRange: {
        fromDate: '08/08/2021',
        toDate: '09/09/2021'
      }
    };
    const { container } = render(<LineChart />);
    expect(container).toMatchSnapshot();
    expect(container.getElementsByClassName('apexcharts-canvas'));
  });
  it('get data day', () => {
    mockAppState = {
      lineChart: {
        lineData: [
          {
            name: 'Android',
            data: [
              { x: '01/01/2021', y: 5 },
              { x: '02/01/2021', y: 10 },
              { x: '03/01/2021', y: 5 },
              { x: '01/02/2021', y: 4 },
              { x: '02/02/2021', y: 6 }
            ]
          },
          {
            name: 'iOS',
            data: [
              { x: '01/01/2021', y: 2 },
              { x: '02/01/2021', y: 3 },
              { x: '03/01/2021', y: 5 },
              { x: '01/02/2021', y: 10 },
              { x: '02/02/2021', y: 5 }
            ]
          }
        ],
        isloading: false,
        isError: false
      },
      dateRange: {
        fromDate: '08/08/2021',
        toDate: '09/09/2021'
      }
    };
    const { container, getByTestId } = render(<LineChart />);
    fireEvent.click(getByTestId('Day'));
    expect(container).toMatchSnapshot();
  });
  it('get data week', () => {
    mockAppState = {
      lineChart: {
        lineData: [
          {
            name: 'Android',
            data: [
              { x: '01/01/2021', y: 5 },
              { x: '02/01/2021', y: 10 },
              { x: '03/01/2021', y: 5 },
              { x: '01/02/2021', y: 4 },
              { x: '02/02/2021', y: 6 }
            ]
          },
          {
            name: 'iOS',
            data: [
              { x: '01/01/2021', y: 2 },
              { x: '02/01/2021', y: 3 },
              { x: '03/01/2021', y: 5 },
              { x: '01/02/2021', y: 10 },
              { x: '02/02/2021', y: 5 }
            ]
          }
        ],
        isloading: false,
        isError: false
      },
      dateRange: {
        fromDate: '2021-08-08',
        toDate: '2021-08-09'
      }
    };
    const { container, getByTestId } = render(<LineChart />);
    fireEvent.click(getByTestId('Week'));
    expect(container).toMatchSnapshot();
  });
  it('get data month', () => {
    mockAppState = {
      lineChart: {
        lineData: [
          {
            name: 'Android',
            data: [
              { x: '01/01/2021', y: 5 },
              { x: '02/01/2021', y: 10 },
              { x: '03/01/2021', y: 5 },
              { x: '01/02/2021', y: 4 },
              { x: '02/02/2021', y: 6 }
            ]
          },
          {
            name: 'iOS',
            data: [
              { x: '01/01/2021', y: 2 },
              { x: '02/01/2021', y: 3 },
              { x: '03/01/2021', y: 5 },
              { x: '01/02/2021', y: 10 },
              { x: '02/02/2021', y: 5 }
            ]
          }
        ],
        isloading: false,
        isError: false
      },
      dateRange: {
        fromDate: '2021-08-08',
        toDate: '2021-08-09'
      }
    };
    const { container, getByTestId } = render(<LineChart />);
    fireEvent.click(getByTestId('Month'));
    expect(container).toMatchSnapshot();
  });
  it('error task', () => {
    mockAppState = {
      lineChart: {
        lineData: [],
        isloading: false,
        isError: true
      },
      dateRange: {
        fromDate: '2021-08-08',
        toDate: '2021-08-09'
      }
    };
    const { container, getByText } = render(<LineChart />);
    expect(container).toMatchSnapshot();
    expect(getByText('Error')).toBeTruthy();
  });
});
