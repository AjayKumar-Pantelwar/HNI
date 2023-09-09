'use client';

import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { paths } from 'src/routes/paths';
import CompanyNewEditForm from '../company-new-edit-form';

export default function CompanyCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create New Company"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Company',
            href: paths.dashboard.company.list,
          },
          { name: 'New Company' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CompanyNewEditForm />
    </Container>
  );
}
