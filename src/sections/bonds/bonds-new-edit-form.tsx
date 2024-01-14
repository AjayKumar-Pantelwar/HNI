'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSwitch, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { bondsApi } from 'src/redux/api/bonds.api';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { Bond } from 'src/types/bonds.types';
import * as Yup from 'yup';

// ----------------------------------------------------------------------

type Props = {
  currentBond?: Bond;
};

export default function BondsNewEditForm({ currentBond }: Props) {
  const router = useRouter();

  const [createBond] = bondsApi.useCreateBondMutation();
  const [editBond] = bondsApi.useEditBondMutation();

  const { enqueueSnackbar } = useSnackbar();

  const BondsSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    min_investment: Yup.number().required('Minimum investment is required'),
    yield: Yup.number().required('Yield is required'),
    security: Yup.string().required('Security is required'),
    description: Yup.string().required('Description is required'),
    is_activated: Yup.bool().required('Is Activated is required'),
    is_certified: Yup.bool().required('Is Certified is required'),
  });

  const defaultValues = {
    name: currentBond?.bond_name || '',
    min_investment: currentBond?.min_investment || 0,
    yield: currentBond?.yield || 0,
    security: currentBond?.security || '',
    description: currentBond?.description || '',
    is_activated: currentBond?.is_activated || false,
    is_certified: currentBond?.is_certified || false,
  };

  const methods = useForm({
    resolver: yupResolver(BondsSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    getValues,
    watch,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentBond) {
        await editBond({ bond_id: currentBond.bond_id, ...data }).unwrap();
      } else {
        await createBond(data).unwrap();
      }
      enqueueSnackbar(currentBond ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.roles.list);
    } catch (error) {
      enqueueSnackbar(error.error, { variant: 'error' });
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Stack sx={{ gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <RHFTextField name="name" label="Bond name" fullWidth />
            <RHFTextField name="min_investment" label="Min Investment" fullWidth type="nummber" />
          </Box>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <RHFTextField name="yield" label="Yield" fullWidth />
            <RHFTextField name="security" label="Security" fullWidth />
          </Box>

          <RHFTextField name="description" label="Description" fullWidth />
          <Box sx={{ display: 'flex', gap: 3 }}>
            <RHFSwitch name="is_activated" label="Is Activated" />
            <RHFSwitch name="is_certified" label="Is Certified" />
          </Box>
        </Stack>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!currentBond ? 'Create Bond' : 'Save Changes'}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
