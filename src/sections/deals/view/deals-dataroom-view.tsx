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
import DealDDReportForm from '../deal-dd-report-form';
import DealDataroomForm from '../deals-dataroom-form';
//

// ----------------------------------------------------------------------

export default function DealsDataroomView() {
  const settings = useSettingsContext();
  const params = useParams();

  const { data } = dealApi.useDealQuery({ deal_id: params.id as string }, { skip: !params.id });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Dataroom"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Deals',
            href: paths.dashboard.deals.list,
          },
          { name: 'Dataroom' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stack gap={4}>
        {data?.data?.deals?.[0] && (
          <>
            <DealDataroomForm currentDeal={data?.data?.deals?.[0]} />
            <DealDDReportForm currentDeal={data?.data?.deals?.[0]} />
          </>
        )}
      </Stack>
    </Container>
  );
}
