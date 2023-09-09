'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Dialog, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { RHFMultiSelect } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useRoleAdmin } from 'src/hooks/admin/use-role-admin';
import { dealApi } from 'src/redux/api/deal.api';
import { AssignDMRequest } from 'src/types/deals.types';
import { handleError } from 'src/utils/handle-error';
import * as Yup from 'yup';

type Props = { open: boolean; dealManagers: string[] | null; id: string; onClose: () => void };

export const AssignDMDialog = ({ open, dealManagers, onClose, id }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [assignDM] = dealApi.useAssignDMMutation();

  const { data: adminData } = useRoleAdmin('deal_manager');

  const defaultValues = useMemo<AssignDMRequest>(
    () => ({
      dm_id: dealManagers || [],
      deal_id: id,
    }),
    [id, dealManagers]
  );

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(
      Yup.object().shape({
        deal_id: Yup.string().required('Deal ID is required'),
        dm_id: Yup.array()
          .min(1, 'Please select atleast one deal manager')
          .of(Yup.string().required())
          .required('Please select atleast one deal manager'),
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
      await assignDM(values).unwrap();
      onClose();
      enqueueSnackbar('Updated deal maanger successfully', { variant: 'success' });
    } catch (error) {
      handleError(error);
    }
  });

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack gap={1} p={2}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Assign Deal Manager
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Please select the deal manager from the list below:
          </Typography>

          {adminData?.data?.admins && (
            <RHFMultiSelect
              name="dm_id"
              onlyOne
              label="Deal Manager"
              options={adminData?.data?.admins?.map((admin) => ({
                value: admin.aid,
                label: admin.name,
              }))}
              chip
              checkbox
            />
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
