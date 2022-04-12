import React from 'react';
import UsedTime from '../UsedTime';
import { useSelector, useDispatch } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

describe('UsedTime', () => {
  let mockAppState = {};
  const mockDispatch = jest.fn();
  beforeEach(() => {
    useDispatch.mockImplementation(() => mockDispatch);
    useSelector.mockImplementation((callback) => {
      return callback(mockAppState);
    });
  });
  afterEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });
  it('check loading', () => {
    mockAppState = {
      usedTime: {
        usedTimeData: [],
        isLoading: true,
        isError: false
      },
      dateRange: {
        fromDate: '2021-08-08',
        toDate: '2021-08-09'
      }
    };
    const { container } = render(
      <BrowserRouter>
        <UsedTime />
      </BrowserRouter>
    );
    expect(screen.getByTestId('loading')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  it('error task', () => {
    mockAppState = {
      usedTime: {
        usedTimeData: [],
        isLoading: false,
        isError: true
      },
      dateRange: {
        fromDate: '2021-08-08',
        toDate: '2021-08-09'
      }
    };
    const { container } = render(
      <BrowserRouter>
        <UsedTime />
      </BrowserRouter>
    );
    expect(screen.getByText('no data')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  it('render UsedTime', () => {
    mockAppState = {
      usedTime: {
        usedTimeData: [
          {
            userName: 'pqjx1',
            oSName: 'iOS',
            date: '2016-04-03T13:46:50.804Z',
            useTimeNumber: 11,
            facebookTimeUse: 7,
            youtubeTimeUse: 9,
            other: 18
          },
          {
            userName: 'g5zxl',
            oSName: 'Android',
            date: '2017-04-13T02:05:28.816Z',
            useTimeNumber: 7,
            facebookTimeUse: 6,
            youtubeTimeUse: 8,
            other: 7
          }
        ],
        isLoading: false,
        isError: false
      },
      dateRange: {
        fromDate: '2021-08-08',
        toDate: '2021-08-09'
      }
    };
    const { container, getByText } = render(
      <BrowserRouter>
        <UsedTime />
      </BrowserRouter>
    );
    expect(getByText('iOS')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  it('handle Click UsedTime', () => {
    mockAppState = {
      usedTime: {
        usedTimeData: [
          {
            userName: 'pqjx1',
            oSName: 'iOS',
            date: '2016-04-03T13:46:50.804Z',
            useTimeNumber: 11,
            facebookTimeUse: 7,
            youtubeTimeUse: 9,
            other: 18
          },
          {
            userName: 'g5zxl',
            oSName: 'Android',
            date: '2017-04-13T02:05:28.816Z',
            useTimeNumber: 7,
            facebookTimeUse: 6,
            youtubeTimeUse: 8,
            other: 7
          }
        ],
        isLoading: false,
        isError: false
      },
      dateRange: {
        fromDate: '2021-08-08',
        toDate: '2021-08-09'
      }
    };
    const { container, getByRole } = render(
      <BrowserRouter>
        <UsedTime />
      </BrowserRouter>
    );
    const link = getByRole('link', { expanded: false });
    const link2 = screen.getByTestId(10);
    const svg = screen.getByTestId('arrow-circle-up');
    fireEvent.click(link2);
    fireEvent.click(link);
    fireEvent.click(svg);
    expect(container).toMatchSnapshot();
  });
});
