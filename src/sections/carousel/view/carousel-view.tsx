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
import { useTable } from 'src/components/table';
import { carouselApi } from 'src/redux/api/carousel.api';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import CarouselGridView from './carousel-grid-view';
import CarouselListView from './carousel-list-view';

const CarouselView = () => {
  const settings = useSettingsContext();
  const table = useTable();

  const { data } = carouselApi.useCarouselsQuery();

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
            href={paths.dashboard.roles.new}
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
        <Box>
          <ToggleButtonGroup size="small" value={view} exclusive onChange={handleChangeView}>
            <ToggleButton value="list">
              <ListIcon />
            </ToggleButton>

            <ToggleButton value="grid">
              <GridViewIcon />
            </ToggleButton>
          </ToggleButtonGroup>
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
                <CarouselListView data={data} />
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
