import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

afterEach(cleanup);

describe('pagination', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(
      <Pagination pages={10} changePage={jest.fn()} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should go one page back', () => {
    const { getByTestId } = render(
      <Pagination pages={10} changePage={jest.fn()} />
    );

    fireEvent.click(getByTestId('goOnePageBack'));

    expect(getByTestId('0')).toHaveTextContent('1');
  });

  it('should go one page futher', () => {
    const { getByTestId } = render(
      <Pagination pages={10} changePage={jest.fn()} />
    );

    fireEvent.click(getByTestId('goOnePageFurther'));

    expect(getByTestId('0')).toHaveTextContent('2');
  });

  it('current page should be active', () => {
    const { getByTestId } = render(
      <Pagination pages={10} changePage={jest.fn()} />
    );

    fireEvent.click(getByTestId('1'));

    expect(getByTestId('1')).toHaveClass('pagination__page-btn--active');
  });
});
