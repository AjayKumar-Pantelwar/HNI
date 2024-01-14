'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import BondsNewEditForm from '../bonds-new-edit-form';
//

// ----------------------------------------------------------------------

export default function BondsCreateView() {
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
            name: 'Bonds',
            href: paths.dashboard.bonds.list,
          },
          { name: 'New Bond' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <BondsNewEditForm />
    </Container>
  );
}
