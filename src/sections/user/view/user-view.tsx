'use client';

import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import { usePerm } from 'src/hooks/use-perm';
import { Stack } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { paths } from 'src/routes/paths';
import { GetUserResponse } from 'src/types/user.types';
import UserListView from './user-list-view';

const UserView = () => {
  const settings = useSettingsContext();

  const data: GetUserResponse = {
    data: [
      {
        id: 1,
        aml: true,
        calibre: true,
        client_name: 'John Doe',
        email: 'j@j.com',
        kyc_mismatch: true,
        mobile_number: '1234567890',
        pan: 'ABCDE1234F',
        is_blocked: true,
      },
      {
        id: 2,
        aml: true,
        calibre: true,
        client_name: 'John Doe',
        email: 'j@j.com',
        kyc_mismatch: true,
        mobile_number: '1234567890',
        pan: 'ABCDE1234F',
        is_blocked: false,
      },
      {
        id: 3,
        aml: true,
        calibre: true,
        client_name: 'John Doe',
        email: 'j@j.com',
        kyc_mismatch: true,
        mobile_number: '1234567890',
        pan: 'ABCDE1234F',
        is_blocked: true,
      },
    ],
    message: 'Success',
    status: 'success',
    error: '',
  };

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
      <UserListView data={data} />
    </Container>
  );
};

export default UserView;
