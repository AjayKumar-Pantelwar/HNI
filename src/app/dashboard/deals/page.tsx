import { redirect } from 'next/navigation';
import { paths } from 'src/routes/paths';

export default function DealsPage() {
  redirect(paths.dashboard.deals.list);
}
