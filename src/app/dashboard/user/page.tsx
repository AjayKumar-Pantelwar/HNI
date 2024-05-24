import { redirect } from 'next/navigation';
import { paths } from 'src/routes/paths';

export default function UserPage() {
  redirect(paths.dashboard.user.list);
}
