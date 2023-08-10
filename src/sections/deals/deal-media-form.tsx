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
import { BasicInfoMediaRequest, Deal } from 'src/types/deals.types';
import { handleError } from 'src/utils/handle-error';

// ----------------------------------------------------------------------

type Props = {
  currentDeal: Deal;
};

export default function DealsMediaForm({ currentDeal }: Props) {
  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const [addMedia] = dealApi.useBasicInfoMediaMutation();

  const NewMediaSchema = Yup.object().shape({
    media: Yup.array()
      .of(
        Yup.object({
          link: Yup.string(),
          description: Yup.string().required(),
          thumbnail_link: Yup.string(),
          type: Yup.string().required(),
          priority: Yup.number().required(),
          is_published: Yup.string().required(),
        })
      )
      .required(),
  });

  const defaultValues = useMemo<BasicInfoMediaRequest>(
    () => ({
      media: currentDeal.media || [
        {
          description: '',
          is_published: 'true',
          link: '',
          priority: 0,
          thumbnail_link: '',
          type: 'image',
        },
      ],
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

  const media = watch('media');

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
        formData.append(key, key === 'media' ? JSON.stringify(data[key]) : data[key]);
      });

      await addMedia({ id: currentDeal.deal_id, body: formData }).unwrap();
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
            Media Info
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Enter media information
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Media" />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Media</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newMedia = [...(media || [])];
                  newMedia.unshift({
                    description: '',
                    is_published: 'true',
                    link: '',
                    priority: media.length,
                    thumbnail_link: '',
                    type: 'image',
                  });
                  setValue('media', newMedia);
                }}
              >
                + Add
              </Button>
            </Box>
            {media?.map((_, index) => (
              <Stack key={index}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'start' }}>
                  <RHFTextField name={`media.${index}.description`} label="Description" />
                  <RHFTextField name={`media.${index}.priority`} type="number" label="Priorty" />
                  <RHFSwitch name={`media.${index}.is_published`} label="Publish" />
                  <Button
                    color="error"
                    onClick={() => {
                      const newMedia = [...(media || [])];
                      newMedia.splice(index, 1);
                      setValue('media', newMedia);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
                <RHFUpload
                  name={`media_${index}`}
                  maxSize={3145728}
                  onDrop={(files) => {
                    const newFiles = files.map((file) =>
                      Object.assign(file, {
                        preview: URL.createObjectURL(file),
                      })
                    );
                    // @ts-ignore
                    setValue(`media_${index}`, newFiles[0], { shouldValidate: true });
                  }}
                  onRemove={(inputFile) =>
                    setValue(
                      // @ts-ignore
                      `media_${index}`,
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
