'use client';

import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { mldsApi } from 'src/redux/api/mlds.api';
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import MLDDetails from '../mld-details';

export default function MLDDetailsView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const { data } = mldsApi.useMldsQuery();

  //   const currentMLD = data?.data?.mlds?.find((mld) => mld.mld.mld_id === id);

  const currentMLD = {
    amc: {
      created_at: '2024-01-17T09:17:28.81973Z',
      updated_at: '2024-01-17T10:55:54.23354Z',
      amc_id: '52f3afaf-8abb-49a8-99e8-a5b3a940d718',
      amc_name: 'L&T FINANCE LIMITED',
      amc_description: 'eiusmod',
      amc_logo: 'eiusmod',
      amc_type: 'minim sunt Lorem',
      amc_home_page: 'sunt',
    },
    mld: {
      maturity_date: '2024-08-27T00:00:00Z',
      issuer_date: '2022-07-27T00:00:00Z',
      updated_at: '2024-01-22T06:42:03.566852Z',
      created_at: '2024-01-17T09:17:28.81973Z',
      offer_close_date: '2023-12-31T00:00:00Z',
      underlying: '',
      mld_id: 'INE027E07BZ9',
      description:
        'This investment portfolio curates a standardised conservative multi-asset class portfolio that is in line with your values and risk profile',
      amc_id: '52f3afaf-8abb-49a8-99e8-a5b3a940d718',
      name: 'L&T Finance Limited',
      rating: 'AAA',
      yield: 'NA',
      min_investment: 2500000,
      principal_protected: true,
      is_certified: true,
      is_activated: true,
    },
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="View"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'MLDs',
            href: paths.dashboard.mlds.list,
          },
          { name: currentMLD?.mld.mld_id },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {currentMLD && <MLDDetails currentMLD={currentMLD} />}
    </Container>
  );
}
