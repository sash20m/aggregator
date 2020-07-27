import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import { CompanyCard } from '../CompanyCard';

const Props = {
  data: {
    name: 'Comapny Name',
    slug: 'aridon',
    location: 'Chisinau',
    website: 'https://ebs-integrator.com',
    idno: '123456789',
    employees: '10-20',
    turnover: '999999',
    industry: 'IT',
    mobile: true,
    phone: true,
    email: true,
    creation_year: 2020,
  },
  key: 'Name',
};
afterEach(cleanup);

describe('comapnyCard', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(
      <CompanyCard data={Props.data} key={Props.key} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should go to company page', async () => {
    const { getByTestId } = render(
      <CompanyCard data={Props.data} key={Props.key} />
    );

    expect(getByTestId('aridon')).toBeInTheDocument();
  });
});
