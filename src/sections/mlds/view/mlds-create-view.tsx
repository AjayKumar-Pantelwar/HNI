'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import MLDsNewEditForm from '../mlds-new-edit-form';
//

// ----------------------------------------------------------------------

export default function MLDsCreateView() {
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
            name: 'MLDs',
            href: paths.dashboard.mlds.list,
          },
          { name: 'New MLD' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <MLDsNewEditForm />
    </Container>
  );
}
