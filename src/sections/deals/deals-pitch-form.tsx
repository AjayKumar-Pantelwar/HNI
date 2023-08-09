'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
// routes
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
// types
import { Button } from '@mui/material';
import { dealApi } from 'src/redux/api/deal.api';
import { Deal, PitchRequest } from 'src/types/deals.types';

// ----------------------------------------------------------------------

type Props = {
  currentDeal: Deal;
};

export default function DealsPitchForm({ currentDeal }: Props) {
  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const [addPitch] = dealApi.usePitchMutation();

  const NewDealSchema = Yup.object().shape({
    deal_id: Yup.string().required(),
    info: Yup.array()
      .of(Yup.string().required())
      .required()
      .min(2, 'Enter atleast 2 info values')
      .max(3, 'Maximum 3 values allowed'),
    why_shortlist: Yup.array()
      .of(Yup.string().required())
      .required()
      .min(2, 'Enter atleast 2 info values')
      .max(4, 'Maximum 4 values allowed'),
    traction: Yup.array()
      .of(
        Yup.object().shape({
          key: Yup.string().required(),
          value: Yup.string().required(),
        })
      )
      .required()
      .min(2, 'Enter atleast 2 traction')
      .max(5, 'Maximum 5 traction values allowed'),
  });

  const defaultValues = useMemo<PitchRequest>(
    () => ({
      deal_id: currentDeal.deal_id,
      info: currentDeal.pitch?.info || ['', ''],
      why_shortlist: currentDeal.pitch?.why_shortlist || ['', ''],
      traction: currentDeal.pitch?.traction || [
        { key: '', value: '' },
        { key: '', value: '' },
      ],
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
      await addPitch(data).unwrap();
      reset();
      enqueueSnackbar(currentDeal ? 'Update success' : 'Create success', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error?.error || error?.message || 'Something went wrong', {
        variant: 'error',
      });
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
          {!mdUp && <CardHeader title="Pitch Info" />}
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
          <Stack spacing={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Why Shortlist?</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newShortlist = [...(shortlist || [])];
                  newShortlist.push('');
                  setValue('why_shortlist', newShortlist);
                }}
              >
                + Add
              </Button>
            </Box>
            {shortlist?.map((_, index) => (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'start' }} key={index}>
                <RHFTextField name={`why_shortlist.${index}`} label="Shortlist" />
                <Button
                  color="error"
                  onClick={() => {
                    const newShortlist = [...(shortlist || [])];
                    newShortlist.splice(index, 1);
                    setValue('why_shortlist', newShortlist);
                  }}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Stack>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Traction</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newTraction = [...(traction || [])];
                  newTraction.push({ key: '', value: '' });
                  setValue('traction', newTraction);
                }}
              >
                + Add
              </Button>
            </Box>
            {traction?.map((_, index) => (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'start' }} key={index}>
                <RHFTextField name={`traction.${index}.key`} label="Key" />
                <RHFTextField name={`traction.${index}.value`} label="Value" />
                <Button
                  color="error"
                  onClick={() => {
                    const newTraction = [...(traction || [])];
                    newTraction.splice(index, 1);
                    setValue('traction', newTraction);
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
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          {!currentDeal ? 'Create Deal' : 'Save Pitch Info'}
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
