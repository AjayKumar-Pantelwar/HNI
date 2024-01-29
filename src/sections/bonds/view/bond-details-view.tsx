'use client';

import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { bondsApi } from 'src/redux/api/bonds.api';
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import BondDetails from '../bond-details';

export default function BondsDetailsView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const { data } = bondsApi.useBondsQuery();

  const currentBond = {
    bond: {
      bond_name: 'Axis Finance Limited',
      min_investment: 2500000,
      yield: 8.5,
      security: 'Secured',
      description:
        'The investment portfolio curates a standardised conservative multi-asset class portfolio that is in line with your values and risk profile',
      rating: 'AAA',
      bond_id: 'INE891K07689',
      maturity_date: '2024-09-09T00:00:00Z',
      issue_date: '2021-09-09T00:00:00Z',
      next_interest_date: '0001-01-01T00:00:00Z',
      coupon_payout: 'Not Available',
      amc_id: 'fe316c49-add1-4abf-8dd7-f177b2b92fac',
      face_value: 1000000,
      type: 'Zero Coupon Bonds',
      is_certified: true,
      is_activated: true,
      offer_close_date: '2023-12-31T00:00:00Z',
      created_at: '2024-01-12T09:16:47.580748Z',
      updated_at: '2024-01-22T06:37:20.314141Z',
    },
    amc: {
      amc_id: 'fe316c49-add1-4abf-8dd7-f177b2b92fac',
      amc_name: 'AXIS FINANCE LIMITED',
      amc_description: '',
      amc_logo: '',
      amc_type: '',
      amc_home_page: '',
      created_at: '2024-01-12T09:16:47.580748Z',
      updated_at: '2024-01-12T09:16:47.580748Z',
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
            name: 'Bonds',
            href: paths.dashboard.bonds.list,
          },
          { name: currentBond?.bond.bond_id },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {currentBond && <BondDetails currentBond={currentBond} />}
    </Container>
  );
}
