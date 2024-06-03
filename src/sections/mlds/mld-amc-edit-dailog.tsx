'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { EditDialog } from 'src/components/edit-dialog';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { mldsApi } from 'src/redux/api/mlds.api';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { Amc } from 'src/types/bonds.types';
import { convertToFD } from 'src/utils/convert-fd';
import * as Yup from 'yup';

type Props = {
  currentAMC?: Amc;
  open: boolean;
  onClose: () => void;
  mld_id: string;
};
const MLDAMCEditDailog = (props: Props) => {
  const { currentAMC, open, onClose, mld_id } = props;
  const router = useRouter();

  const [logo, setLogo] = React.useState<File>();

  const [editAMC] = mldsApi.useEditAMCMutation();

  const { enqueueSnackbar } = useSnackbar();

  const BondsSchema = Yup.object().shape({
    home_page: Yup.string().required('Home page is required'),
    description: Yup.string().required('Description is required'),
    type: Yup.string().required('Type is required'),
    logo: Yup.mixed<any>().nullable().required('Logo is required'),
  });

  const defaultValues = {
    home_page: currentAMC?.amc_home_page || '',
    description: currentAMC?.amc_description || '',
    type: currentAMC?.amc_type || '',
    logo: currentAMC?.amc_logo || '',
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
    const formData = convertToFD(data);
    try {
      await editAMC({ mld_id, body: formData }).unwrap();
      enqueueSnackbar(currentAMC ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.admin.roles.list);
    } catch (error) {
      enqueueSnackbar(error.error, { variant: 'error' });
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    () => (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setLogo(newFiles[0]);
    },
    []
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      // PaperProps={{
      //   sx: {
      //     p: 4,
      //     minWidth: 'min(100%, 700px)',
      //   },
      // }}
      // sx={{ mx: 2 }}
      maxWidth="sm"
      fullWidth
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Edit AMC</DialogTitle>
        <DialogContent dividers>
          <Stack sx={{ gap: 3 }}>
            <RHFUploadAvatar
              name="logo"
              maxSize={3145728}
              onDrop={handleDrop()}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mb: 3,
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
            {logo && (
              <EditDialog
                open
                base64={URL.createObjectURL(logo)}
                filename={logo.name}
                onChange={(file) => {
                  if (file === null) return;
                  Object.assign(file, {
                    preview: URL.createObjectURL(file),
                  });
                  setValue('logo', file);
                }}
                onClose={() => setLogo(undefined)}
                aspectRatio="1 / 1"
              />
            )}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <RHFTextField name="home_page" label="Home Page" fullWidth />
              <RHFTextField name="type" label="Type" />
            </Box>
            <RHFTextField name="description" label="Description" fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default MLDAMCEditDailog;
