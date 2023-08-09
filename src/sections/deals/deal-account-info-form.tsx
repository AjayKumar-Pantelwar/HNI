import React, { useMemo, useState } from 'react';

import { Box, Button, Container, Stack } from '@mui/material';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import Iconify from 'src/components/iconify/iconify';
import { useSettingsContext } from 'src/components/settings';

import { dealApi } from 'src/redux/api/deal.api';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hook';

import FormProvider, { RHFTextField } from 'src/components/hook-form';
import * as Yup from 'yup';
import { CompanyInfo, CompanyInfoRequest } from 'src/types/deals.types';
import { fDate, pDate } from 'src/utils/format-time';
import { yupResolver } from '@hookform/resolvers/yup';
import { convertToFD } from 'src/utils/convert-fd';
import { enqueueSnackbar } from 'notistack';
import { DatePicker } from '@mui/x-date-pickers';
import LoadingButton from '@mui/lab/LoadingButton';
import { Controller, useForm } from 'react-hook-form';

interface Props {
  id: string;
  companyInfo: CompanyInfo;
}

const DealAccountInfoForm = (props: Props) => {
  const { companyInfo, id } = props;
  const [updateCompanyInfo] = dealApi.useCompanyInfoMutation();
  const [edit, setEdit] = useState(false);

  const defaultValues = useMemo<CompanyInfoRequest>(
    () => ({
      deal_id: id,
      form: companyInfo?.form || '',
      incorporated_date: fDate(
        new Date((companyInfo?.incorporated_date?.seconds as number) || new Date().getTime())
      ),
      location: {
        state: companyInfo?.location.state || '',
        city: companyInfo?.location.city || '',
        country: companyInfo?.location.country || '',
      },
      legal_name: companyInfo?.legal_name || '',
      website_link: companyInfo?.website_link || '',
    }),
    [companyInfo, id]
  );

  const AccountInfoSchema = Yup.object().shape({
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
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      //   const formData = convertToFD(data);

      // TEMPORARY CONSOLE.LOG
      //   formData.forEach((value, key) => console.log({ [key]: value }));

      const response = await updateCompanyInfo({ deal_id: id, ...data }).unwrap();
      console.log(response);
      reset();
      // enqueueSnackbar(currentDeal ? 'Update success' : 'Create success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack gap={2} sx={{ maxWidth: '600px' }}>
        <RHFTextField name="form" label="Form" disabled={!edit} />
        <Box sx={{ display: 'flex', gap: 2, height: '70px' }}>
          <Controller
            name="incorporated_date"
            control={methods.control}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                {...field}
                disabled={!edit}
                format="dd/MM/yyyy"
                label="Start date"
                value={pDate(field.value)}
                onChange={(value) => setValue('incorporated_date', fDate(value))}
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
        <RHFTextField name="location.state" label="State" disabled={!edit} />
        <RHFTextField name="location.city" label="City" disabled={!edit} />
        <RHFTextField name="location.country" label="Country" disabled={!edit} />
        <RHFTextField name="legal_name" label="Legal Name" disabled={!edit} />
        <RHFTextField name="website_link" label="Website Link" disabled={!edit} />
        {edit ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" onClick={() => setEdit(false)}>
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              Save Changes
            </LoadingButton>
          </Box>
        ) : (
          <Box>
            <Button
              startIcon={<Iconify icon="solar:pen-bold" />}
              variant="contained"
              color="success"
              onClick={() => setEdit(true)}
            >
              Edit
            </Button>
          </Box>
        )}
      </Stack>
    </FormProvider>
  );
};

export default DealAccountInfoForm;
