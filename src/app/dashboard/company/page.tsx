import { redirect } from 'next/navigation';
import { paths } from 'src/routes/paths';

export default function CompanyPage() {
  redirect(paths.dashboard.company.list);
}
