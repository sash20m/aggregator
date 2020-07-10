import React from 'react';

import { useRouter } from 'next/router';
import { CompaniesCard } from '../../templates/companies/Companies';

import './CompanyCard.scss';

interface Props {
  data: CompaniesCard;
}

const CompanyCard: React.FC<Props> = (props) => {
  const Router = useRouter();
  const { data } = props;
  const yearsOld = new Date().getFullYear() - data.creation_year;

  let imageURL = '';
  if (data.website) {
    imageURL = new URL(data.website).hostname;
  }

  const goToCompany = () => {
    Router.push('/company/[slug]', `/company/${data.slug}`);
  };

  return (
    <div className="results">
      <div className="results__item">
        <div
          className="results__item__header"
          onClick={goToCompany}
          tabIndex={0}
          role="button"
          onKeyDown={() => {
            '';
          }}
        >
          {imageURL ? (
            <img
              className="results__item__header__avatar"
              src={`https://account.globaldatabase.com/logo/${imageURL}/`}
              alt=""
            />
          ) : (
            <p className="results__item__header__avatar">No Photo</p>
          )}
          <div>
            <div className="results__item__header__name">{data.name}</div>
            <div className="results__item__header__location">
              {data.location}
            </div>
          </div>
        </div>
        <div className="results__item__company-info">
          <div className="results__item__company-info__column">
            <div className="results__item__company-info__column__item">
              <p className="results__item__company-info__column__item--key">
                IDNO:
              </p>
              <p className="results__item__company-info__column__item--value">
                {data.idno}
              </p>
            </div>

            <div className="results__item__company-info__column__item">
              <p className="results__item__company-info__column__item--key">
                Status
              </p>
              <button
                type="button"
                className="results__item__company-info__column__item--value"
              >
                ACTIV
              </button>
            </div>

            <div className="results__item__company-info__column__item">
              <p className="results__item__company-info__column__item--key">
                Date of establishment:
              </p>
              <p className="results__item__company-info__column__item--value">
                {data.creation_year}
              </p>
            </div>
            <div className="results__item__company-info__column__item">
              <p className="results__item__company-info__column__item--key">
                Varsta
              </p>
              <p className="results__item__company-info__column__item--value">
                {yearsOld}
              </p>
            </div>
          </div>
          <div className="results__item__company-info__column">
            <div className="results__item__company-info__column__item">
              <p className="results__item__company-info__column__item--key">
                Nr. by the employees:
              </p>
              <p className="results__item__company-info__column__item--value">
                {data.employees}
              </p>
            </div>
            <div className="results__item__company-info__column__item">
              <p className="results__item__company-info__column__item--key">
                Turnover:
              </p>
              <p className="results__item__company-info__column__item--value">
                {data.turnover}
              </p>
            </div>
            <div className="results__item__company-info__column__item">
              <p className="results__item__company-info__column__item--key">
                Industry
              </p>
              <p className="results__item__company-info__column__item--value">
                {data.industry}
              </p>
            </div>
          </div>
          <div className="results__item__company-info__column">
            <div className="results__item__company-info__column__item--key">
              Contact
            </div>
            <div>
              <p className="results__item__company-info__column__item--value">
                Phone Mobile-
                {data.mobile}
              </p>
              <p className="results__item__company-info__column__item--value">
                Phone-
                {data.phone}
              </p>
              <p className="results__item__company-info__column__item--value">
                Email-
                {data.email}
              </p>
              <p className="results__item__company-info__column__item--value">
                Website-
                {data.website}
              </p>
            </div>
          </div>
        </div>

        {/* Datele care vin prin API nu contin founder-ul sau administratorul */}
        {/* aici afisez doar partnerii (asta nu se cere in conditie la task) */}

        {/* <div className="results__item__company-info__founder">
          <p className="results__item__company-info__founder--key">
            Partners of the company
          </p>
          {data.partners &&
            data.partners.map((partner) => (
              <p className="results__item__company-info__founder--value">
                {partner}
              </p>
            ))}
        </div> */}
      </div>
    </div>
  );
};

export default CompanyCard;
