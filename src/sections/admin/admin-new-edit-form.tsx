'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
// @mui
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
  Button,
  CircularProgress,
  Grid,
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

import FormProvider, {
  RHFAutocomplete,
  RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import Iconify from 'src/components/iconify/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import { adminApi } from 'src/redux/api/admin.api';
import { roleApi } from 'src/redux/api/role.api';
import { secondaryFont } from 'src/theme/typography';
import { Admin, CreateAdminRequest, CreateAdminSchema } from 'src/types/admin.types';
import { GetRolesResponse } from 'src/types/role.types';
import { handleError } from 'src/utils/handle-error';

// ----------------------------------------------------------------------

type Props = {
  currentAdmin?: Admin;
  roles: GetRolesResponse | undefined;
};

export default function AdminNewEditForm({ currentAdmin, roles: rolesData }: Props) {
  const router = useRouter();

  const password = useBoolean();

  const mdUp = useResponsive('up', 'md');

  const [createAdmin] = adminApi.useCreateAdminMutation();

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = useMemo<CreateAdminRequest>(
    () => ({
      name: currentAdmin?.name || '',
      email: currentAdmin?.email || '',
      // mobile_number: currentAdmin?.mobile_number || '',
      username: currentAdmin?.username || '',
      password: '',
      // is_pwd_change_required: currentAdmin?.is_pwd_change_required || false,
      rid: currentAdmin?.rid || '',
      // description: currentAdmin?.description || '',
      // experience: currentAdmin?.experience || '',
      // location: currentAdmin?.location || '',
      // languages: currentAdmin?.languages || '',
      // specializes_in_1: currentAdmin?.specializes_in_1 || '',
      // specializes_in_2: currentAdmin?.specializes_in_2 || '',
      // specializes_in_3: currentAdmin?.specializes_in_3 || '',
      // profile_img: null,
    }),
    [currentAdmin]
  );

  const methods = useForm<CreateAdminRequest>({
    resolver: yupResolver<CreateAdminRequest>(CreateAdminSchema),
    defaultValues,
  });

  const {
    getValues,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createAdmin(data).unwrap();
      reset();
      enqueueSnackbar(currentAdmin ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.admin.list);
    } catch (error) {
      handleError(error);
    }
  });

  // const handleDrop = useCallback(
  //   (key: keyof CreateAdminRequest) => (acceptedFiles: File[]) => {
  //     const newFiles = acceptedFiles?.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     );

  //     // setValue(key, newFiles[0], { shouldValidate: true });
  //     if (key === 'profile_img' && newFiles.length > 0) {
  //       setProfileImg(newFiles[0]);
  //     }
  //   },
  //   [setProfileImg]
  // );

  const currentRid = methods.watch('rid');

  const { data: currentPermissions } = roleApi.usePermissionsQuery(
    { id: currentRid || '' },
    {
      skip: !currentRid,
    }
  );
  // const description = watch('description');

  const currentRole = rolesData?.data?.find((role) => role.rid === currentRid);

  const sectionOne = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ fontFamily: secondaryFont.style.fontFamily, mb: 0.5 }}>
            Basic Details
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: secondaryFont.style.fontFamily, color: 'text.secondary' }}
          >
            Enter basic details of the admin
          </Typography>
        </Grid>
      )}
      <Grid xs={12} md={8}>
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
            <RHFTextField
              name="password"
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

            {rolesData?.data && (
              <RHFAutocomplete
                name="rid"
                label="Role"
                options={rolesData?.data?.map((role) => role.rid) || []}
                getOptionLabel={(option) => {
                  const found = rolesData?.data?.find((role) => role.rid === option);
                  if (!found) return option;
                  return found.rname.toLocaleUpperCase();
                }}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const found = rolesData?.data?.find((role) => role.rid === option);
                  if (!found) return null;
                  return (
                    <li {...props} key={found.rid}>
                      {found.rname.toLocaleUpperCase()}
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
                    <TableCell>Publish</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(currentPermissions?.data || {}).map((permission) => (
                    <TableRow key={permission.module_name}>
                      <TableCell>{permission.module_name.toUpperCase()}</TableCell>
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
                      <TableCell>
                        {permission.publish ? (
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
          {/* <Box sx={{ pt: 2 }}>
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
          </Box> */}
        </Card>
      </Grid>
    </>
  );
  const sectionTwo = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Role Manager Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Enter basic details of the Role Mananger
          </Typography>
        </Grid>
      )}
      <Grid xs={12} md={8}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 6, mt: 3 }}>
            <>
              <RHFTextField name="experience" label="Experience" />
              <RHFTextField name="location" label="Location" />
              <RHFTextField name="languages" label="Languages Known" />
              <RHFTextField name="specializes_in_1" label="Specialization 1" />
              <RHFTextField name="specializes_in_2" label="Specialization 2" />
              <RHFTextField name="specializes_in_3" label="Specialization 3" />
              <RHFUploadAvatar
                name="profile_img"
                maxSize={3145728}
                // onDrop={handleDrop('profile_img')}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mb: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                  </Typography>
                }
              />
              <Box sx={{ display: 'flex', width: '100%' }}>
                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  fullWidth
                  rows={4}
                  // helperText={`${description?.length} / 250`}
                />
              </Box>
            </>
          </Card>
        </Grid>
      </Grid>
    </>
  );
  const sectionThree = (
    <Stack alignItems="end" sx={{ width: '100%', mt: 3 }}>
      <Button type="submit" variant="contained">
        {isSubmitting ? (
          <CircularProgress size={22} />
        ) : !currentAdmin ? (
          'Create Admin'
        ) : (
          'Save Changes'
        )}
      </Button>
    </Stack>
  );
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container ml={0} spacing={3}>
        {sectionOne}
        {/* {getValues('rid') === 'rm' && sectionTwo} */}
        {sectionThree}
      </Grid>
    </FormProvider>
  );
}
