import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
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
  Checkbox,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  TableBody,
} from '@mui/material';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { roleApi } from 'src/redux/api/role.api';
import { CreateRoleRequest, Module, Permission, Role } from 'src/types/role.types';
import { deflate } from 'zlib';

// ----------------------------------------------------------------------

type Props = {
  currentUser?: Role;
};

export default function RolesNewEditForm({ currentUser }: Props) {
  const router = useRouter();

  const [createRole] = roleApi.useCreateRoleMutation();

  const { enqueueSnackbar } = useSnackbar();

  const { data: apiPermissions } = roleApi.usePermissionsQuery();

  const RolesSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    permission: Yup.array().required('Permission is required'),
  });

  const defaultValues = useMemo<CreateRoleRequest>(
    () => ({
      name: currentUser?.name || '',
      permission:
        currentUser?.permission ||
        (apiPermissions
          ? Object.values(apiPermissions.data.permissions).map((module) => ({
              view: false,
              edit: false,
              module: module.value,
            }))
          : []),
    }),
    [currentUser, apiPermissions]
  );

  const methods = useForm({
    resolver: yupResolver(RolesSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    getValues,
  } = methods;

  const permissions = methods.watch('permission');

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createRole(data).unwrap();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
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
                Object.values(apiPermissions.data.permissions).map((permission) => {
                  console.log(permission.value);
                  return (
                    <TableRow key={permission.value}>
                      <TableCell>{permission.title}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={
                            permissions.find((perm) => perm.module === permission.value)?.view
                          }
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
                          checked={
                            permissions.find((perm) => perm.module === permission.value)?.edit
                          }
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
                  );
                })
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
            {!currentUser ? 'Create Role' : 'Save Changes'}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
