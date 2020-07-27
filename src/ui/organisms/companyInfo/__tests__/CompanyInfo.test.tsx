import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import { CompanyInfo } from '../CompanyInfo';

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
const imageURL = 'www.aridon.com';

afterEach(cleanup);

describe('comapnyCard', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(
      <CompanyInfo companyData={{ data, imageURL }} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should be rendered', async () => {
    const { getByTestId } = render(
      <CompanyInfo companyData={{ data, imageURL }} />
    );

    expect(getByTestId('company-content')).toBeInTheDocument();
  });

  it('should receive company name trough props', async () => {
    const { getByTestId } = render(
      <CompanyInfo companyData={{ data, imageURL }} />
    );

    expect(getByTestId('company-name')).toHaveTextContent('Aridon');
  });

  it('should have 2 children', async () => {
    const { getByTestId } = render(
      <CompanyInfo companyData={{ data, imageURL }} />
    );

    expect(getByTestId('phone').childElementCount).toEqual(2);
  });
});
