import { redirect } from 'next/navigation';
import { paths } from 'src/routes/paths';

export default function RolePage() {
  redirect(paths.dashboard.roles.list);
}
