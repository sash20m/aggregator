import axios from 'axios';
import { Company } from '../ui/templates/company/Company';
import { Companies } from '../ui/templates/companies/Companies';
import { Suggestions } from '../index';

/**
 *
 * @param {string} name
 *
 */
export const getSuggestions = (name: string | null): Promise<Suggestions[]> => {
  if (name) {
    return axios
      .get(
        `https://app.informer.md/api/public/search?per_page=5&company_name=${name}`
      )
      .then((response) => response.data.data);
  }
  return axios
    .get(`https://app.informer.md/api/public/search?per_page=5`)
    .then((response) => response.data.data);
};

/**
 *
 * @param {string} company
 * @param {number} page
 * @param {number} perPage
 *
 */
export const getCompanies = (
  company: string,
  page: string,
  perPage: number
): Promise<Companies> => {
  return axios
    .get<Companies>(
      `https://app.informer.md/api/public/search?per_page=${perPage}&company_name=${company}&page=${page}`
    )
    .then((response) => response.data);
};

/**
 *
 * @param {string} cutURL
 *
 */
export const getCompany = (cutURL: string): Promise<Company> => {
  return axios
    .get<Company>(`https://app.informer.md/api/public/company?slug=${cutURL}`)
    .then((response) => response.data);
};
