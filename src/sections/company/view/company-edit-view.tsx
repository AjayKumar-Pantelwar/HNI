'use client';

import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { companyApi } from 'src/redux/api/company.api';
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import CompanyNewEditForm from '../company-new-edit-form';

export default function CompanyEditView() {
  const settings = useSettingsContext();

  const params = useParams();
  const { data } = companyApi.useCompanyQuery(
    { company_id: params.id as string },
    { skip: !params.id }
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit Company"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Company',
            href: paths.dashboard.company.list,
          },
          { name: 'Edit Company' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {data?.data?.company?.[0] && <CompanyNewEditForm currentCompany={data?.data?.company?.[0]} />}
    </Container>
  );
}
