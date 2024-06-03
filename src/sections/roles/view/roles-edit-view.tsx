'use client';

import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { roleApi } from 'src/redux/api/role.api';
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import RolesNewEditForm from '../roles-new-edit-form';

export default function RolesEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const { data } = roleApi.useRolesQuery();

  const currentRole = data?.data?.find((role) => role.rid === id);

  const { data: currentPermissions } = roleApi.usePermissionsQuery(
    { id: currentRole?.rid || '' },
    {
      skip: !currentRole?.rid,
    }
  );

  // console.log({ currentPermissions });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Roles',
            href: paths.dashboard.admin.roles.list,
          },
          { name: currentRole?.rname },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {currentRole && currentPermissions && (
        <RolesNewEditForm currentRole={currentRole} currentPermissions={currentPermissions?.data} />
      )}
    </Container>
  );
}
