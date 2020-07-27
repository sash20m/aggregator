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
      sessionStorage.setItem('lastSearched', inputValue);
      Router.push(`/companies/${inputValue}`);
    }
  };

  const resetSessionStorage = () => {
    sessionStorage.clear();
  };

  const showAllCompanies = () => {
    setFocused(false);
    Router.push('/companies/all');
  };

  const resetSuggestionList = () => {
    setFocused(false);
  };

  return (
    <div className="header-main" data-testid="headerbar">
      <div className="header-main__content">
        <Link href="/">
          <button
            className="logo__btn"
            type="button"
            onClick={resetSessionStorage}
          >
            <img className="logo" src="../logo-small.png" alt="Logo" />
          </button>
        </Link>
        {searchVisible && (
          <div className="search">
            <img className="search__icon" src="../search.png" alt="" />
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
            <button
              type="button"
              className="search__show-all"
              onClick={showAllCompanies}
            >
              Show All
            </button>

            {focused && (
              <ul
                className="search__suggestions"
                onMouseOver={mouseOverList}
                onMouseOut={mouseLeaveList}
              >
                {!data && (
                  <p className="search__suggestions__loading"> Loading...</p>
                )}

                {data &&
                  data.map((company: Suggestions) => (
                    <Link
                      href="/company/[slug]"
                      as={`/company/${company.slug}`}
                    >
                      <li
                        key={company.name}
                        className="search__suggestions__item"
                      >
                        <button
                          type="button"
                          className="search__suggestions__item__button"
                          name={company.slug}
                          onClick={resetSuggestionList}
                        >
                          {company.name}
                        </button>
                      </li>
                    </Link>
                  ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
