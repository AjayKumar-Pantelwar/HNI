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
  Model,
  RoundType,
  Sector1,
  Sector2,
  Sector3,
  Tech,
} from 'src/types/deals.types';
import { convertToFD } from 'src/utils/convert-fd';

// ----------------------------------------------------------------------

type Props = {
  currentDeal?: CreateDealRequest;
};

type OptionType = {
  value: string;
  label: string;
};

const MAX_ROUNDS = 1;
const MIN_ROUNDS = 1;

export default function DealsNewEditForm({ currentDeal }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const [createDeal] = dealApi.useCreateDealMutation();

  const NewDealSchema = Yup.object().shape({
    brand_name: Yup.string().required('brand name  is required'),
    company_name: Yup.string().required('company name is required'),
    one_liner: Yup.string().required('one liner is required'),
    description: Yup.string().required('description is required'),
    start_date: Yup.string().required('start date is required'),
    end_date: Yup.string().required('end date is required'),
    closing_soon_date: Yup.string().required('closing soon date is required'),
    sector: Yup.object()
      .shape({
        tech: Yup.array().of(Yup.string()).length(1, 'Tech is required'),
        model: Yup.array().of(Yup.string()).length(1, 'Model is required'),
        sector_1: Yup.array().of(Yup.string()),
        sector_2: Yup.array().of(Yup.string()),
        sector_3: Yup.array().of(Yup.string()),
      })
      .required('sector is required'),
    deal_name: Yup.string().required('deal name is required'),
    deal_aggregation: Yup.object().required('deal aggregation is required'),
    is_deal_of_the_week: Yup.boolean().required('is deal of the week is required'),
    is_deal_trending: Yup.boolean().required('is deal trending is required'),
    round: Yup.array()
      .of(
        Yup.object().shape({
          ask_from_ma: Yup.string(),
          is_active: Yup.boolean(),
          raised_in_perc: Yup.string(),
          min_investment: Yup.string(),
          externally_raised: Yup.string(),
          round_size: Yup.string(),
          valuation: Yup.string(),
          round_type: Yup.string(),
        })
      )
      .min(MIN_ROUNDS, 'round is required')
      .max(MAX_ROUNDS, 'round is required'),
    cover_image: Yup.mixed(),
    logo_link: Yup.mixed(),
  });

  const defaultValues = useMemo<CreateDealRequest>(
    () => ({
      brand_name: currentDeal?.brand_name || '',
      company_name: currentDeal?.company_name || '',
      one_liner: currentDeal?.one_liner || '',
      description: currentDeal?.description || '',
      start_date: currentDeal?.start_date || '',
      end_date: currentDeal?.end_date || '',
      closing_soon_date: currentDeal?.closing_soon_date || '',
      sector: currentDeal?.sector || {
        model: [],
        tech: [],
        sector_1: [],
        sector_2: [],
        sector_3: [],
      },
      deal_name: currentDeal?.deal_name || '',
      deal_aggregation: currentDeal?.deal_aggregation || {
        total_amount_committed: '',
        total_user_committed: '',
        total_user_interest: '',
      },
      is_deal_of_the_week: currentDeal?.is_deal_of_the_week || false,
      is_deal_trending: currentDeal?.is_deal_trending || false,
      round: currentDeal?.round || [],
      cover_image: null,
      logo_link: null,
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

  const rounds = watch('round');

  useEffect(() => {
    if (currentDeal) {
      reset(defaultValues);
    }
  }, [currentDeal, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = convertToFD(data);

      // TEMPORARY CONSOLE.LOG
      formData.forEach((value, key) => console.log({ [key]: value }));

      const response = await createDeal(formData).unwrap();
      reset();
      enqueueSnackbar(currentDeal ? 'Update success' : 'Create success', { variant: 'success' });
      router.push(paths.dashboard.deals.media(response.data.deal_id));
    } catch (error) {
      console.error(error);
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
            <RHFTextField name="description" label="Description" multiline rows={4} />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Controller
                name="start_date"
                control={methods.control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    {...field}
                    format="dd/MM/yyyy"
                    label="Start date"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="end_date"
                control={methods.control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    {...field}
                    format="dd/MM/yyyy"
                    label="End date"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="closing_soon_date"
                control={methods.control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Closing date"
                    {...field}
                    format="dd/MM/yyyy"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />
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
              multiple
              thumbnail
              name="cover_image"
              maxSize={3145728}
              onDrop={handleDrop('cover_image')}
              onRemove={handleRemoveFile}
              onRemoveAll={handleRemoveAllFiles}
              onUpload={() => console.info('ON UPLOAD')}
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
            Enter sectors, tech. model and rounds of the deal
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Secondary Details" />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <Typography variant="h5">Sectors</Typography>
            <RHFMultiSelect
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
          <Stack spacing={3} sx={{ p: 3 }}>
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
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const sectionFour = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Other details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Enter additional details about the deal here
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Basic Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="total_user_interest" label="Total User Interest" />

            <RHFTextField name="total_user_committed" label="Total User Committed" />

            <RHFTextField name="total_amount_committed" label="Total Amount Committed" />

            <Box>
              <RHFSwitch
                name="is_deal_of_the_week"
                label={
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Is deal of the week
                  </Typography>
                }
                sx={{ justifyContent: 'space-between' }}
              />
              <RHFSwitch
                name="is_deal_trending"
                label={
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Is deal trending
                  </Typography>
                }
                sx={{ justifyContent: 'space-between' }}
              />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const sectionFive = (
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

        {sectionThree}

        {sectionFour}

        {sectionFive}
      </Grid>
    </FormProvider>
  );
}
