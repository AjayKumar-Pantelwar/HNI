'use client';

import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { bondsApi } from 'src/redux/api/bonds.api';
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';

import BondsNewEditForm from '../bonds-new-edit-form';

export default function MLDsEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const { data } = bondsApi.useBondsQuery();

  const currentBond = data?.data?.bonds?.find((bond) => bond.bond.bond_id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
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

      {currentBond && <BondsNewEditForm currentBond={currentBond?.bond} />}
    </Container>
  );
}
