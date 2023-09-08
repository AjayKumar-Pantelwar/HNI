import { redirect } from 'next/navigation';
import { paths } from 'src/routes/paths';

export default function InvestorsPage() {
  redirect(paths.dashboard.investors.list);
}
