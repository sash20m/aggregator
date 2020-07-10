/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { getSuggestions } from '../../../services/companies.services';
import { Suggestions } from '../../../index';

import './SearchInput.scss';

interface Props {
  suggestions: Suggestions[] | null;
}

const defaultProps = {
  suggestions: null,
} as Partial<Props>;

export const SearchInput = (props: Props): JSX.Element => {
  const Router = useRouter();
  const [focused, setFocused] = useState<boolean>(false);
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [data, setData] = useState<Suggestions[] | null>(null);
  const [inputValue, setInputValue] = useState('');

  const getSuggestionsList = async (name: string | null) => {
    try {
      const res = await getSuggestions(name);
      setData(res);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    const onSetData = () => {
      setData(props.suggestions);
    };

    if (props.suggestions) onSetData();
    else getSuggestionsList(null);
  }, [props]);

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
      Router.push(`/companies/list?search=${inputValue}`);
    }
  };

  const goToCompany = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setFocused(false);
    Router.push('/company/[slug]', `/company/${e.currentTarget.name}`);
  };

  return (
    <div className="search-content">
      <input
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
      {focused && (
        <ul
          className="search-content__suggestions"
          onMouseOver={mouseOverList}
          onMouseOut={mouseLeaveList}
        >
          {data &&
            data.map((company: Suggestions) => (
              <li
                key={company.name}
                className="search-content__suggestions__item"
              >
                <button
                  type="button"
                  className="search-content__suggestions__item__button"
                  name={company.slug}
                  onClick={goToCompany}
                >
                  {company.name}
                </button>
              </li>
            ))}
        </ul>
      )}
      <div className="search-content__options">
        <p className="search-content__options__item">Search In</p>
        <p className="search-content__options__item--selected">Companies</p>
        <p className="search-content__options__item">Persons</p>
      </div>
    </div>
  );
};

SearchInput.defaultProps = defaultProps;
