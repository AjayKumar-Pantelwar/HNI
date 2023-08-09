import { Button, Container } from '@mui/material';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import Iconify from 'src/components/iconify/iconify';
import { useSettingsContext } from 'src/components/settings';
import { dealApi } from 'src/redux/api/deal.api';
import { RouterLink } from 'src/routes/components';
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';

const DealsTeamView = () => {
  const settings = useSettingsContext();
  const params = useParams();

  const { data: deals } = dealApi.useDealQuery({
    deal_id: params.id,
  });
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Team"
        links={[]}
        action={
          deals &&
          deals?.data?.deals?.length === 0 && (
            <Button
              component={RouterLink}
              href={paths.dashboard.deals.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Deal
            </Button>
          )
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
    </Container>
  );
};

export default DealsTeamView;
