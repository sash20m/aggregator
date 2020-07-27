/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';

import { GetServerSidePropsContext } from 'next';
import { CompanyCard } from 'ui/organisms/companyCard/CompanyCard';
import { getCompanies } from 'services/companies.services';
import { HeaderBar } from 'ui/molecules/headerbar/Headerbar';
import { SearchInput } from 'ui/molecules/searchInput/SearchInput';
import { Pagination } from 'ui/molecules/pagination/Pagination';

import './CompaniesList.scss';

export interface CompaniesCard {
  name: string;
  slug: string;
  location: string;
  website: string | null;
  idno: string;
  employees: string;
  turnover: string;
  industry: string;
  mobile: boolean | null;
  phone: boolean | null;
  email: boolean | null;
  creation_year: number;
}

export interface Companies {
  data: CompaniesCard[];
  pages: number;
  total_results: number;
}

interface Props {
  data: Companies;
  companyName: string | string[] | undefined;
}

export const CompaniesList: React.FC<Props> = ({ companyName, data }) => {
  const [companies, setCompanies] = useState<Companies | null>();

  useEffect(() => {
    const onSetData = () => {
      setCompanies(data);
    };
    onSetData();
  }, [data]);

  const changePage = async (newPage: string) => {
    const companiesData = await getCompanies(companyName, newPage, 10);
    setCompanies(companiesData);
  };

  if (!companies) return <></>;

  return (
    <div className="layout-companies" data-testid="companies-list">
      <HeaderBar searchVisible={false} />
      <div className="layout-companies__search-area-small">
        <div className="layout-companies__search-wrapper">
          <SearchInput suggestions={null} />
        </div>
      </div>
      <div className="nr-results-layout">
        <img className="nr-results-layout__bag-case" src="../bag.png" alt="" />
        <p data-testid="total-results">{companies.total_results}</p>
        <p>of results</p>
      </div>
      {companies &&
        companies.data.map((companyInfo: CompaniesCard) => (
          <CompanyCard data={companyInfo} key={companyInfo.name} />
        ))}
      <Pagination pages={companies.pages} changePage={changePage} />
    </div>
  );
};

interface SSProps {
  props: Props;
}

export const getSSProps = async ({
  params,
}: GetServerSidePropsContext): Promise<SSProps | null> => {
  if (params) {
    const page = '1';
    const perPage = 10;
    const data = await getCompanies(params.slug, page, perPage);
    return {
      props: { data, companyName: params.slug },
    };
  }
  return null;
};
