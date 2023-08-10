import { useMemo } from 'react';

import { Box, Card, CardHeader, Grid, MenuItem, Stack, Typography } from '@mui/material';

import { dealApi } from 'src/redux/api/deal.api';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import RHFDateField from 'src/components/hook-form/rhf-date-field';
import { useResponsive } from 'src/hooks/use-responsive';
import { CompanyInfoRequest, Deal } from 'src/types/deals.types';
import { fDate } from 'src/utils/format-time';
import * as Yup from 'yup';

interface Props {
  deal?: Deal;
}

const DealAccountInfoForm = ({ deal }: Props) => {
  const mdUp = useResponsive('up', 'md');

  const [updateCompanyInfo] = dealApi.useCompanyInfoMutation();

  const defaultValues = useMemo<CompanyInfoRequest>(
    () => ({
      deal_id: deal?.deal_id || '',
      form: deal?.company_info?.form || '',
      incorporated_date: deal?.company_info?.incorporated_date?.seconds
        ? fDate(new Date(deal.company_info.incorporated_date.seconds * 1000))
        : '',
      location: {
        state: deal?.company_info?.location?.state || '',
        city: deal?.company_info?.location?.city || '',
        country: deal?.company_info?.location?.country || '',
      },
      legal_name: deal?.company_info?.legal_name || '',
      website_link: deal?.company_info?.website_link || '',
    }),
    [deal]
  );

  const AccountInfoSchema = Yup.object().shape({
    deal_id: Yup.string().required('id is required'),
    form: Yup.string().required('form name is required'),
    incorporated_date: Yup.string().required('OIncorporated Date name is required'),
    location: Yup.object().shape({
      state: Yup.string().required('State name is required'),
      city: Yup.string().required('City name is required'),
      country: Yup.string().required('Country name is required'),
    }),
    legal_name: Yup.string().required('Legal name is required'),
    website_link: Yup.string().required('Website link is required'),
  });

  const methods = useForm({
    resolver: yupResolver(AccountInfoSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = methods.watch();
  console.log(values);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateCompanyInfo(data).unwrap();
      reset();
      enqueueSnackbar(deal ? 'Update success' : 'Create success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  });

  const sectionOne = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Company Info
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Enter company information
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Company Info" />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack gap={2}>
              <RHFTextField name="legal_name" label="Legal Name" />
              <RHFSelect name="form" label="Form">
                <MenuItem value="private">Private</MenuItem>
                <MenuItem value="public">Public</MenuItem>
              </RHFSelect>
              <RHFDateField name="incorporated_date" label="Incorporated Date" />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <RHFTextField name="location.state" label="State" />
                <RHFTextField name="location.city" label="City" />
                <RHFTextField name="location.country" label="Country" />
              </Box>
              <RHFTextField name="website_link" label="Website Link" />
            </Stack>
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
          Save Changes
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} rowGap={3} sx={{ m: 0, width: 'unset' }}>
        {sectionOne}
        {sectionTwo}
      </Grid>
    </FormProvider>
  );
};

export default DealAccountInfoForm;
