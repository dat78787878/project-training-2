import React from 'react';
import { render } from '@testing-library/react';
import Error from '../Error';
window.React = React;

describe('Error Component', () => {
  it('render component success', () => {
    const { container } = render(<Error />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Error')).toBeTruthy();
  });
});
