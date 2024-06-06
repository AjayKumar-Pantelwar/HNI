'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
// import { usePerm } from 'src/hooks/use-perm';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Stack } from '@mui/material';
import EmptyContent from 'src/components/empty-content';
import { useBoolean } from 'src/hooks/use-boolean';
import { paths } from 'src/routes/paths';
import CarouselEditView from '../carousel-edit-modal';
import CarouselListView from './carousel-list-view';

const CarouselView = () => {
  const settings = useSettingsContext();

  // const { data } = carouselApi.useCarouselsQuery();

  const data = {
    message: 'successfully found all the carousels',
    status: 'success',
    data: [
      {
        id: 1,

        title: 'image one',
        description: 'description one',
        media_url:
          'https://images.pexels.com/photos/210600/pexels-photo-210600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        icon: 'https://w7.pngwing.com/pngs/308/74/png-transparent-computer-icons-setting-icon-cdr-svg-setting-icon.png',
        is_active: true,
      },
      {
        id: 2,

        title: 'image two',

        description: 'description two',

        media_url: 'https://images.pexels.com/photos/342942/pexels-photo-342942.jpeg',
        icon: 'https://w7.pngwing.com/pngs/308/74/png-transparent-computer-icons-setting-icon-cdr-svg-setting-icon.png',
        is_active: true,
      },
    ],
  };

  const newCarousel = useBoolean();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Carousel', href: paths.dashboard.contentManagement.carousel.list },
          { name: 'List' },
        ]}
        action={
          <Button
            onClick={() => newCarousel.onTrue()}
            variant="contained"
            startIcon={<AddRoundedIcon />}
          >
            New Carousel
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stack gap={3}>
        <Stack>
          {!data ? (
            <EmptyContent
              filled
              title="No Data"
              sx={{
                py: 10,
              }}
            />
          ) : (
            <CarouselListView data={data} />
          )}
        </Stack>
      </Stack>
      <CarouselEditView open={newCarousel.value} onClose={newCarousel.onFalse} />
    </Container>
  );
};

export default CarouselView;
