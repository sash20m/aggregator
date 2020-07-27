import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import { CompanyPage } from '../Company';

const data = {
  name: 'Aridon',
  status: {
    title: 'Active',
  },
  general_data: {
    idno: '123456789',
    creation_date: 2020,
    size: {
      name: '10-20',
    },
    contact_info: {
      emails: [true],
      phones: [true, true],
      mobile: [true],
      address_de_facto: {
        additional: {
          lat: 20,
          long: 20,
        },
      },
      sites: ['www.aridon.com'],
    },
  },
};

afterEach(cleanup);

describe('company ', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<CompanyPage data={data} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should be rendered', async () => {
    const { getByTestId } = render(<CompanyPage data={data} />);

    expect(getByTestId('company')).toBeInTheDocument();
  });

  it('should have 2 children', async () => {
    const { getByTestId } = render(<CompanyPage data={data} />);

    expect(getByTestId('company').childElementCount).toEqual(2);
  });
});
