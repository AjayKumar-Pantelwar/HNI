'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'src/routes/hook';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useSnackbar } from 'src/components/snackbar';
import { useResponsive } from 'src/hooks/use-responsive';
import { dealApi } from 'src/redux/api/deal.api';
import { paths } from 'src/routes/paths';

import { DDReportSchema, Deal } from 'src/types/deals.types';
import { handleError } from 'src/utils/handle-error';

type Props = {
  currentDeal: Deal;
};
const DealDDReportForm = ({ currentDeal }: Props) => {
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [updateDDReport] = dealApi.useUpdateDDReportMutation();

  const defaultValues = useMemo(
    () => ({
      dd_report_link: currentDeal?.dd_report || '',
    }),
    [currentDeal]
  );

  const methods = useForm({
    resolver: yupResolver(DDReportSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentDeal) {
      reset(defaultValues);
    }
  }, [currentDeal, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateDDReport({ deal_id: currentDeal.deal_id, ...data }).unwrap();
      reset();
      enqueueSnackbar('DD Report updated successfully', { variant: 'success' });
      router.push(paths.dashboard.deals.list);
    } catch (error) {
      handleError(error);
    }
  });

  const sectionOne = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            DD Report Link
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Enter the DD Report link here
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Dataroom Links" />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="dd_report_link" label="DD Report Link" />
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const lastSection = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid
        xs={12}
        md={8}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
      >
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          Update DD Report
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {sectionOne}
        {lastSection}
      </Grid>
    </FormProvider>
  );
};

export default DealDDReportForm;
