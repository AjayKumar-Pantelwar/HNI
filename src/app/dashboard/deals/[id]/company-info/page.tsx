import { useParams } from 'next/navigation';
import DealsCompanyInfoView from 'src/sections/deals/view/deals-company-info-view';

export const metadata = {
  title: 'Deals Account Info',
};

export default function DealsPage() {
  return <DealsCompanyInfoView />;
}
