import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import { CompaniesList } from '../Companies';

const data = {
  data: [
    {
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
  ],
  pages: 1,
  total_results: 1,
};

const companyName = 'aridon';

afterEach(cleanup);

describe('company ', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(
      <CompaniesList data={data} companyName={companyName} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should be rendered', async () => {
    const { getByTestId } = render(
      <CompaniesList data={data} companyName={companyName} />
    );

    expect(getByTestId('companies-list')).toBeInTheDocument();
  });

  it('should have 2 children', async () => {
    const { getByTestId } = render(
      <CompaniesList data={data} companyName={companyName} />
    );

    expect(getByTestId('total-results')).toHaveTextContent('1');
  });
});
