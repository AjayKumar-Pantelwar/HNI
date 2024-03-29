'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { EditDialog } from 'src/components/edit-dialog';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { useResponsive } from 'src/hooks/use-responsive';
import { dealApi } from 'src/redux/api/deal.api';
import { Deal, HighlightsRequest } from 'src/types/deals.types';
import { convertUrlToFile } from 'src/utils/convert-url-to-file';
import { handleError } from 'src/utils/handle-error';
import * as Yup from 'yup';

type Props = {
  currentDeal: Deal;
};

export default function DealHighlightForm({ currentDeal }: Props) {
  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const [addHighlights] = dealApi.useHighlightsMutation();

  const [logoLinkDetails, setLogoLinkDetails] = React.useState<File>();

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
      cover_image: null,
      logo_link: null,
      pitch_deck: null,
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
      currentDeal.pitch?.highlights?.forEach((highlight, index) => {
        convertUrlToFile(highlight.icon_link)
          .then((file) => {
            // @ts-ignore
            setValue(`icon_link_${index}`, file);
          })
          .catch(handleError);
      });
    }
  }, [currentDeal, defaultValues, reset, setValue]);

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
      handleError(error);
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
                  newHighlights.push({
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
                  <RHFTextField name={`highlights.${index}.title`} label="Title" />
                  <RHFTextField name={`highlights.${index}.description`} label="Description" />
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
                <RHFUploadAvatar
                  name={`icon_link_${index}`}
                  maxSize={3145728}
                  onDrop={(files) => {
                    const newFiles = files.map((file) =>
                      Object.assign(file, {
                        preview: URL.createObjectURL(file),
                      })
                    );
                    setLogoLinkDetails(newFiles[0]);
                  }}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 3,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.disabled',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                    </Typography>
                  }
                />
                {logoLinkDetails && (
                  <EditDialog
                    open
                    base64={URL.createObjectURL(logoLinkDetails)}
                    filename={logoLinkDetails.name}
                    onChange={(file) => {
                      if (file === null) return;
                      Object.assign(file, {
                        preview: URL.createObjectURL(file),
                      });
                      // @ts-ignore
                      setValue(`icon_link_${index}`, file);
                    }}
                    onClose={() => setLogoLinkDetails(undefined)}
                    aspectRatio="1 / 1"
                  />
                )}
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
