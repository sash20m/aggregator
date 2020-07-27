/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { getSuggestions } from 'services/companies.services';
import { Suggestions } from 'index';

import './SearchInput.scss';
import Link from 'next/link';

interface Props {
  suggestions: Suggestions[] | null;
}

export const SearchInput: React.FC<Props> = ({ suggestions }) => {
  const Router = useRouter();
  const [focused, setFocused] = useState<boolean>(false);
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [data, setData] = useState<Suggestions[] | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [lastSearched, setLastSearched] = useState<string | null>('');
  const [specialClass, setSpecialClass] = useState(false);

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
    const onSetData = () => {
      setData(suggestions);
    };
    if (suggestions) onSetData();
    else {
      getSuggestionsList(null);
      setSpecialClass(true);
    }
  }, [suggestions]);

  useEffect(() => {
    if (Router) {
      if (Router.pathname.search('companies/')) {
        setLastSearched(sessionStorage.getItem('lastSearched'));
      }
    }
  }, [Router]);

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

  const resetSearch = () => {
    sessionStorage.clear();
    Router.push(`/companies/all`);
  };

  return (
    <div className="search-content">
      <div className="search-content__input-wrapper">
        <input
          data-testid="search-input"
          className={
            focused ? 'search-content__input--active' : 'search-content__input'
          }
          type="text"
          placeholder="Search from 225,195 companies"
          onClick={onInputClick}
          onBlur={onInputLeave}
          onChange={searchCompanies}
          value={inputValue}
          onKeyDown={goToCompanies}
        />
        <img
          className="search-content__search-magnifier"
          src="../search.png"
          alt=""
        />
        {focused && (
          <ul
            data-testid="suggestion-items"
            className={
              specialClass
                ? 'search-content__special-suggestions'
                : 'search-content__suggestions'
            }
            onMouseOver={mouseOverList}
            onMouseOut={mouseLeaveList}
          >
            {!data ? (
              <p className="search-content__suggestions__loading">Loading...</p>
            ) : (
              data.map((company: Suggestions) => (
                <Link href="/company/[slug]" as={`/company/${company.slug}`}>
                  <li
                    key={company.name}
                    className="search-content__suggestions__item"
                  >
                    <button
                      type="button"
                      className="search-content__suggestions__item__button"
                      name={company.slug}
                      // onClick={goToCompany}
                    >
                      {`${company.name} • ${company.idno}`}
                    </button>
                  </li>
                </Link>
              ))
            )}
          </ul>
        )}
      </div>

      <div className="search-content__options">
        <p className="search-content__options__item">Search In</p>
        <p className="search-content__options__item--selected">Companies</p>
        <p className="search-content__options__item">Persons</p>
      </div>
      {lastSearched && (
        <div className="search-content__filter-wrapp">
          <div className="search-content__filter-wrapp__filter">
            <div className="search-content__filter-wrapp__filter__info">
              <img
                className="search-content__filter-wrapp__filter__icon"
                src="../filter.png"
                alt=""
              />
              <p>{lastSearched}</p>
            </div>

            <button
              className="search-content__filter-wrapp__filter__remove"
              type="button"
              onClick={resetSearch}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
