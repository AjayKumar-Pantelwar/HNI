'use client';

import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { mldsApi } from 'src/redux/api/mlds.api';
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import MLDsNewEditForm from '../mlds-new-edit-form';

export default function MLDsEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const { data } = mldsApi.useMldsQuery();

  const currentMLD = data?.data?.mlds?.find((mld) => mld.mld.mld_id === id);

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
            name: 'MLDs',
            href: paths.dashboard.mlds.list,
          },
          { name: currentMLD?.mld.mld_id },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {currentMLD && <MLDsNewEditForm currentMLD={currentMLD?.mld} />}
    </Container>
  );
}
