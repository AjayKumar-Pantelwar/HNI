import { redirect } from 'next/navigation';
import { paths } from 'src/routes/paths';

export default function AdminPage() {
  redirect(paths.dashboard.admin.list);
}
