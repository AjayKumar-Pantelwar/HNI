'use client';

import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { dealApi } from 'src/redux/api/deal.api';
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import DealsMediaForm from '../deal-media-form';

export default function DealsMediaView() {
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
          { name: 'Media' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {data?.data?.deals?.[0] && <DealsMediaForm currentDeal={data?.data?.deals?.[0]} />}
    </Container>
  );
}
