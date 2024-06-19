'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, MenuItem, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { RHFRadioGroup, RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { notificationsApi } from 'src/redux/api/notifications.api';
import { APPType } from 'src/types/notifications.types';
import { handleError } from 'src/utils/handle-error';
import * as Yup from 'yup';

const AppUpdate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateAPPVersion] = notificationsApi.useUpdateAppVersionMutation();

  const appSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .max(86, 'Title must be less than 86 characters'),
    subtitle: Yup.string()
      .required('Subtitle is required')
      .max(150, 'Subtitle must be less than 150 characters'),
    button1: Yup.string()
      .required('Button 1 is required')
      .max(86, 'Button 1 must be less than 86 characters'),
    app_mandatory: Yup.string().required('App mandatory is required'),
    button2: Yup.string().test('button2-required', 'Button 2 is required', (value, context) => {
      const appMandatory = context?.parent?.app_mandatory;
      if (appMandatory === 'false') {
        return Yup.string()
          .required('Button 2 is required')
          .max(86, 'Button 2 must be less than 86 characters')
          .isValidSync(value);
      }
      return true;
    }),
    app_link: Yup.string().required('App link is required'),
    app_version: Yup.string().required('App version is required'),
    os_type: Yup.string()
      .required('Type is required')
      .oneOf(['android', 'ios'], 'Type must be either android or ios'),
  });

  const defaultValues = {
    title: '',
    subtitle: '',
    button1: '',
    button2: '',
    os_type: APPType.ANDROID,
    app_link: '',
    app_version: '',
    app_mandatory: 'true',
  };

  const methods = useForm({
    resolver: yupResolver(appSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    getValues,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const { os_type: type, app_link, app_mandatory, app_version, ...rest } = data;

    try {
      await updateAPPVersion({
        ...rest,
        os_type: type as APPType,
        button2: appMandate === 'true' ? '' : data.button2,
        ...(type === APPType.ANDROID
          ? {
              android_mandatory: app_mandatory === 'true',
              android_version: app_version,
              play_store_url: app_link,
            }
          : {
              android_mandatory: false,
              android_version: '',
              play_store_url: '',
            }),
        ...(type === APPType.IOS
          ? {
              ios_mandatory: app_mandatory === 'true',
              ios_version: app_version,
              app_store_url: app_link,
            }
          : {
              ios_mandatory: false,
              ios_version: '',
              app_store_url: '',
            }),
      }).unwrap();
      reset();
      enqueueSnackbar('Update success!', { variant: 'success' });
    } catch (error) {
      handleError(error);
    }
  });

  const appMandate = watch('app_mandatory');

  console.log(errors, getValues());

  return (
    <Box sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack gap={1}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Stack gap={3}>
                <RHFTextField name="title" label="Title" maxLimitCharacters={86} />
                <RHFTextField name="subtitle" label="Subtitle" maxLimitCharacters={150} />
                <RHFTextField name="button1" label="Button1" maxLimitCharacters={86} />
                {(appMandate as unknown as string) === 'false' && (
                  <RHFTextField name="button2" label="Button2" maxLimitCharacters={86} />
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack gap={3}>
                <RHFTextField name="app_link" label="App link" />
                <RHFTextField name="app_version" label="App version" />
                <RHFSelect name="os_type" label="Type">
                  <MenuItem value={APPType.ANDROID}>Android</MenuItem>
                  <MenuItem value={APPType.IOS}>IOS</MenuItem>
                </RHFSelect>
                <RHFRadioGroup
                  name="app_mandatory"
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]}
                  label="App mandatory"
                  sx={{ display: 'flex', flexDirection: 'row' }}
                />
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Save Changes
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default AppUpdate;
