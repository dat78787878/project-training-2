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
      }
    };
    const { container } = render(<RankingChart />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Error')).toBeTruthy();
  });
});
