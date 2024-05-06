'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
// import { usePerm } from 'src/hooks/use-perm';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import { Box, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useCallback, useState } from 'react';
import EmptyContent from 'src/components/empty-content';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import CarouselGridView from './carousel-grid-view';
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
        priority: 1,
        title: {
          normal: 'g',
          bold: 'g',
        },
        subtitle: {
          number: 6,
          suffix: 'g',
          data: 'h',
        },
        media_url:
          'https://images.pexels.com/photos/210600/pexels-photo-210600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        icon: 'https://w7.pngwing.com/pngs/308/74/png-transparent-computer-icons-setting-icon-cdr-svg-setting-icon.png',
        is_active: true,
      },
      {
        id: 1,
        priority: 1,
        title: {
          normal: 'k',
          bold: 'j',
        },
        subtitle: {
          number: 6,
          suffix: 'hii',
          data: 'hello',
        },
        media_url: 'https://images.pexels.com/photos/342942/pexels-photo-342942.jpeg',
        icon: 'https://w7.pngwing.com/pngs/308/74/png-transparent-computer-icons-setting-icon-cdr-svg-setting-icon.png',
        is_active: true,
      },
    ],
  };

  const [isGlobalEdit, setIsGlobalEdit] = useState(false);

  const [view, setView] = useState('list');

  const handleChangeView = useCallback(
    (event: React.MouseEvent<HTMLElement>, newView: string | null) => {
      if (newView !== null) {
        setView(newView);
      }
    },
    []
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Carousel', href: paths.dashboard.carousel.list },
          { name: 'List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.carousel.new}
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ToggleButtonGroup size="small" value={view} exclusive onChange={handleChangeView}>
            <ToggleButton value="list">
              <ListIcon />
            </ToggleButton>
            <ToggleButton value="grid">
              <GridViewIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          {view === 'list' && (
            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  setIsGlobalEdit((prev) => !prev);
                }}
              >
                {isGlobalEdit ? 'Cancel' : 'Edit'}
              </Button>
            </Box>
          )}
        </Box>
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
            <>
              {view === 'list' ? (
                <CarouselListView data={data} isGlobalEdit={isGlobalEdit} />
              ) : (
                <CarouselGridView data={data} />
              )}
            </>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default CarouselView;
