'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import {
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
import { Role } from 'src/types/role.types';
import * as Yup from 'yup';

// ----------------------------------------------------------------------

type Props = {
  currentRole?: Role;
};

export default function RolesNewEditForm({ currentRole }: Props) {
  const router = useRouter();

  const [createRole] = roleApi.useCreateRoleMutation();
  const [editRole] = roleApi.useEditRoleMutation();

  const { enqueueSnackbar } = useSnackbar();

  const { data: apiPermissions } = roleApi.usePermissionsQuery();

  const RolesSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    permission: Yup.array().required('Permission is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentRole?.name || '',
      permission: currentRole?.permission || [],
    }),
    [currentRole]
  );

  const methods = useForm({
    resolver: yupResolver(RolesSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  React.useEffect(() => {
    if (apiPermissions && !currentRole) {
      const perms = Object.values(apiPermissions.data.permissions).map((module) => ({
        view: false,
        edit: false,
        module: module.value,
      }));
      setValue('permission', perms);
    }
  }, [apiPermissions, currentRole, setValue]);

  const permissions = methods.watch('permission');

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentRole) {
        await editRole({ id: currentRole.rid, ...data }).unwrap();
      } else {
        await createRole(data).unwrap();
      }
      enqueueSnackbar(currentRole ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.roles.list);
    } catch (error) {
      enqueueSnackbar(error.data.error, { variant: 'error' });
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Stack sx={{ pb: 3 }}>
          <RHFTextField name="name" label="Choose a name" fullWidth />
        </Stack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Permissions</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiPermissions ? (
                Object.values(apiPermissions.data.permissions).map((permission) => (
                  <TableRow key={permission.value}>
                    <TableCell>{permission.title}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={permissions.find((perm) => perm.module === permission.value)?.view}
                        onChange={(_e, checked) => {
                          const index = permissions.findIndex(
                            (perm) => perm.module === permission.value
                          );
                          const newPermissions = [...permissions];
                          newPermissions[index].view = checked;
                          setValue('permission', newPermissions);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={permissions.find((perm) => perm.module === permission.value)?.edit}
                        onChange={(e, checked) => {
                          const index = permissions.findIndex(
                            (perm) => perm.module === permission.value
                          );
                          const newPermissions = [...permissions];
                          newPermissions[index].edit = checked;
                          setValue('permission', newPermissions);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>
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
