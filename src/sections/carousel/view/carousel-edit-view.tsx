'use client';

import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { carouselApi } from 'src/redux/api/carousel.api';
import { useParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import CarouselNewEditForm from '../carousel-new-edit-form';

export default function CarouselEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const { data } = carouselApi.useCarouselsQuery();

  const currentCarousel = data?.data?.find((c) => c.id.toString() === id);

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
            name: 'Carousel',
            href: paths.dashboard.roles.list,
          },
          { name: currentCarousel?.title.bold },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {currentCarousel && <CarouselNewEditForm currentCarousel={currentCarousel} />}
    </Container>
  );
}
