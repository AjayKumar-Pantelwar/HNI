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
import FormProvider, { RHFSwitch, RHFTextField, RHFUpload } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
// types
import { Button } from '@mui/material';
import { dealApi } from 'src/redux/api/deal.api';
import {
  BasicInfoMediaRequest,
  Deal,
  HighlightsRequest,
  PitchRequest,
} from 'src/types/deals.types';
import { convertToFD } from 'src/utils/convert-fd';

// ----------------------------------------------------------------------

type Props = {
  currentDeal: Deal;
};

export default function DealHighlightForm({ currentDeal }: Props) {
  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const [addHighlights] = dealApi.useHighlightsMutation();

  const NewMediaSchema = Yup.object().shape({
    highlights: Yup.array()
      .of(
        Yup.object({
          title: Yup.string().required(),
          description: Yup.string().required(),
        })
      )
      .required(),
  });

  const defaultValues = useMemo<HighlightsRequest>(
    () => ({
      highlights: currentDeal.pitch?.highlights || [{ description: '', title: '' }],
    }),
    [currentDeal]
  );

  const methods = useForm({
    resolver: yupResolver(NewMediaSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const highlights = watch('highlights');

  useEffect(() => {
    if (currentDeal) {
      reset(defaultValues);
    }
  }, [currentDeal, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        // @ts-ignore
        formData.append(key, key === 'highlights' ? JSON.stringify(data[key]) : data[key]);
      });

      await addHighlights({ id: currentDeal.deal_id, body: formData }).unwrap();
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
            Highlights
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Enter highlights information here
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Highlights" />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Highlights</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newHighlights = [...(highlights || [])];
                  newHighlights.unshift({
                    description: '',
                    title: '',
                  });
                  setValue('highlights', newHighlights);
                }}
              >
                + Add
              </Button>
            </Box>
            {highlights?.map((_, index) => (
              <Stack key={index}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'start' }}>
                  <RHFTextField name={`highlights.${index}.description`} label="Description" />
                  <RHFTextField name={`highlights.${index}.title`} label="Title" />
                  <Button
                    color="error"
                    onClick={() => {
                      const newHighlights = [...(highlights || [])];
                      newHighlights.splice(index, 1);
                      setValue('highlights', newHighlights);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
                <RHFUpload
                  name={`icon_link_${index}`}
                  maxSize={3145728}
                  onDrop={(files) => {
                    const newFiles = files.map((file) =>
                      Object.assign(file, {
                        preview: URL.createObjectURL(file),
                      })
                    );
                    // @ts-ignore
                    setValue(`icon_link_${index}`, newFiles[0], { shouldValidate: true });
                  }}
                  onRemove={(inputFile) =>
                    setValue(
                      // @ts-ignore
                      `icon_link_${index}`,
                      undefined,
                      { shouldValidate: true }
                    )
                  }
                />
              </Stack>
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
