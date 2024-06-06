'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import RolesNewEditForm from '../roles-new-edit-form';
//

// ----------------------------------------------------------------------

export default function RolesCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Role"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Roles',
            href: paths.dashboard.admin.roles.list,
          },
          { name: 'New Role' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <RolesNewEditForm />
    </Container>
  );
}
