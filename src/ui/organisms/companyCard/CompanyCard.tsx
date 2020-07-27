import React from 'react';

import Link from 'next/link';
import { CompaniesCard } from 'ui/templates/companies/Companies';

import './CompanyCard.scss';

interface Props {
  data: CompaniesCard;
}

export const CompanyCard: React.FC<Props> = ({ data }) => {
  // const Router = useRouter();
  // const scrollRef = useRef<HTMLDivElement>(null);
  const yearsOld = new Date().getFullYear() - data.creation_year;

  let imageURL = '';
  if (data.website) {
    imageURL = new URL(data.website).hostname;
  }

  return (
    <div className="results">
      <div className="results__item">
        <Link
          href="/company/[slug]"
          as={`/company/${data.slug}`}
          data-testid="link"
        >
          <button
            data-testid={`${data.slug}`}
            className="results__item__header"
            type="button"
          >
            {imageURL ? (
              <img
                className="results__item__header__avatar"
                src={`https://account.globaldatabase.com/logo/${imageURL}/`}
                alt=""
              />
            ) : (
              <div className="results__item__header__no-avatar">
                {data.name[0]}
              </div>
            )}
            <div>
              <div className="results__item__header__name">{data.name}</div>
              <div className="results__item__header__location">
                {data.location}
              </div>
            </div>
          </button>
        </Link>

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
                {`${data.turnover} MDL`}
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
          <div className="results__item__company-info__column--row">
            <div className="results__item__company-info__column__item--key">
              Contact
            </div>
            <div>
              <div className="results__item__company-info__column__item--value">
                <div className="results__item__company-info__column__item__results">
                  <img
                    className="results__item__company-info__column__item__icon"
                    src="../phone.png"
                    alt="phone"
                  />
                  <p>Phone</p>
                </div>
              </div>
              <div className="results__item__company-info__column__item--value">
                <div className="results__item__company-info__column__item__results">
                  <img
                    className="results__item__company-info__column__item__icon"
                    src="../mobile.png"
                    alt="phone"
                  />
                  <p>Mobile</p>
                </div>
              </div>
              <div className="results__item__company-info__column__item--value">
                <div className="results__item__company-info__column__item__results">
                  <img
                    className="results__item__company-info__column__item__icon"
                    src="../email.png"
                    alt="phone"
                  />
                  <p>Email</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
