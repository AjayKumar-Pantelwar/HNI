'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
//

import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { roleApi } from 'src/redux/api/role.api';
import { RouterLink } from 'src/routes/components';
import AdminNewEditForm from '../admin-new-edit-form';

// ----------------------------------------------------------------------

export default function AdminCreateView() {
  const { data: rolesData, isLoading } = roleApi.useRolesQuery();
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create New Admin"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Admin',
            href: paths.dashboard.admin.list,
          },
          { name: 'New Admin' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {isLoading ? (
        <Box
          sx={{
            p: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      ) : rolesData && rolesData?.data?.length <= 0 ? (
        <Box
          sx={{
            p: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Stack gap={2} alignItems="center">
            <Typography variant="h3">Permission Denied</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              You have to create roles first, to create admins
            </Typography>
            <Stack alignItems="center" flex={1}>
              <Button variant="outlined" component={RouterLink} href={paths.dashboard.roles.new}>
                Click here to add a role
              </Button>
            </Stack>
          </Stack>
        </Box>
      ) : (
        <AdminNewEditForm roles={rolesData} />
      )}
    </Container>
  );
}
