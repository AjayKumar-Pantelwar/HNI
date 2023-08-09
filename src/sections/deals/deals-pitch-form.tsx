'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
// components
import FormProvider, {
  RHFMultiSelect,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUpload,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hook';
// types
import { Button, MenuItem } from '@mui/material';
import { capitalize } from 'lodash';
import { dealApi } from 'src/redux/api/deal.api';
import {
  CreateDealRequest,
  Deal,
  Model,
  PitchRequest,
  RoundType,
  Sector1,
  Sector2,
  Sector3,
  Tech,
} from 'src/types/deals.types';
import { convertToFD } from 'src/utils/convert-fd';
import { fDate, pDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  currentDeal: Deal;
};

export default function DealsPitchForm({ currentDeal }: Props) {
  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const [addPitch] = dealApi.usePitchMutation();

  const NewDealSchema = Yup.object().shape({
    info: Yup.array().of(Yup.string()).required(),
    why_shortlist: Yup.array().of(Yup.string()).required(),
    traction: Yup.array()
      .of(
        Yup.object().shape({
          key: Yup.string(),
          value: Yup.string(),
        })
      )
      .required(),
  });

  const defaultValues = useMemo<PitchRequest>(
    () => ({
      deal_id: currentDeal.deal_id,
      info: currentDeal.pitch?.info || [],
      why_shortlist: currentDeal.pitch?.why_shortlist || [],
      traction: currentDeal.pitch?.traction || [],
    }),
    [currentDeal]
  );

  const methods = useForm({
    resolver: yupResolver(NewDealSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const info = watch('info');
  const shortlist = watch('why_shortlist');
  const traction = watch('traction');

  useEffect(() => {
    if (currentDeal) {
      reset(defaultValues);
    }
  }, [currentDeal, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await addPitch(data).unwrap();
      reset();
      enqueueSnackbar(currentDeal ? 'Update success' : 'Create success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  });

  const sectionOne = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Pitch Info
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Enter basic pitch information
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Basic Details" />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Info</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newInfo = [...(info || [])];
                  newInfo.push('');
                  setValue('info', newInfo);
                }}
              >
                + Add
              </Button>
            </Box>
            {info?.map((_, index) => (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'start' }} key={index}>
                <RHFTextField name={`info.${index}`} label="Info" />
                <Button
                  color="error"
                  onClick={() => {
                    const newInfo = [...(info || [])];
                    newInfo.splice(index, 1);
                    setValue('info', newInfo);
                  }}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const sectionTwo = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          {!currentDeal ? 'Create Deal' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {sectionOne}

        {sectionTwo}
      </Grid>
    </FormProvider>
  );
}
