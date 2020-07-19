import {
  CompaniesList,
  getSSProps,
} from '../../src/ui/templates/companies/Companies';

const RoutePage = CompaniesList;
export const getServerSideProps = getSSProps;

export default RoutePage;
