import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { RHFSwitch, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import RHFDateField from 'src/components/hook-form/rhf-date-field';
import { notificationsApi } from 'src/redux/api/notifications.api';
import { Notifications } from 'src/types/notifications.types';
import { handleError } from 'src/utils/handle-error';
import * as Yup from 'yup';

interface Props {
  notification?: Notifications;
}

const AnnouncementForm = (props: Props) => {
  const { notification } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [createNotication] = notificationsApi.useCreateNotificationMutation();
  const [updateNotication] = notificationsApi.useUpdateNotificationMutation();

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
    title: notification?.title || '',
    description: notification?.subtitle || '',
    fromDate: notification?.from_date || '',
    toDate: notification?.to_date || '',
    active: notification?.is_active || false,
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
    const { toDate, active, description, ...rest } = data;
    try {
      if (notification) {
        await updateNotication({
          id: notification.id,
          is_active: active,
        });
        enqueueSnackbar('Update success!', { variant: 'success' });
      } else {
        await createNotication({
          from_date: rest.fromDate,
          title: rest.title,
          subtitle: description,
          to_date: toDate,
        });
        enqueueSnackbar('Created success!', { variant: 'success' });
      }
      reset();
    } catch (error) {
      handleError(error);
    }
  });

  return (
    <Box>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack gap={1}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Stack gap={3}>
                <RHFTextField
                  disabled={!!notification?.title}
                  name="title"
                  label="Title"
                  maxLimitCharacters={86}
                />
                <RHFTextField
                  disabled={!!notification?.subtitle}
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
                <RHFDateField
                  name="fromDate"
                  disabled={!!notification?.from_date}
                  label="From Date"
                />
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

export default AnnouncementForm;
