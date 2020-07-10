import React from 'react';

import { getSuggestions } from './services/companies.services';
import { SearchInput } from './ui/molecules/searchInput/SearchInput';
import { HeaderBar } from './ui/molecules/headerbar/Headerbar';

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
      <HeaderBar searchVisible={false} />
      <div className="layout__search-area">
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
  // const res = await fetch(
  //   'https://app.informer.md/api/public/search?per_page=5'
  // );
  // const data = await res.json();
  const propsData = data;
  return {
    props: {
      propsData,
    },
  };
};
