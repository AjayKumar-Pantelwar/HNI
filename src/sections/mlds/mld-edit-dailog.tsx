'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSwitch, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { mldsApi } from 'src/redux/api/mlds.api';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { MLD } from 'src/types/mlds.types';
import * as Yup from 'yup';

type Props = {
  currentMLD?: MLD;
  open: boolean;
  onClose: () => void;
};
const MLDEditDailog = (props: Props) => {
  const { currentMLD, open, onClose } = props;
  const router = useRouter();

  const [createMLD] = mldsApi.useCreateMLDMutation();
  const [editMLD] = mldsApi.useEditMLDMutation();

  const { enqueueSnackbar } = useSnackbar();

  const MLDsSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    min_investment: Yup.number().required('Minimum investment is required'),
    yield: Yup.string().required('Yield is required'),
    // sec_identifier: Yup.string().required('Security identifier is required'),
    description: Yup.string().required('Description is required'),
    is_activated: Yup.bool().required('Is Activated is required'),
    is_certified: Yup.bool().required('Is Certified is required'),
  });

  const defaultValues = {
    name: currentMLD?.name || '',
    min_investment: currentMLD?.min_investment || 0,
    yield: currentMLD?.yield || '',
    // sec_identifier: currentMLD?.sec_identifier || '',
    description: currentMLD?.description || '',
    is_activated: currentMLD?.is_activated || false,
    is_certified: currentMLD?.is_certified || false,
  };

  const methods = useForm({
    resolver: yupResolver(MLDsSchema),
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
      if (currentMLD) {
        await editMLD({ id: currentMLD.mld_id, nm: data }).unwrap();
      } else {
        await createMLD({ nm: data }).unwrap();
      }
      enqueueSnackbar(currentMLD ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.admin.roles.list);
    } catch (error) {
      enqueueSnackbar(error.error, { variant: 'error' });
      console.error(error);
    }
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Edit MLD</DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Stack sx={{ gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <RHFTextField name="name" label="Bond name" fullWidth />
              <RHFTextField name="min_investment" label="Min Investment" fullWidth type="nummber" />
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <RHFTextField name="yield" label="Yield" fullWidth />
              {/* <RHFTextField name="sec_identifier" label="Security Identifier" fullWidth /> */}
            </Box>

            <RHFTextField name="description" label="Description" fullWidth />
            <Box sx={{ display: 'flex', gap: 3 }}>
              <RHFSwitch name="is_activated" label="Is Activated" />
              <RHFSwitch name="is_certified" label="Is Certified" />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!currentMLD ? 'Create Bond' : 'Save Changes'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default MLDEditDailog;
