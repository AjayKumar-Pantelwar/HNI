'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { Divider, Stack } from '@mui/material';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { dealApi } from 'src/redux/api/deal.api';
import { useParams } from 'src/routes/hook';
import DealHighlightForm from '../deal-highlights-form';
import DealsPitchForm from '../deals-pitch-form';
//

// ----------------------------------------------------------------------

export default function DealsPitchView() {
  const settings = useSettingsContext();
  const params = useParams();

  const { data } = dealApi.useDealQuery({ deal_id: params.id as string }, { skip: !params.id });

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
          { name: 'Pitch' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stack gap={4}>
        {data?.data?.deals?.[0] && <DealsPitchForm currentDeal={data?.data?.deals?.[0]} />}
        <Divider />
        {data?.data?.deals?.[0] && <DealHighlightForm currentDeal={data?.data?.deals?.[0]} />}
      </Stack>
    </Container>
  );
}
