import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'src/components/snackbar';

import { FormProvider, useForm } from 'react-hook-form';
import { RHFAutocomplete } from 'src/components/hook-form';
import { adminApi } from 'src/redux/api/admin.api';
import { paths } from 'src/routes/paths';
import { Admin } from 'src/types/admin.types';
import { GetRolesResponse } from 'src/types/role.types';
import { handleError } from 'src/utils/handle-error';
import * as Yup from 'yup';

interface Props {
  currentAdmin: Admin;
  open: boolean;
  onClose: () => void;
  roles: GetRolesResponse | undefined;
}

const AdminRoleForm = (props: Props) => {
  const { currentAdmin, onClose, open, roles: rolesData } = props;

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [updateRole] = adminApi.useUpdateRoleMutation();

  const UpdateAdminRoleSchema = Yup.object().shape({
    rid: Yup.string().required('Role is required'),
  });

  const defaultValues = {
    rid: currentAdmin?.rid || '',
  };

  //   const currentRole = rolesData?.data?.find((role) => role.rid === currentAdmin?.rid);

  const methods = useForm({
    resolver: yupResolver(UpdateAdminRoleSchema),
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
      await updateRole({ ...data, aid: currentAdmin?.aid }).unwrap();
      reset();
      enqueueSnackbar(currentAdmin ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.admin.list);
    } catch (error) {
      handleError(error);
    }
  });

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
        <DialogTitle>Change Admin Role</DialogTitle>

        <DialogContent>
          <Typography>Please select role for this admin?</Typography>
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
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            onClick={onSubmit}
            variant="contained"
            loading={isSubmitting}
          >
            {currentAdmin?.is_blocked ? 'Unblock' : 'Block'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default AdminRoleForm;
