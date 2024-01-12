import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// _mock
// types
// assets
// components
import {
  Checkbox,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { roleApi } from 'src/redux/api/role.api';
import { EditRoleRequest, Module, Role } from 'src/types/role.types';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentRole?: Role;
};

export default function RolesQuickEditForm({ currentRole, open, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const [editRole] = roleApi.useEditRoleMutation();

  const RoleSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    id: Yup.string().required('ID is required'),
    permission: Yup.array().required('Permission is required'),
  });

  const defaultValues = useMemo<EditRoleRequest>(
    () => ({
      id: currentRole?.rid || '',
      name: currentRole?.name || '',
      permission:
        currentRole?.permission ||
        Object.values(Module).map((module) => ({ module, view: false, edit: false })),
    }),
    [currentRole]
  );
  const methods = useForm({
    resolver: yupResolver(RoleSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await editRole(data).unwrap();
      reset();
      onClose();
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  });

  const permissions = methods.watch('permission');

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Edit Role</DialogTitle>

        <DialogContent>
          <Stack sx={{ py: 3 }}>
            <RHFTextField name="name" label="Name" fullWidth />
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
              {Object.values(Module).map((key) => (
                <TableRow key={key}>
                  <TableCell>{key.split('_').join(' ').toUpperCase()}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={permissions.find((perm) => perm.module === key)?.view}
                      onChange={(e, checked) => {
                        const index = permissions.findIndex((perm) => perm.module === key);
                        const newPermissions = [...permissions];
                        newPermissions[index].view = checked;
                        setValue('permission', newPermissions);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={permissions.find((perm) => perm.module === key)?.edit}
                      onChange={(e, checked) => {
                        const index = permissions.findIndex((perm) => perm.module === key);
                        const newPermissions = [...permissions];
                        newPermissions[index].edit = checked;
                        setValue('permission', newPermissions);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
