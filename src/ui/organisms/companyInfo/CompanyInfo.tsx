/* eslint-disable react/jsx-indent */
import React from 'react';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Company } from 'ui/templates/company/Company';

import './CompanyInfo.scss';

interface CompanyInfo {
  data: Company;
  imageURL: string;
}

interface Props {
  companyData: CompanyInfo;
}

export const CompanyInfo: React.FC<Props> = ({ companyData }) => {
  const { data, imageURL } = companyData;
  return (
    <div className="company-content" data-testid="company-content">
      <div className="header">
        <div className="header__content">
          {imageURL ? (
            <img
              className="header__avatar"
              src={`https://account.globaldatabase.com/logo/${imageURL}/`}
              alt=""
            />
          ) : (
            <div className="header__no-avatar">{data.name[0]}</div>
          )}

          <div className="header__info">
            <div className="header__info__name" data-testid="company-name">
              {data.name}
            </div>
            <div className="header__info__industry">{data.status.title}</div>
          </div>
        </div>
      </div>
      <div className="company-info">
        <div className="company-info__header-info">
          <div className="company-info__header-info__item--first">
            <p className="company-info__header-info__item__key">IDNO</p>
            <p className="company-info__header-info__item__value">
              {data.general_data.idno}
            </p>
          </div>
          <div className="company-info__header-info__item">
            <p className="company-info__header-info__item__key">
              Registration year
            </p>
            <p className="company-info__header-info__item__value">
              {data.general_data.creation_date}
            </p>
          </div>
          <div className="company-info__header-info__item--last">
            <p className="company-info__header-info__item__key">Staff</p>
            <p className="company-info__header-info__item__value">
              {data.general_data.size.name}
            </p>
          </div>
        </div>
        <div className="company-info__footer-info">
          <div className="company-info__footer-info__contact">
            <p className="company-info__footer-info__contact__title">
              Contact Information
            </p>
            <div className="company-info__footer-info__contact__row">
              <div className="company-info__footer-info__contact__row--item">
                <p className="company-info__footer-info__contact__row--item__key">
                  EMAIL:
                </p>
                <div className="company-info__footer-info__contact__row--item__value">
                  <img
                    className="company-info__footer-info__contact__row--item__value__icon"
                    src="../email.png"
                    alt="email"
                  />

                  <div className="company-info__footer-info__contact__row--item__value__results">
                    {data.general_data.contact_info.emails.length !== 0
                      ? data.general_data.contact_info.emails.map(
                          (item, key) => <p key={key}> Email</p>
                        )
                      : 'None'}
                  </div>
                </div>
              </div>
              <div className="company-info__footer-info__contact__row--item">
                <p className="company-info__footer-info__contact__row--item__key">
                  PHONE/FAX:
                </p>
                <div className="company-info__footer-info__contact__row--item__value">
                  <img
                    className="company-info__footer-info__contact__row--item__value__icon"
                    src="../phone.png"
                    alt="phone"
                  />

                  <div
                    className="company-info__footer-info__contact__row--item__value__results"
                    data-testid="phone"
                  >
                    {data.general_data.contact_info.phones.length !== 0
                      ? data.general_data.contact_info.phones.map(
                          (item, key) => <p key={key}>Phone</p>
                        )
                      : 'None'}
                  </div>
                </div>
                <div className="company-info__footer-info__contact__row--item__value">
                  <img
                    className="company-info__footer-info__contact__row--item__value__icon"
                    src="../mobile.png"
                    alt="mobile"
                  />
                  <div className="company-info__footer-info__contact__row--item__value__results">
                    {data.general_data.contact_info.mobile.length !== 0
                      ? data.general_data.contact_info.mobile.map(
                          (item, key) => <p key={key}>Mobile</p>
                        )
                      : 'None'}
                  </div>
                </div>
              </div>
            </div>
            <div className="company-info__footer-info__contact__column">
              <div className="company-info__footer-info__contact__column__key">
                {data.general_data.contact_info.sites[0] && (
                  <img
                    className="company-info__footer-info__contact__row--item__value__icon"
                    src="../www.png"
                    alt="mobile"
                  />
                )}
                Website
              </div>

              <p className="company-info__footer-info__contact__column__value">
                {data.general_data.contact_info.sites[0] ? imageURL : 'None'}
              </p>
            </div>
          </div>
          <div className="company-info__footer-info__map">
            {data.general_data.contact_info.address_de_facto.additional ? (
              <LoadScript googleMapsApiKey="AIzaSyCoiiNXqjXrJnG9d7mK3iRmy8ILIfJut2s">
                <GoogleMap
                  mapContainerClassName="company-info__footer-info__map__google-map"
                  center={{
                    lat:
                      data.general_data.contact_info.address_de_facto.additional
                        .lat,
                    lng:
                      data.general_data.contact_info.address_de_facto.additional
                        .long,
                  }}
                  zoom={17}
                >
                  <Marker
                    position={{
                      lat:
                        data.general_data.contact_info.address_de_facto
                          .additional.lat,
                      lng:
                        data.general_data.contact_info.address_de_facto
                          .additional.long,
                    }}
                    label={data.name}
                  />
                </GoogleMap>
              </LoadScript>
            ) : (
              <p>No Data for Map</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
