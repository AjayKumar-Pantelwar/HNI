import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { RHFSwitch, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import RHFDateField from 'src/components/hook-form/rhf-date-field';
import { notificationsApi } from 'src/redux/api/notifications.api';
import * as Yup from 'yup';

const Announcement = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateAPPVersion] = notificationsApi.useUpdateAppVersionMutation();

  const announcementSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .max(86, 'Title must be less than 50 characters'),
    description: Yup.string()
      .required('description is required')
      .max(150, 'description must be less than 150 characters'),
    fromDate: Yup.string().required('From Date is required'),
    toDate: Yup.string().required('To Date is required'),
    active: Yup.boolean().required('App mandatory is required'),
  });

  const defaultValues = {
    title: '',
    description: '',
    fromDate: '',
    toDate: '',
    active: false,
  };

  const methods = useForm({
    resolver: yupResolver(announcementSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // const { type, app_link, app_mandatory, app_version, ...rest } = data;
    // try {
    //   await updateAPPVersion({
    //     ...rest,
    //     type: type as APPType,
    //     ...(type === APPType.ANDROID
    //       ? {
    //           android_mandatory: app_mandatory,
    //           android_version: app_version,
    //           play_store_url: app_link,
    //         }
    //       : {
    //           android_mandatory: false,
    //           android_version: '',
    //           play_store_url: '',
    //         }),
    //     ...(type === APPType.IOS
    //       ? {
    //           ios_mandatory: app_mandatory,
    //           ios_version: app_version,
    //           app_store_url: app_link,
    //         }
    //       : {
    //           ios_mandatory: false,
    //           ios_version: '',
    //           app_store_url: '',
    //         }),
    //   }).unwrap();
    //   reset();
    //   enqueueSnackbar('Update success!', { variant: 'success' });
    // } catch (error) {
    //   handleError(error);
    // }
  });

  return (
    <Box sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack gap={1}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Stack gap={3}>
                <RHFTextField name="title" label="Title" maxLimitCharacters={86} />
                <RHFTextField
                  multiline
                  rows={3}
                  name="description"
                  label="Description"
                  maxLimitCharacters={150}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack gap={3}>
                <RHFDateField name="fromDate" label="From Date" />
                <RHFDateField name="toDate" label="To Date" />
                <RHFSwitch label="Active" name="active" />
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

export default Announcement;
