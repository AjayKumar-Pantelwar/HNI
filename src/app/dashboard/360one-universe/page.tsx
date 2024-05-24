import { redirect } from 'next/navigation';
import { paths } from 'src/routes/paths';

export default function UniversePage() {
  redirect(paths.dashboard.universe.vas.root);
}
