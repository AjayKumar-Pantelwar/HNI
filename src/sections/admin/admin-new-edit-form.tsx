'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// utils
// routes
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// types
// assets
// components
import {
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import FormProvider, { RHFAutocomplete, RHFSwitch, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { useBoolean } from 'src/hooks/use-boolean';
import { adminApi } from 'src/redux/api/admin.api';
import { roleApi } from 'src/redux/api/role.api';
import { Admin, CreateAdminRequest, CreateAdminSchema } from 'src/types/admin.types';
import { handleError } from 'src/utils/handle-error';

// ----------------------------------------------------------------------

type Props = {
  currentAdmin?: Admin;
};

export default function AdminNewEditForm({ currentAdmin }: Props) {
  const router = useRouter();

  const password = useBoolean();

  const { data: rolesData } = roleApi.useRolesQuery();

  const [createAdmin] = adminApi.useCreateAdminMutation();

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = useMemo<CreateAdminRequest>(
    () => ({
      name: currentAdmin?.name || '',
      email: currentAdmin?.email || '',
      is_pwd_change_required: currentAdmin?.is_pwd_change_required || false,
      mobile_number: currentAdmin?.mobile_number || '',
      pwd: '',
      rid: currentAdmin?.rid || '',
      username: currentAdmin?.username || '',
    }),
    [currentAdmin]
  );

  const methods = useForm({
    resolver: yupResolver(CreateAdminSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createAdmin(data).unwrap();
      enqueueSnackbar(currentAdmin ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.admin.list);
    } catch (error) {
      handleError(error);
    }
  });

  const currentRid = methods.watch('rid');

  const currentRole = rolesData?.data?.roles?.find((role) => role.rid === currentRid);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 6 }}>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <RHFTextField name="name" label="Full Name" />
          <RHFTextField name="email" label="Email Address" />
          <RHFTextField name="username" label="Username" />
          <RHFTextField name="mobile_number" label="Phone Number" />
          <RHFTextField
            name="pwd"
            label="Password"
            type={password.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {rolesData?.data?.roles && (
            <RHFAutocomplete
              name="rid"
              label="Role"
              options={rolesData?.data?.roles?.map((role) => role.rid) || []}
              getOptionLabel={(option) => {
                const found = rolesData?.data?.roles?.find((role) => role.rid === option);
                if (!found) return option;
                return found.name.toLocaleUpperCase();
              }}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => {
                const found = rolesData?.data?.roles?.find((role) => role.rid === option);
                if (!found) return null;
                return (
                  <li {...props} key={found.rid}>
                    {found.name.toLocaleUpperCase()}
                  </li>
                );
              }}
            />
          )}
        </Box>
        {currentRole && (
          <TableContainer sx={{ mt: 3 }}>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>
              This role has the following permissions:
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Role</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRole?.permission?.map((permission) => (
                  <TableRow key={permission.module}>
                    <TableCell>{permission.module.toUpperCase()}</TableCell>
                    <TableCell>
                      {permission.view ? (
                        <Iconify icon="gg:check-o" width={20} height={20} color="success.main" />
                      ) : (
                        <Iconify
                          icon="humbleicons:times-circle"
                          width={20}
                          height={20}
                          color="error.main"
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      {permission.edit ? (
                        <Iconify icon="gg:check-o" width={20} height={20} color="success.main" />
                      ) : (
                        <Iconify
                          icon="humbleicons:times-circle"
                          width={20}
                          height={20}
                          color="error.main"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Box sx={{ pt: 2 }}>
          <RHFSwitch
            name="is_pwd_change_required"
            label={
              <>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Password change
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Enabling this will require a password change at first login.
                </Typography>
              </>
            }
            sx={{ justifyContent: 'space-between' }}
          />
        </Box>
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!currentAdmin ? 'Create Admin' : 'Save Changes'}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
