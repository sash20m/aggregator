/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';

import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getCompany } from '../../../services/companies.services';
import { CompanyInfo } from '../../organisms/companyInfo/CompanyInfo';
import { HeaderBar } from '../../molecules/headerbar/Headerbar';

import './Company.scss';

interface Additional {
  lat: number;
  long: number;
}

interface AddressDeFacto {
  additional: Additional;
}

interface ContactInfo {
  emails: boolean[];
  phones: boolean[];
  address_de_facto: AddressDeFacto;
  sites: string[];
}

interface Size {
  name: string;
}

interface GeneralData {
  idno: string;
  creation_year: number;
  size: Size;
  contact_info: ContactInfo;
}

interface Status {
  title: string;
}

export interface Company {
  name: string;
  status: Status;
  general_data: GeneralData;
}

interface Props {
  data: Company;
}

export const CompanyPage: React.FC<Props> = (props) => {
  const { data } = props;
  const [imageURL, setImageURL] = useState('');
  const Router = useRouter();

  useEffect(() => {
    const route = Router.query;
    console.log(data, 'jheye');
    if (!data.name) {
      Router.push('/company/[slug]', `/company/${route.slug}`);
    } else if (data.general_data.contact_info.sites[0]) {
      setImageURL(new URL(data.general_data.contact_info.sites[0]).hostname);
    }
  }, [Router, data]);

  return (
    <div className="layout-company">
      <HeaderBar searchVisible />
      {data.name && <CompanyInfo companyData={{ data, imageURL }} />}
    </div>
  );
};

export const getSSProps = async ({
  params,
}: GetServerSidePropsContext): Promise<{
  props: {
    data: Company;
  };
} | null> => {
  if (params) {
    const data = await getCompany(params.slug);
    return {
      props: { data },
    };
  }
  return null;
};
