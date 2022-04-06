import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import RankingChart from '../RankingChart';
window.React = React;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

describe('RankingChart Component', () => {
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
      rankingChart: {
        rankingData: [],
        isLoading: true,
        isError: false
      },
      dateRange: {
        fromDate: '08/08/2021',
        toDate: '09/09/2021'
      }
    };
    const { container } = render(<RankingChart />);
    expect(container).toMatchSnapshot();
    expect(container.querySelector('div').firstChild.className).toEqual('loading');
  });
  it('success task', () => {
    mockAppState = {
      rankingChart: {
        rankingData: [
          { label: 'Day 1', value: 9 },
          { label: 'Day 2', value: 6 },
          { label: 'Day 3', value: 6 },
          { label: 'Day 4', value: 6 },
          { label: 'Day 5', value: 6 }
        ],
        isLoading: false,
        isError: false
      },
      dateRange: {
        fromDate: '08/08/2021',
        toDate: '09/09/2021'
      }
    };
    const { container } = render(<RankingChart />);
    expect(container).toMatchSnapshot();
    expect(container.querySelector('canvas')).toBeTruthy();
  });

  it('error task', () => {
    mockAppState = {
      rankingChart: {
        rankingData: [],
        isLoading: false,
        isError: true
      },
      dateRange: {
        fromDate: '08/08/2021',
        toDate: '09/09/2021'
      }
    };
    const { container } = render(<RankingChart />);
    expect(screen.getByText('Error')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
