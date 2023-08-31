'use client';

import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { roleApi } from 'src/redux/api/role.api';
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import AdminNewEditForm from '../roles-new-edit-form';

export default function RolesEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const { data } = roleApi.useRolesQuery();

  const currentRole = data?.data?.roles?.find((role) => role.rid === id);

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
            href: paths.dashboard.roles.list,
          },
          { name: currentRole?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {currentRole && <AdminNewEditForm currentRole={currentRole} />}
    </Container>
  );
}
