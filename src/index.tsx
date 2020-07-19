import React from 'react';

import { SearchInput } from 'ui/molecules/searchInput/SearchInput';
import { getSuggestions } from 'services/companies.services';

import './index.scss';

export interface Suggestions {
  name: string;
  slug: string;
}

interface Props {
  propsData: Suggestions[];
}

export const Home: React.FC<Props> = ({ propsData }) => {
  return (
    <div className="layout">
      <div className="layout__search-area">
        <img className="layout__search-area__logo" src="logo.png" alt="logo" />
        <p className="layout__search-area__motto">
          The largest database of companies and employees in Moldova
        </p>
        <SearchInput suggestions={propsData} />
      </div>
    </div>
  );
};

export const getSProps = async (): Promise<{
  props: {
    propsData: Suggestions[];
  };
}> => {
  const data = await getSuggestions(null);
  const propsData = data;
  return {
    props: {
      propsData,
    },
  };
};
