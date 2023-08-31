'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import RHFDateField from 'src/components/hook-form/rhf-date-field';
import { useSnackbar } from 'src/components/snackbar';
import { companyApi } from 'src/redux/api/company.api';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { AddCompanyRequest, Company, CompanyRequestSchema } from 'src/types/company.types';
import { fDate } from 'src/utils/format-time';
import { handleError } from 'src/utils/handle-error';

type Props = {
  currentCompany?: Company;
};

export default function CompanyNewEditForm({ currentCompany }: Props) {
  const router = useRouter();

  const [createCompany] = companyApi.useCreateCompanyMutation();
  const [editCompany] = companyApi.useEditCompanyMutation();

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = useMemo<AddCompanyRequest>(
    () => ({
      branch_name: currentCompany?.branch_name || '',
      legal_name: currentCompany?.legal_name || '',
      description: currentCompany?.description || '',
      form: currentCompany?.form || '',
      incorporated_date: currentCompany?.incorporated_date
        ? fDate(new Date(currentCompany.incorporated_date))
        : '',
      website_link: currentCompany?.website_link || '',
      location: {
        city: currentCompany?.location?.city || '',
        country: currentCompany?.location?.country || '',
        state: currentCompany?.location?.state || '',
      },
    }),
    [currentCompany]
  );

  const methods = useForm({
    resolver: yupResolver(CompanyRequestSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentCompany) {
        await editCompany({ ...data, company_id: currentCompany.company_id }).unwrap();
      } else {
        await createCompany(data).unwrap();
      }
      enqueueSnackbar(currentCompany ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.company.list);
    } catch (error) {
      handleError(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 6 }}>
        <RHFTextField name="legal_name" label="Legal Name" />
        <RHFTextField name="branch_name" label="Branch Name" />
        <RHFTextField name="description" label="Description" minRows={3} multiline />
        <RHFTextField name="website_link" label="Website Link" />
        <RHFDateField name="incorporated_date" label="Incorporated Date" />
        <RHFSelect name="form" label="Form">
          <MenuItem value="private">Private</MenuItem>
          <MenuItem value="public">Public</MenuItem>
        </RHFSelect>
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <RHFTextField name="location.city" label="City" fullWidth />
          <RHFTextField name="location.state" label="State" fullWidth />
          <RHFTextField name="location.country" label="Country" fullWidth />
        </Box>
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!currentCompany ? 'Create Company' : 'Save Changes'}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
