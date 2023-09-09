'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { useResponsive } from 'src/hooks/use-responsive';
import { dealApi } from 'src/redux/api/deal.api';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { DataroomSchema, Deal } from 'src/types/deals.types';
import { handleError } from 'src/utils/handle-error';

type Props = {
  currentDeal: Deal;
};

export default function DealDataroomForm({ currentDeal }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const [updateDataroom] = dealApi.useDataroomMutation();

  const defaultValues = useMemo(
    () => ({
      pitch_pdf_link: currentDeal?.dataroom?.pitch_pdf_link || '',
      document_link: currentDeal?.dataroom?.document_link || '',
    }),
    [currentDeal]
  );

  const methods = useForm({
    resolver: yupResolver(DataroomSchema),
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
      await updateDataroom({ id: currentDeal.deal_id, ...data }).unwrap();
      reset();
      enqueueSnackbar('Update success', { variant: 'success' });
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
            Dataroom Links
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Enter links here
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Dataroom Links" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="pitch_pdf_link" label="Pitch PDF Link" />
            <RHFTextField name="document_link" label="Document Link" />
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
          Update Deal
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
}
