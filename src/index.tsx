import React from 'react';

import { getSuggestions } from './services/companies.services';
import { SearchInput } from './ui/molecules/searchInput/SearchInput';

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
