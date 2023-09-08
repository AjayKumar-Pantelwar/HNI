'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Dialog, MenuItem, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { RHFSelect } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useRoleAdmin } from 'src/hooks/admin/use-role-admin';
import { investorApi } from 'src/redux/api/investor.api';
import { AssignRMRequest } from 'src/types/investor.types';
import { handleError } from 'src/utils/handle-error';
import * as Yup from 'yup';

type Props = { open: boolean; rm: string; id: string; onClose: () => void };

export const AssignRMDialog = ({ open, rm, onClose, id }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [assignRM] = investorApi.useAssignRMMutation();

  const { data: adminData } = useRoleAdmin('rm');

  const defaultValues = useMemo<AssignRMRequest>(
    () => ({
      irm_id: rm,
      cid: id,
    }),
    [id, rm]
  );

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(
      Yup.object().shape({
        cid: Yup.string().required('Customer ID is required'),
        irm_id: Yup.string().required('RM ID is required'),
      })
    ),
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (values) => {
    try {
      await assignRM(values).unwrap();
      onClose();
      enqueueSnackbar('Updated relationship manager successfully', { variant: 'success' });
    } catch (error) {
      handleError(error);
    }
  });

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack gap={1} p={2}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Assign Relationship Manager
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Please select the relationship manager from the list below:
          </Typography>

          {adminData?.data?.admins && (
            <RHFSelect name="irm_id" label="Relationship Manager">
              {adminData?.data?.admins?.map((admin) => (
                <MenuItem key={admin.aid} value={admin.aid}>
                  {admin.name}
                </MenuItem>
              ))}
            </RHFSelect>
          )}

          <LoadingButton
            sx={{ mt: 2 }}
            type="submit"
            loading={isSubmitting}
            variant="contained"
            size="large"
          >
            Assign
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Dialog>
  );
};
