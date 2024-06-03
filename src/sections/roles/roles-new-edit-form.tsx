'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Checkbox,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { roleApi } from 'src/redux/api/role.api';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { PermissionsData, Role } from 'src/types/role.types';
import * as Yup from 'yup';

// ----------------------------------------------------------------------

type Props = {
  currentRole?: Role;
  currentPermissions?: PermissionsData[];
};

export default function RolesNewEditForm({ currentRole, currentPermissions }: Props) {
  const router = useRouter();

  const [createRole] = roleApi.useCreateRoleMutation();
  const [editRole] = roleApi.useEditRoleMutation();

  const { enqueueSnackbar } = useSnackbar();
  const { data: apiPermissions } = roleApi.useAllPermissionsQuery();

  const RolesSchema = Yup.object().shape({
    rname: Yup.string().required('Name is required'),
    policies: Yup.array().required('Permission is required'),
  });

  const defaultValues = useMemo(
    () => ({
      rname: currentRole?.rname || '',
      policies: Object.values(currentPermissions || {}).map((module) => ({
        view: module.view || false,
        edit: module.edit || false,
        publish: module.publish || false,
        module_name: module.module_name,
      })),
    }),
    [currentPermissions, currentRole]
  );

  const methods = useForm({
    resolver: yupResolver(RolesSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    getValues,
    watch,
  } = methods;

  React.useEffect(() => {
    if (apiPermissions && !currentRole) {
      const perms = Object.values(apiPermissions.data).map((module) => ({
        view: false,
        edit: false,
        publish: false,
        module_name: module.value,
      }));

      setValue('policies', perms);
    }
  }, [apiPermissions, currentRole, setValue]);

  const permissions = watch('policies');

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentRole) {
        await editRole({ id: currentRole.rid, ...data }).unwrap();
      } else {
        await createRole(data).unwrap();
      }
      enqueueSnackbar(currentRole ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.admin.roles.list);
    } catch (error) {
      enqueueSnackbar(error.error, { variant: 'error' });
      console.error(error);
    }
  });

  // React.useEffect(() => {
  //   formPermissions.forEach((f) => {
  //     if (f.module_name === Permissions.DEAL_STAGE && f.edit) {
  //       setValue('permission', [
  //         ...formPermissions,
  //         {
  //           module: Permissions.DEAL,
  //           view: true,
  //           edit: false,
  //         },
  //       ]);
  //     }
  //   });
  // }, []);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Stack sx={{ pb: 3 }}>
          <RHFTextField name="rname" label="Choose a name" fullWidth />
        </Stack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Permissions</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Publish</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiPermissions ? (
                Object.values(apiPermissions.data).map((permission) => (
                  <TableRow key={permission.value}>
                    <TableCell>{permission.placeholder}</TableCell>
                    <TableCell>
                      <Box sx={{ width: '40px' }}>
                        <Box>
                          <Checkbox
                            checked={
                              permissions.find((perm) => perm.module_name === permission.value)
                                ?.view || false
                            }
                            onChange={(_e, checked) => {
                              const index = permissions.findIndex(
                                (perm) => perm.module_name === permission.value
                              );
                              const newPermissions = [...permissions];
                              newPermissions[index].view = checked;
                              setValue('policies', newPermissions);
                            }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ width: '40px' }}>
                        <Box>
                          <Checkbox
                            checked={
                              permissions.find((perm) => perm.module_name === permission.value)
                                ?.edit || false
                            }
                            onChange={(e, checked) => {
                              const index = permissions.findIndex(
                                (perm) => perm.module_name === permission.value
                              );
                              const newPermissions = [...permissions];
                              newPermissions[index].edit = checked;
                              setValue('policies', newPermissions);
                            }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ width: '40px' }}>
                        <Box>
                          <Checkbox
                            checked={
                              permissions.find((perm) => perm.module_name === permission.value)
                                ?.publish || false
                            }
                            onChange={(e, checked) => {
                              const index = permissions.findIndex(
                                (perm) => perm.module_name === permission.value
                              );
                              const newPermissions = [...permissions];
                              newPermissions[index].publish = checked;
                              setValue('policies', newPermissions);
                            }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Skeleton width="100%" height={100} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!currentRole ? 'Create Role' : 'Save Changes'}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
