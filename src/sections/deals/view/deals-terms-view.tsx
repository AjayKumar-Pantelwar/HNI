'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { Stack } from '@mui/material';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { dealApi } from 'src/redux/api/deal.api';
import { useParams } from 'src/routes/hook';
import DealsTermsForm from '../deals-terms-form';
//

// ----------------------------------------------------------------------

export default function DealsTermsView() {
  const settings = useSettingsContext();
  const params = useParams();

  const { data } = dealApi.useDealQuery({ deal_id: params.id as string }, { skip: !params.id });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Deal Terms"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Deals',
            href: paths.dashboard.deals.list,
          },
          { name: 'Terms' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stack gap={4}>
        {data?.data?.deals?.[0] && <DealsTermsForm currentDeal={data?.data?.deals?.[0]} />}
      </Stack>
    </Container>
  );
}
