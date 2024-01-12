'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Skeleton,
  TextField,
  Tooltip,
} from '@mui/material';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { QRCodeSVG } from 'qrcode.react';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import FormProvider, { RHFCode } from 'src/components/hook-form';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
import { authSlice } from 'src/redux/slices/auth.slice';
import { useSelector } from 'src/redux/store';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { authService } from 'src/services';
import { handleError } from 'src/utils/handle-error';
import * as Yup from 'yup';

export default function ActivateTotpView() {
  const TotpSchema = Yup.object().shape({
    code: Yup.string().min(6, 'Code must be at least 6 characters').required('Code is required'),
  });

  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  // const [secret, setSecret] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [secret, setSecret] = React.useState('');

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
    reset,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (user === null) {
        router.push(paths.auth.login);
        return;
      }
      await authService.activateTotp({
        username: user.username,
        session_token: user.session_token,
        totp: data.code,
      });
      enqueueSnackbar('Successfully activated TOTP', { variant: 'success' });
      dispatch(authSlice.actions.login());
    } catch (error) {
      reset();
      handleError(error);
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
    if (user === null) return;
    setTimeout(() => {
      authService
        .generateTotp({ username: user.username, session_token: user.session_token })
        .then((response) => {
          setUrl(response.data?.data?.url || '');
          const params = new URLSearchParams(response.data?.data?.url);

          setSecret(Array.from(params.values())?.[0]);

          dispatch(
            authSlice.actions.setUser({
              ...user,
              session_token: response.data?.data?.session_token,
            })
          );
        })
        .catch((error) => {
          handleError(error);
          router.push(paths.auth.login);
        });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderForm = (
    <Stack spacing={3} mt={4} alignItems="center">
      {url ? (
        <>
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
        </>
      ) : (
        <Skeleton height={100} width="100%" />
      )}
      <Stack sx={{ width: '100%', gap: 2, mt: 2 }}>
        <Divider />
        <Link
          component={RouterLink}
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
    <>
      {/* <SentIcon sx={{ height: 96 }} /> */}

      <Stack spacing={2} sx={{ mb: 5 }}>
        <Typography variant="h3">Activate TOTP</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Scan the QR Code or manually enter the setup key, and then input the generated code in the
          box below for account verification.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ bgcolor: 'white', p: 1 }}>
            {url ? <QRCodeSVG value={url} /> : <Skeleton height={130} width={130} />}
          </Box>
        </Box>
        {url ? (
          <Typography variant="subtitle2" color="textSecondary" align="center">
            Alternatively you can manually put this secret key in your Google Authenticator App
          </Typography>
        ) : (
          <Skeleton height={30} width="100%" />
        )}
        <Box>
          {secret ? (
            <TextField
              value={secret}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Copy">
                      <IconButton onClick={() => onCopy(secret)}>
                        <ContentCopyRoundedIcon width={24} sx={{ color: 'text.primary' }} />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <Skeleton height={45} />
          )}
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
