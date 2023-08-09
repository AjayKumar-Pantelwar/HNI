// sections

import { RolesCreateView, RolesEditView } from 'src/sections/roles/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Edit role',
};

export default function UserCreatePage() {
  return <RolesEditView />;
}
