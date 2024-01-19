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

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFAutocomplete } from 'src/components/hook-form';
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
    rid: Yup.string().required('Role name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      rid: currentAdmin?.rid || '',
    }),
    [currentAdmin]
  );

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
      await updateRole({ aid: currentAdmin?.aid, rid: data.rid }).unwrap();
      reset();
      enqueueSnackbar(currentAdmin ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.admin.list);
    } catch (error) {
      handleError(error);
    } finally {
      onClose();
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

        <DialogContent sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography>Please select role for this admin?</Typography>
          {rolesData?.data && (
            <RHFAutocomplete
              name="rid"
              label="Role"
              options={rolesData?.data?.map((r) => r.rid) || []}
              getOptionLabel={(option) => {
                const found = rolesData?.data?.find((r) => r.rid === option);
                if (!found) return option;
                return found.rname.toLocaleUpperCase();
              }}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(optionProps, option) => {
                const found = rolesData?.data?.find((r) => r.rid === option);
                if (!found) return null;
                return (
                  <li {...optionProps} key={found.rid}>
                    {found.rname.toLocaleUpperCase()}
                  </li>
                );
              }}
              // options={rolesData?.data?.map((r) => r.rid) || []}
              // getOptionLabel={(option) => {
              //   const found = rolesData?.data?.find((r) => r.rname.toLocaleLowerCase() === option);
              //   if (!found) return option;
              //   return found.rname.toLocaleUpperCase();
              // }}
              // isOptionEqualToValue={(option, value) => option === value}
              // renderOption={(optionProps, option) => {
              //   const found = rolesData?.data?.find((r) => r.rname.toLocaleLowerCase() === option);
              //   if (!found) return null;
              //   return (
              //     <li {...optionProps} key={found.rid}>
              //       {found.rname.toLocaleUpperCase()}
              //     </li>
              //   );
              // }}
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
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default AdminRoleForm;
