'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks

// assets
import { SentIcon } from 'src/assets/icons';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFCode } from 'src/components/hook-form';
import { Box, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import React, { useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
import { generateKey } from 'crypto';
import { authService } from 'src/services/auth.service';
import { useSelector } from 'src/redux/store';

// ----------------------------------------------------------------------

export default function ActivateTotpSection() {
  const TotpSchema = Yup.object().shape({
    code: Yup.string().min(6, 'Code must be at least 6 characters').required('Code is required'),
  });

  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();

  const { loginData } = useSelector((state) => state.auth);

  const [secret, setSecret] = React.useState('');
  const [url, setUrl] = React.useState('');

  const defaultValues = {
    code: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(TotpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (loginData === null) return;
      const response = await authService.activateTotp({
        username: loginData.username,
        req_token: loginData.req_token,
        totp: data.code,
      });
    } catch (error) {
      console.error(error);
    }
  });
  const onCopy = useCallback(
    (text: string) => {
      if (text) {
        enqueueSnackbar('Copied!');
        copy(text);
      }
    },
    [copy, enqueueSnackbar]
  );

  React.useEffect(() => {
    if (loginData === null) return;
    authService
      .generateTotp({ username: loginData.username, req_token: loginData.req_token })
      .then((response) => {
        setSecret(response.data?.data?.secret || '');
        setUrl(response.data?.data?.url || '');
      })
      .catch((error) => {
        console.error('Error fetching secret key:', error);
      });
  }, [loginData]);

  const renderForm = (
    <Stack spacing={3} mt={4} alignItems="center">
      <RHFCode name="code" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Activate TOTP
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign in
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      {/* <SentIcon sx={{ height: 96 }} /> */}

      <Stack spacing={2} sx={{ mb: 5 }}>
        <Typography variant="h3">Activate TOTP</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Please scan the QR Code or enter the setup key manually and then enter the code in below
          box to verify your account.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ bgcolor: 'white', p: 1 }}>
            <QRCodeSVG value={url} />
          </Box>
        </Box>
        <Typography variant="subtitle2" color="textSecondary" align="center">
          Alternatively you can manually put this secret key in your Google Authenticator App
        </Typography>
        <Box>
          <TextField
            value={secret}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy">
                    <IconButton onClick={() => onCopy(secret)}>
                      <Iconify icon="eva:copy-fill" width={24} color="text.primary" />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
