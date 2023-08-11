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
import { handleError } from 'src/utils/handle-error';

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
    project_revenue_graph_data: Yup.array()
      .of(
        Yup.object().shape({
          year: Yup.string().required(),
          revenue_in_inr: Yup.string().required(),
        })
      )
      .required()
      .length(3, 'Graph data must be of 3 years'),
    usage_of_funds_data: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required(),
          funds_in_perc: Yup.string().required(),
        })
      )
      .required()
      .min(1, 'Enter atleast 1 entry')
      .max(4, 'Usage of funds cannot exceed 4 values'),
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
      project_revenue_graph_data: currentDeal?.project_revenue_graph_data || [],
      usage_of_funds_data: currentDeal?.usage_of_funds_data || [],
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
  const usage_of_funds_data = watch('usage_of_funds_data');
  const project_revenue_graph_data = watch('project_revenue_graph_data');

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
      handleError(error);
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
          <Stack spacing={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Project Revenue</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newProjectRevenueGraphData = [...(project_revenue_graph_data || [])];
                  newProjectRevenueGraphData.push({ year: '', revenue_in_inr: '' });
                  setValue('project_revenue_graph_data', newProjectRevenueGraphData);
                }}
              >
                + Add
              </Button>
            </Box>
            {project_revenue_graph_data?.map((_, index) => (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'start' }} key={index}>
                <RHFTextField name={`project_revenue_graph_data.${index}.year`} label="Year" />
                <RHFTextField
                  name={`project_revenue_graph_data.${index}.revenue_in_inr`}
                  label="Revenue(in INR)"
                />
                <Button
                  color="error"
                  onClick={() => {
                    const newProjectRevenueGraphData = [...(project_revenue_graph_data || [])];
                    newProjectRevenueGraphData.splice(index, 1);
                    setValue('project_revenue_graph_data', newProjectRevenueGraphData);
                  }}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Stack>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Usage of funds data</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newData = [...(usage_of_funds_data || [])];
                  newData.push({ title: '', funds_in_perc: '' });
                  setValue('usage_of_funds_data', newData);
                }}
              >
                + Add
              </Button>
            </Box>
            {usage_of_funds_data?.map((_, index) => (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'start' }} key={index}>
                <RHFTextField name={`usage_of_funds_data.${index}.title`} label="Title" />
                <RHFTextField
                  name={`usage_of_funds_data.${index}.funds_in_perc`}
                  label="Funds in percentage"
                />
                <Button
                  color="error"
                  onClick={() => {
                    const newData = [...(usage_of_funds_data || [])];
                    newData.splice(index, 1);
                    setValue('usage_of_funds_data', newData);
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
