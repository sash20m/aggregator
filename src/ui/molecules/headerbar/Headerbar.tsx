/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSuggestions } from 'services/companies.services';
import { Suggestions } from 'index';

import './Headerbar.scss';

interface Props {
  searchVisible: boolean;
}

export const HeaderBar = ({ searchVisible }: Props): JSX.Element => {
  const Router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [data, setData] = useState<Suggestions[] | null>(null);

  const getSuggestionsList = async (name: string | null) => {
    try {
      const res = await getSuggestions(name);
      setData(res);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    getSuggestionsList(null);
  }, []);

  const searchCompanies = (e: React.ChangeEvent<HTMLInputElement>) => {
    getSuggestionsList(e.target.value);
    setInputValue(e.target.value);
  };

  const onInputClick = () => {
    setFocused(true);
  };

  const onInputLeave = () => {
    if (!mouseOver) setFocused(false);
  };

  const mouseOverList = () => {
    setMouseOver(true);
  };

  const mouseLeaveList = () => {
    setMouseOver(false);
  };

  const goToCompanies = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      Router.push(`/companies/${inputValue}`);
    }
  };

  const goToCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFocused(false);
    Router.push('/company/[slug]', `/company/${e.currentTarget.name}`);
  };

  return (
    <div className="header">
      <Link href="/">
        <img className="logo" src="../logo-small.png" alt="Logo" />
      </Link>
      {searchVisible && (
        <div className="search">
          <input
            className={focused ? 'search__input--active' : 'search__input'}
            type="text"
            placeholder="Search from 225,195 companies"
            onClick={onInputClick}
            onBlur={onInputLeave}
            onChange={searchCompanies}
            value={inputValue}
            onKeyDown={goToCompanies}
          />
          {focused && (
            <ul
              className="search__suggestions"
              onMouseOver={mouseOverList}
              onMouseOut={mouseLeaveList}
            >
              {data &&
                data.map((company: Suggestions) => (
                  <li key={company.name} className="search__suggestions__item">
                    <button
                      type="button"
                      className="search__suggestions__item__button"
                      name={company.slug}
                      onClick={goToCompany}
                    >
                      {company.name}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
