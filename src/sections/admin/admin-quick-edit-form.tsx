'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// _mock
// types
// assets
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { adminApi } from 'src/redux/api/admin.api';
import { Admin, EditAdminRequest } from 'src/types/admin.types';
import { handleError } from 'src/utils/handle-error';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentAdmin: Admin;
  isRm: boolean;
};

export default function AdminQuickEditForm({ currentAdmin, open, onClose, isRm }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const [editAdmin] = adminApi.useEditAdminMutation();

  const [profileImg, setProfileImg] = React.useState<File>();

  const AdminSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    // mobile_number: Yup.string().required('Phone number is required'),
    username: Yup.string().required('Username is required'),
    aid: Yup.string().required('ID is required'),
    // experience: Yup.number().required('Experience is required'),

    // location: Yup.string().test({
    //   test: (val) => (isRm ? Boolean(val) : true),
    //   message: 'Location is required',
    // }),

    // languages: Yup.string().test({
    //   test: (val) => (isRm ? !!val : true),
    //   message: 'language is required',
    // }),
    // specializes_in_1: Yup.string().test({
    //   test: (val) => (isRm ? !!val : true),
    //   message: 'Specialization is required',
    // }),
    // specializes_in_2: Yup.string().test({
    //   test: (val) => (isRm ? !!val : true),
    //   message: 'Specialization is required',
    // }),
    // specializes_in_3: Yup.string().test({
    //   test: (val) => (isRm ? !!val : true),
    //   message: 'Specialization is required',
    // }),
    // description: Yup.string().test({
    //   test: (val) => (isRm ? !!val : true),
    //   message: 'Description is required',
    // }),
  });

  const defaultValues = useMemo<EditAdminRequest>(
    () => ({
      name: currentAdmin.name || '',
      email: currentAdmin.email || '',
      // mobile_number: currentAdmin.mobile_number || '',
      username: currentAdmin.username || '',
      aid: currentAdmin.aid || '',
      // experience: parseInt(currentAdmin.experience || '0', 10),
      // location: currentAdmin.location || '',
      // specializes_in_1: currentAdmin.specializes_in_1 || '',
      // specializes_in_2: currentAdmin.specializes_in_2 || '',
      // specializes_in_3: currentAdmin.specializes_in_3 || '',
      // description: currentAdmin.description || '',
    }),
    [currentAdmin]
  );

  const methods = useForm({
    resolver: yupResolver<EditAdminRequest>(AdminSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    // const { aid, ...actualData } = data;

    // const formData = convertToFD(actualData);
    try {
      await editAdmin(data).unwrap();
      reset();
      onClose();
      enqueueSnackbar('Update success!', { variant: 'success' });
    } catch (error) {
      handleError(error);
    }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => reset(defaultValues), [open]);

  // const handleDrop = useCallback(
  //   (key: keyof CreateAdminRequest) => (acceptedFiles: File[]) => {
  //     const newFiles = acceptedFiles?.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     );

  //     // setValue(key, newFiles[0], { shouldValidate: true });
  //     if (key === 'profile_img' && newFiles.length > 0) {
  //       setProfileImg(newFiles[0]);
  //     }
  //   },
  //   [setProfileImg]
  // );
  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720, position: 'relative' },
      }}
      scroll="body"
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Quick Update</DialogTitle>
        <DialogContent>
          <Box
            pt={2}
            rowGap={2}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFTextField name="name" label="Full Name" />
            <RHFTextField name="email" label="Email Address" />
            <RHFTextField name="username" label="Username" />
            {/* <RHFTextField name="mobile_number" label="Phone Number" /> */}
            {/* {isRm && (
              <>
                <RHFTextField name="experience" label="Experience in Years" />
                <RHFTextField name="location" label="Location" />
                <RHFTextField name="languages" label="Languages Known" />
                <RHFTextField name="specializes_in_1" label="Specialization 1" />
                <RHFTextField name="specializes_in_2" label="Specialization 2" />
                <RHFTextField name="specializes_in_3" label="Specialization 3" />
                <RHFUploadAvatar
                  name="profile_img"
                  maxSize={3145728}
                  onDrop={handleDrop('profile_img')}
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
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <RHFTextField
                    name="description"
                    label="Description"
                    multiline
                    fullWidth
                    rows={4}
                  />
                </Box>
              </>
            )} */}
          </Box>
          <DialogActions>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Update
            </LoadingButton>
          </DialogActions>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
