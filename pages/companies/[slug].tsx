import {
  CompaniesList,
  getSSProps,
} from '../../src/ui/templates/companies/Companies';
import './CompaniesList.scss';

const RoutePage = CompaniesList;
export const getServerSideProps = getSSProps;

export default RoutePage;
