'use client';

import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { investorApi } from 'src/redux/api/investor.api';
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import InvestorProfile from '../profile/investor-profile';

export function InvestorProfileView() {
  const settings = useSettingsContext();
  const params = useParams();

  const { data } = investorApi.useInvestorsQuery({ cid: params.id }, { skip: !params.id });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Investor', href: paths.dashboard.investors.list },
          { name: 'Profile' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {data?.data?.investors?.[0] && <InvestorProfile investor={data?.data?.investors?.[0]} />}
    </Container>
  );
}
