'use client';

import { Container, Divider, Stack } from '@mui/material';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';

import { dealApi } from 'src/redux/api/deal.api';
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';

import DealInvestor from '../deal-investor-form';
import DealNewsForm from '../deal-news-form';
import DealTeamForm from '../deal-team-form';

const DealsCompanyInfoView = () => {
  const settings = useSettingsContext();

  const params = useParams();

  const { data: deals } = dealApi.useDealQuery({
    deal_id: params.id,
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit a Deal"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Deals',
            href: paths.dashboard.deals.list,
          },
          { name: 'Company Info' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stack gap={4}>
        {/* {deals?.data?.deals?.[0] && <DealAccountInfoForm deal={deals?.data?.deals?.[0]} />}
        <Divider /> */}
        {deals?.data?.deals?.[0] && <DealTeamForm currentDeal={deals?.data?.deals?.[0]} />}
        <Divider />
        {deals?.data?.deals?.[0] && <DealInvestor currentDeal={deals?.data?.deals?.[0]} />}
        <Divider />
        {deals?.data?.deals?.[0] && <DealNewsForm currentDeal={deals?.data?.deals?.[0]} />}
      </Stack>
    </Container>
  );
};

export default DealsCompanyInfoView;
