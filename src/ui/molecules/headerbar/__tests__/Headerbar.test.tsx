import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import { HeaderBar } from '../Headerbar';

afterEach(cleanup);

const props = {
  searchVisible: false,
};

describe('headerbar', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<HeaderBar searchVisible />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('it should render component', () => {
    const { queryByTestId } = render(
      <HeaderBar searchVisible={props.searchVisible} />
    );

    expect(queryByTestId('headerbar')).toBeInTheDocument();
  });

  it('it should render search', () => {
    const { queryByPlaceholderText } = render(
      <HeaderBar searchVisible={props.searchVisible} />
    );

    const element = queryByPlaceholderText('Search from 225,195 companies');
    const t = expect(element);

    if (props.searchVisible) t.toBeInTheDocument();
    else t.toBeFalsy();
  });
});
