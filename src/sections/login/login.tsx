'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// assets

// config

// components
import { Alert, Dialog } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import React from 'react';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { authSlice } from 'src/redux/slices/auth.slice';
import { useDispatch, useSelector } from 'src/redux/store';
import { paths } from 'src/routes/paths';
import { authService } from 'src/services/auth.service';

// ----------------------------------------------------------------------

export default function LoginSection() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loginData } = useSelector((state) => state.auth);

  const [errorMsg, setErrorMsg] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [otp, setOtp] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [reqToken, setReqToken] = React.useState('');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    username: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    getValues,
  } = methods;

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!reqToken && !getValues('username')) return;
      if (otp.length < 6) {
        enqueueSnackbar('Invalid OTP', { variant: 'error' });
        return;
      }
      await authService.validateTotp({
        totp: otp,
        username: getValues('username'),
        req_token: reqToken,
      });
      setOpen(false);
      dispatch(authSlice.actions.login());
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: 'error' });
    } finally {
      setLoading(false);
      setOtp('');
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await authService.login(data);
      /*
       * if login is successful, we need to store the req_token to
       * use it in the next request for validate totp, and we open
       * the validate totp dialog
       */
      dispatch(authSlice.actions.setLoginData({ ...response.data.data, username: data.username }));
      setReqToken(response.data.data.req_token);
      setOpen(true);
    } catch (error) {
      console.error(error);
      const { response } = error;
      /*
       * if login is not successful, we need to store the req_token to
       * use it in the next request for change password and activate totp
       */
      if (response?.data?.data?.is_pwd_change_required) {
        dispatch(
          authSlice.actions.setLoginData({ ...response.data.data, username: data.username })
        );
        router.push(paths.changePassword);
      } else if (response.data?.data?.is_totp_activated === false) {
        dispatch(
          authSlice.actions.setLoginData({ ...response.data.data, username: data.username })
        );
        router.push(paths.activateTotp);
      } else {
        /*
         * if there is any other error in the login even if the user has setup
         * password and totp, then we need to show the error and keep the
         * user on login page, for example, incorrect credentials
         */
        setErrorMsg(typeof error === 'string' ? error : error.response.data.error);
      }
    }
  });

  const renderForm = (
    <Stack spacing={3}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      <Stack spacing={3}>
        <RHFTextField name="username" label="Username" />

        <RHFTextField
          name="password"
          label="Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Stack>
    </Stack>
  );

  const renderHead = (
    <Stack sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
      <img src="/logo/logo.png" alt="logo" style={{ width: 120, height: 120 }} />
      <Typography variant="h3">Login to</Typography>
      <Typography variant="h3">Mumbai Angels</Typography>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}

      <Dialog
        PaperProps={{ sx: { p: 4 } }}
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
      >
        <Typography variant="h3" align="center">
          Enter TOTP
        </Typography>
        <Typography align="center" color="text.secondary" my={2}>
          Enter the 6 digit code from your External TOTP app
        </Typography>
        <MuiOtpInput
          sx={{ my: 2 }}
          value={otp}
          onChange={(value) => setOtp(value)}
          autoFocus
          gap={1.5}
          length={6}
          TextFieldsProps={{
            placeholder: '-',
          }}
        />
        <LoadingButton
          fullWidth
          size="large"
          variant="contained"
          onClick={handleLogin}
          loading={loading}
        >
          Verify
        </LoadingButton>
      </Dialog>
    </FormProvider>
  );
}
