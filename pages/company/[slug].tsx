import {
  CompanyPage,
  getSSProps,
} from '../../src/ui/templates/company/Company';
import './Company.scss';

const RoutePage = CompanyPage;
export const getServerSideProps = getSSProps;

export default RoutePage;
