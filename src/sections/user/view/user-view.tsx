'use client';

import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import { usePerm } from 'src/hooks/use-perm';
import { Stack } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { paths } from 'src/routes/paths';
import UserListView from './user-list-view';

const UserView = () => {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Users', href: paths.dashboard.user.list },
          { name: 'List' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stack gap={3} />
      <UserListView />
    </Container>
  );
};

export default UserView;
