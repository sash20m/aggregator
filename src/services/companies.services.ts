import axios from 'axios';
import { Company } from '../ui/templates/company/Company';
import { Companies } from '../ui/templates/companies/Companies';
import { Suggestions } from '../index';

const BASE_URL = 'https://app.informer.md/api/public/';

export const getSuggestions = (name: string | null): Promise<Suggestions[]> => {
  if (name) {
    return axios
      .get(`${BASE_URL}search?per_page=5&company_name=${name}`)
      .then((response) => response.data.data);
  }
  return axios
    .get(`${BASE_URL}search?per_page=5`)
    .then((response) => response.data.data);
};

export const getCompanies = (
  company: string | string[] | undefined,
  page: string,
  perPage: number
): Promise<Companies> => {
  if (company === 'all') {
    return axios
      .get<Companies>(`${BASE_URL}search?per_page=10&page=${page}`)
      .then((response) => response.data);
  }
  return axios
    .get<Companies>(
      `${BASE_URL}search?per_page=${perPage}&company_name=${company}&page=${page}`
    )
    .then((response) => response.data);
};

export const getCompany = (
  name: string | undefined | string[]
): Promise<Company> =>
  axios
    .get<Company>(`${BASE_URL}company?slug=${name}`)
    .then((response) => response.data);
