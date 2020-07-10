import React from 'react';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Company } from '../../templates/company/Company';

import './CompanyInfo.scss';

interface CompanyInfo {
  data: Company;
  imageURL: string;
}

interface Props {
  companyData: CompanyInfo;
}

export const CompanyInfo: React.FC<Props> = (props) => {
  const { companyData } = props;
  const { data, imageURL } = companyData;
  return (
    <div className="company-content">
      <div className="header">
        {imageURL ? (
          <img
            className="header__avatar"
            src={`https://account.globaldatabase.com/logo/${imageURL}/`}
            alt=""
          />
        ) : (
          <p className="header__avatar">No Photo</p>
        )}
        <div className="header__info">
          <div className="header__info__name">{data.name}</div>
          <div className="header__info__industry">{data.status.title}</div>
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
              Registration Year
            </p>
            <p className="company-info__header-info__item__value">
              {data.general_data.creation_year}
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
                  Email:
                </p>
                <p className="company-info__footer-info__contact__row--item__value">
                  {data.general_data.contact_info.emails[0] ? 'EMAIL' : 'None'}
                </p>
              </div>
              <div className="company-info__footer-info__contact__row--item">
                <p className="company-info__footer-info__contact__row--item__key">
                  Phone:
                </p>
                <p className="company-info__footer-info__contact__row--item__value">
                  {data.general_data.contact_info.phones[0] ? 'EMAIL' : 'None'}
                </p>
              </div>
            </div>
            <div className="company-info__footer-info__contact__column">
              <p className="company-info__footer-info__contact__column__key">
                Website
              </p>
              <p className="company-info__footer-info__contact__column__value">
                {data.general_data.contact_info.sites[0] ? 'imageURL' : 'None'}
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
