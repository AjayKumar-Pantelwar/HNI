'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Link from 'src/components/link';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSelector } from 'src/redux/store';
import { useRouter } from 'src/routes/hook/use-router';
import { paths } from 'src/routes/paths';
import { authService } from 'src/services';
import { handleError } from 'src/utils/handle-error';

import * as Yup from 'yup';

export default function ChangePasswordView() {
  const password = useBoolean();
  const confirmPassword = useBoolean();
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (user === null) return;
      const res = await authService.changePassword({
        session_token: user.session_token,
        username: user.username,
        password: data.password,
      });
      enqueueSnackbar(res.data.message, { variant: 'success' });
      router.push(paths.auth.login);
    } catch (error) {
      handleError(error);
      router.push(paths.auth.login);
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
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

      <RHFTextField
        name="confirmPassword"
        label="Confirm New Password"
        type={confirmPassword.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={confirmPassword.onToggle} edge="end">
                {confirmPassword.value ? <RemoveRedEyeRoundedIcon /> : <VisibilityOffRoundedIcon />}
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
        Update Password
      </LoadingButton>

      <Stack sx={{ width: '100%', gap: 2, mt: 2 }}>
        <Divider />
        <Link
          href={paths.auth.login}
          sx={{
            alignItems: 'center',
            display: 'inline-flex',
          }}
        >
          <KeyboardArrowLeftIcon width={16} />
          Return to Login
        </Link>
      </Stack>
    </Stack>
  );

  const renderHead = (
    <Stack spacing={1} sx={{ my: 5 }}>
      <Typography variant="h3">Change Password</Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        You are required to change your password
      </Typography>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
