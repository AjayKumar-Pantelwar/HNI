'use client';

import { Container, Stack } from '@mui/material';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { paths } from 'src/routes/paths';
import { mockGetLandingPageResponse } from 'src/types/unverise/landing-page';
import Introduction from './introduction/introduction';
import LandingPageList from './list/list';
import Products from './products/products';
import LandingPageVAS from './vas';

const LandingPageView = () => {
  const settings = useSettingsContext();

  const data = mockGetLandingPageResponse;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Landing Page"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: '360 Universe', href: paths.dashboard.universe.root },
          { name: 'Landing Page' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stack sx={{ mt: 3, gap: 2 }}>
        <Introduction data={data?.data?.intro} />
        <LandingPageList list={data?.data?.lists} />
        <Products products={data?.data?.tabs} />
        <LandingPageVAS vas={data?.data?.vas} />
      </Stack>
    </Container>
  );
};

export default LandingPageView;
