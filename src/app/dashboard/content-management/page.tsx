import { redirect } from 'next/navigation';
import { paths } from 'src/routes/paths';

export default function ContentManagementPage() {
  redirect(paths.dashboard.contentManagement.reasearch.list);
}
