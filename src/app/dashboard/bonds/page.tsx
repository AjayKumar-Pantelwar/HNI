import { redirect } from 'next/navigation';
import { paths } from 'src/routes/paths';

export default function BondsPage() {
  redirect(paths.dashboard.bonds.list);
}
