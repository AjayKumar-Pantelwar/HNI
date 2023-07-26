'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// routes
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// assets

// config
import { PATH_AFTER_LOGIN } from 'src/config-global';


// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useDispatch } from 'src/redux/store';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { authService } from 'src/services/auth.service';
import { authSlice } from 'src/redux/slices/auth';

// ----------------------------------------------------------------------

export default function LoginSection() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [errorMsg, setErrorMsg] = React.useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

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
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // console.log(methods.getValues())

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.info('DATA', data);
      const response = await authService.login(data);
      dispatch(authSlice.actions.login({ ...response.data.data, username: data.username }));
      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.response.data.error);
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center" maxWidth="450px">
      <RHFTextField
        name="username"
        label="Username"
        placeholder="example@gmail.com"
        InputLabelProps={{ shrink: true }}
      />


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
  );

  const renderHead = (
    <Stack spacing={1} sx={{ my: 5 , display : "flex" , alignItems : "center" }}>
        <Typography variant="h3">Login to</Typography>
        <Typography variant="h3">Mumbai Angels</Typography>        
      </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
