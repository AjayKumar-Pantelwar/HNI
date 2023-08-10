'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
// @mui

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
  RHFTextField,
  RHFUpload,
  RHFUploadAvatar,
  RHFUploadBox,
} from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hook';
// types
import { capitalize } from 'lodash';
import RHFDateField from 'src/components/hook-form/rhf-date-field';
import { dealApi } from 'src/redux/api/deal.api';
import {
  CreateDealRequest,
  CreateDealSchema,
  Deal,
  Model,
  Sector1,
  Sector2,
  Sector3,
  Tech,
} from 'src/types/deals.types';
import { convertToFD } from 'src/utils/convert-fd';
import { convertUrlToFile } from 'src/utils/convert-url-to-file';
import { fDate } from 'src/utils/format-time';
import { handleError } from 'src/utils/handle-error';

// ----------------------------------------------------------------------

type Props = {
  currentDeal?: Deal;
};

export default function DealsNewEditForm({ currentDeal }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const [createDeal] = dealApi.useCreateDealMutation();
  const [editDeal] = dealApi.useEditDealMutation();

  const defaultValues = useMemo<CreateDealRequest>(
    () => ({
      brand_name: currentDeal?.brand_name || '',
      company_name: currentDeal?.company_name || '',
      one_liner: currentDeal?.one_liner || '',
      description: currentDeal?.description || '',
      start_date: currentDeal?.start_date ? fDate(currentDeal.start_date) : '',
      end_date: currentDeal?.end_date ? fDate(currentDeal.end_date) : '',
      closing_soon_date: currentDeal?.closing_soon_date ? fDate(currentDeal.closing_soon_date) : '',
      sector: currentDeal?.sector || {
        model: [],
        tech: [],
        sector_1: [],
        sector_2: [],
        sector_3: [],
      },
      deal_name: currentDeal?.deal_name || '',
      cover_image: null,
      logo_link: null,
      pitch_deck: null,
    }),
    [currentDeal]
  );

  const methods = useForm({
    resolver: yupResolver<CreateDealRequest>(CreateDealSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const description = watch('description');

  useEffect(() => {
    if (currentDeal) {
      reset(defaultValues);
      convertUrlToFile(currentDeal.cover_image)
        .then((file) => {
          setValue('cover_image', file);
        })
        .catch((err) => handleError(err, true));
      convertUrlToFile(currentDeal.logo_link)
        .then((file) => {
          setValue('logo_link', file);
        })
        .catch((err) => handleError(err, true));

      convertUrlToFile(currentDeal.pitch_deck)
        .then((file) => {
          setValue('pitch_deck', file);
        })
        .catch((err) => handleError(err, true));
    }
  }, [currentDeal, defaultValues, reset, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = convertToFD(data);
      if (currentDeal) {
        await editDeal({ id: currentDeal.deal_id, body: formData }).unwrap();
      } else {
        await createDeal(formData).unwrap();
      }
      reset();
      enqueueSnackbar(currentDeal ? 'Update success' : 'Create success', { variant: 'success' });
      router.push(paths.dashboard.deals.list);
    } catch (error) {
      handleError(error);
    }
  });

  const handleDrop = useCallback(
    (key: keyof CreateDealRequest) => (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue(key, newFiles[0], { shouldValidate: true });
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      setValue('cover_image', null);
    },
    [setValue]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('cover_image', null);
  }, [setValue]);

  const sectionOne = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Basic Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Enter basic details of the deal
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Basic Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="brand_name" label="Brand Name" />

            <RHFTextField name="company_name" label="Company Name" />

            <RHFTextField name="deal_name" label="Deal Name" />
            <RHFTextField name="one_liner" label="One Liner" />
            <RHFTextField
              name="description"
              label="Description"
              multiline
              rows={4}
              helperText={`${description.length} / 250`}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <RHFDateField name="start_date" label="Start Date" />
              <RHFDateField name="closing_soon_date" label="Closing Soon Date" />
              <RHFDateField name="end_date" label="End Date" />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const sectionTwo = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Images
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Upload cover image and logo of the deal
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Images" />}

          <Stack spacing={1.5} p={3}>
            <RHFUpload
              thumbnail
              name="cover_image"
              maxSize={3145728}
              onDrop={handleDrop('cover_image')}
              onRemove={handleRemoveFile}
              onRemoveAll={handleRemoveAllFiles}
            />

            <Box sx={{ pt: 10, pb: 10 }}>
              <RHFUploadAvatar
                name="logo_link"
                maxSize={3145728}
                onDrop={handleDrop('logo_link')}
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
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const sectionThree = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Secondary Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Enter sectors, tech and model of the deal
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Secondary Details" />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <Typography variant="h5">Sectors</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <RHFMultiSelect
                fullWidth
                name="sector.sector_1"
                label="Sector 1"
                onlyOne
                options={Object.values(Sector1).map((value) => ({
                  value,
                  label: value.split('_').map(capitalize).join(' '),
                }))}
                chip
                checkbox
              />
              <RHFMultiSelect
                fullWidth
                name="sector.sector_2"
                label="Sector 2"
                onlyOne
                options={Object.values(Sector2).map((value) => ({
                  value,
                  label: value.split('_').map(capitalize).join(' '),
                }))}
                chip
                checkbox
              />
              <RHFMultiSelect
                fullWidth
                name="sector.sector_3"
                label="Sector 3"
                onlyOne
                options={Object.values(Sector3).map((value) => ({
                  value,
                  label: value.split('_').map(capitalize).join(' '),
                }))}
                chip
                checkbox
              />
            </Box>
            <RHFMultiSelect
              name="sector.tech"
              label="Tech"
              onlyOne
              options={Object.values(Tech).map((value) => ({
                value,
                label: value.split('_').map(capitalize).join(' '),
              }))}
              chip
              checkbox
            />
            <RHFMultiSelect
              name="sector.model"
              label="Model"
              onlyOne
              options={Object.values(Model).map((value) => ({
                value,
                label: value.split('_').map(capitalize).join(' '),
              }))}
              chip
              checkbox
            />
          </Stack>
          {/* <Stack spacing={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Rounds</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newRounds = [...(rounds || [])];
                  newRounds.push({});
                  setValue('round', newRounds);
                }}
              >
                + Add
              </Button>
            </Box>
            {rounds?.map((round, index) => (
              <Stack key={index} gap={2}>
                <Typography>Round {index + 1}</Typography>
                <RHFTextField name={`round.${index}.ask_from_ma`} label="Ask from MA" />
                <RHFTextField name={`round.${index}.raised_in_perc`} label="Raised in %" />
                <RHFTextField name={`round.${index}.min_investment`} label="Min Investment" />
                <RHFTextField name={`round.${index}.externally_raised`} label="Externally Raised" />
                <RHFTextField name={`round.${index}.round_size`} label="Round Size" />
                <RHFTextField name={`round.${index}.valuation`} label="Valuation" />
                <RHFSelect name={`round.${index}.round_type`} label="Round Type">
                  {Object.values(RoundType).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value.split('_').map(capitalize).join(' ')}
                    </MenuItem>
                  ))}
                </RHFSelect>
                <RHFSwitch name={`round.${index}.is_active`} label="Is Active" />
              </Stack>
            ))}
          </Stack> */}
        </Card>
      </Grid>
    </>
  );

  const sectionFour = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Pitch Deck
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Upload the pitch deck pdf here
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Pitch Deck" />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFUploadBox
              accept={{
                'application/*': ['.pdf'],
              }}
              name="pitch_deck"
              sx={{ width: '100%' }}
            />
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

        {sectionThree}

        {sectionFour}

        {lastSection}
      </Grid>
    </FormProvider>
  );
}
