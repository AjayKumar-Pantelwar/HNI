'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Dialog, MenuItem, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { RHFSelect } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { constantApi } from 'src/redux/api/constant.api';
import { dealApi } from 'src/redux/api/deal.api';
import { DealStageRequest } from 'src/types/deals.types';
import { handleError } from 'src/utils/handle-error';
import * as Yup from 'yup';

type Props = { open: boolean; stage: string; id: string; onClose: () => void };

export const DealStageDialog = ({ open, stage, onClose, id }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [updateStage] = dealApi.useDealStageMutation();

  const { data } = constantApi.useConstantsQuery();

  const defaultValues = useMemo<DealStageRequest>(
    () => ({
      deal_id: id,
      stage,
    }),
    [id, stage]
  );

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(
      Yup.object().shape({
        deal_id: Yup.string().required('Deal ID is required'),
        stage: Yup.string().required('Stage is required'),
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
      await updateStage(values).unwrap();
      onClose();
      enqueueSnackbar('Updated deal stage successfully', { variant: 'success' });
    } catch (error) {
      handleError(error);
    }
  });

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack gap={1} p={2}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Update Deal Stage
          </Typography>
          <Typography sx={{ mb: 2 }}>Please select one of the deal stages below:</Typography>

          {data?.data?.stages && (
            <RHFSelect name="stage" label="Stage">
              {Object.values(data?.data?.stages).map((st) => (
                <MenuItem key={st.value} value={st.value}>
                  {st.label}
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
            Update
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Dialog>
  );
};
