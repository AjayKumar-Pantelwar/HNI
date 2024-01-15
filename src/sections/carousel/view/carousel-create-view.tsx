'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import CarouselNewEditForm from '../carousel-new-edit-form';
//

// ----------------------------------------------------------------------

export default function CarouselCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Carousel"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Carousel',
            href: paths.dashboard.carousel.list,
          },
          { name: 'New Carousel' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CarouselNewEditForm />
    </Container>
  );
}
