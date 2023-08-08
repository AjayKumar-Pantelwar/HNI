// sections

import { roleApi } from 'src/redux/api/role.api';
import { AdminCreateView } from 'src/sections/admin/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Create a new admin',
};

export default async function UserCreatePage() {
  // const rolesData = await getRoles();
  return <AdminCreateView />;
}

// export const getRoles = async () => {
//   const { data: rolesData } = await roleApi.useRolesQuery();

//   return rolesData?.data?.roles;
// };
