import React from 'react';
import ModalShow from '../ModalShow';
import { useSelector, useDispatch } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

describe('Modal', () => {
  const mockState = {
    pieChart: {
      pieData: [
        { x: 'Android', y: 20 },
        { x: 'Windows', y: 30 },
        { x: 'iOS', y: 60 },
        { x: 'Os X', y: 40 },
        { x: 'Unknown', y: 10 },
        { x: 'Linux', y: 50 }
      ],
      isLoading: false,
      isError: false
    },
    dateRange: {
      fromDate: '',
      toDate: ''
    }
  };
  const mockDispatch = jest.fn();
  beforeEach(() => {
    useDispatch.mockImplementation(() => mockDispatch);
    useSelector.mockImplementation((callback) => {
      return callback(mockState);
    });
  });
  afterEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });

  it('render modal', () => {
    const { container } = render(<ModalShow />);
    expect(container.getElementsByClassName('modalShow'));
    expect(container).toMatchSnapshot();
  });
  it('Filter input', () => {
    const { queryByText, getByRole } = render(<ModalShow />);
    const buttonLabel = getByRole('button', { label: /button-name/i });
    fireEvent.click(buttonLabel);
    const inputFilter = getByRole('textbox');
    fireEvent.change(inputFilter, { target: { value: 'android' } });
    expect(inputFilter.value).toEqual('android');
    expect(queryByText('iOS')).not.toBeTruthy();
    fireEvent.change(inputFilter, { target: { value: '' } });
    expect(queryByText('iOS')).toBeTruthy();
  });
  it('Click label', () => {
    const { getByText, getByRole, queryAllByTestId } = render(<ModalShow />);
    const buttonLabel = getByRole('button', { label: /button-name/i });
    fireEvent.click(buttonLabel);
    const label = getByText('Android');
    fireEvent.click(label);
    expect(queryAllByTestId('check')).toHaveLength(5);
    fireEvent.click(label);
    expect(queryAllByTestId('check')).toHaveLength(6);
  });
});
