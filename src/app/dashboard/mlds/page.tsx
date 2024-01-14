import { redirect } from 'next/navigation';
import { paths } from 'src/routes/paths';

export default function MLDsPage() {
  redirect(paths.dashboard.mlds.list);
}
