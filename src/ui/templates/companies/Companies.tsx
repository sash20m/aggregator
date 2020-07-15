/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';

import { GetServerSidePropsContext } from 'next';
import { getCompanies } from '../../../services/companies.services';
import { HeaderBar } from '../../molecules/headerbar/Headerbar';
import { SearchInput } from '../../molecules/searchInput/SearchInput';
import { Pagination } from '../../molecules/pagination/Pagination';
import CompanyCard from '../../organisms/companyCard/CompanyCard';

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
  partners: [];
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

export const CompaniesList: React.FC<Props> = (props) => {
  const { companyName } = props;
  const [companies, setCompanies] = useState<Companies | null>();

  useEffect(() => {
    const onSetData = () => {
      setCompanies(props.data);
    };
    onSetData();
  }, [props]);

  const onChangePage = async (newPage: string) => {
    const data = await getCompanies(companyName, newPage, 10);
    setCompanies(data);
  };

  if (!companies) return <></>;

  return (
    <div className="layout-companies">
      <HeaderBar searchVisible={false} />
      <div className="layout-companies__search-area-small">
        <SearchInput />
      </div>
      <div className="nr-results-layout">
        <p>
          {companies.total_results}
          -total results
        </p>
      </div>
      {companies &&
        companies.data.map((companyInfo: CompaniesCard) => (
          <CompanyCard data={companyInfo} />
        ))}
      <Pagination pages={companies.pages} onChangePage={onChangePage} />
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
