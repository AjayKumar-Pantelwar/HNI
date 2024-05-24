'use client';

import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';

import { Alert, Box, Dialog, Divider, Link } from '@mui/material';

import IconButton from '@mui/material/IconButton';

import InputAdornment from '@mui/material/InputAdornment';

import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';

import { MuiOtpInput } from 'mui-one-time-password-input';

import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { useRouter } from 'next/navigation';

import { useSnackbar } from 'notistack';

import React from 'react';

import { useForm } from 'react-hook-form';

import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useBoolean } from 'src/hooks/use-boolean';

import { authSlice } from 'src/redux/slices/auth.slice';

import { useDispatch, useSelector } from 'src/redux/store';
import { RouterLink } from 'src/routes/components';

import { paths } from 'src/routes/paths';

import { authService } from 'src/services';

import { handleError } from 'src/utils/handle-error';

import * as Yup from 'yup';

export default function LoginSection() {
  const dispatch = useDispatch();

  const router = useRouter();

  const { user } = useSelector((state) => state.auth);

  const [errorMsg, setErrorMsg] = React.useState('');

  const [open, setOpen] = React.useState(false);

  const [otp, setOtp] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

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
  } = methods;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (user === null) return;

      if (otp.length < 6) throw new Error('Invalid OTP');

      await authService.validateTotp({
        totp: otp,
        username: user.username,
        session_token: user.session_token,
      });

      setOpen(false);

      dispatch(authSlice.actions.login());
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);

      setOtp('');
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await authService.login(data);

      console.log({ response });
      dispatch(authSlice.actions.setUser({ ...response.data.data, username: data.username }));
      if (response?.data?.data?.is_password_changed_required) {
        enqueueSnackbar('You need to reset your password', { variant: 'error' });
        router.push(paths.auth.changePassword);
      } else if (response.data?.data?.is_totp_activated === false) {
        enqueueSnackbar('You need to activate TOTP', { variant: 'error' });
        router.push(paths.auth.activateTotp);
      } else {
        setOpen(true);
      }
    } catch (error) {
      setErrorMsg(typeof error === 'string' ? error : error.response.data.error);
    }
  });

  const renderForm = (
    <Stack spacing={2}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      <Stack spacing={3} sx={{ mb: 2 }}>
        <RHFTextField name="username" label="Username" />

        <RHFTextField
          name="password"
          label="Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  {password.value ? <RemoveRedEyeRoundedIcon /> : <VisibilityOffRoundedIcon />}
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
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'start' }}>
        <Link component={RouterLink} href={paths.auth.changePassword}>
          Forgot Password?
        </Link>
      </Box>
    </Stack>
  );

  const renderHead = (
    <Stack sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
      <img src="/logo/360logo.png" alt="logo" style={{ width: 60, marginBottom: 24 }} />
      <Typography variant="h4">Login</Typography>
      <Typography variant="body2" color="text.secondary">
        Sign in on the 360ONE Wealth Mobile CMS
      </Typography>
    </Stack>
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderHead}

        {renderForm}
      </FormProvider>

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

        <Box component="form" onSubmit={handleLogin}>
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

          <LoadingButton fullWidth size="large" variant="contained" type="submit" loading={loading}>
            Verify
          </LoadingButton>
        </Box>
      </Dialog>
    </>
  );
}
