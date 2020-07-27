import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { SearchInput } from '../SearchInput';

afterEach(cleanup);

describe('searchInput', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<SearchInput suggestions={null} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should open the input', async () => {
    const { getByTestId } = render(<SearchInput suggestions={null} />);

    fireEvent.click(getByTestId('search-input'));

    expect(getByTestId('search-input')).toHaveClass(
      'search-content__input--active'
    );
  });
});
