import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import RHFDateField from 'src/components/hook-form/rhf-date-field';
import CustomSwitch from 'src/components/toggle-button';
import { notificationsApi } from 'src/redux/api/notifications.api';
import { Notifications } from 'src/types/notifications.types';
import { fDate } from 'src/utils/format-time';
import { handleError } from 'src/utils/handle-error';
import * as Yup from 'yup';

interface Props {
  notification?: Notifications;
  onClose?: () => void;
}

const AnnouncementForm = (props: Props) => {
  const { notification, onClose } = props;
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
    fromDate: fDate(notification?.from_date) || '',
    toDate: fDate(notification?.to_date) || '',
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
    getValues,
    setValue,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const { toDate, active, description, ...rest } = data;

    try {
      if (notification) {
        await updateNotication({
          id: notification.id,
          ...(active !== notification.is_active && { is_active: active }),
          ...(toDate !== fDate(notification?.to_date) && { to_date: toDate }),
        }).unwrap();
        enqueueSnackbar('Update success!', { variant: 'success' });
      } else {
        await createNotication({
          from_date: rest.fromDate,
          title: rest.title,
          subtitle: description,
          to_date: toDate,
        }).unwrap();
        enqueueSnackbar('Created success!', { variant: 'success' });
      }
      reset();
    } catch (error) {
      handleError(error);
    } finally {
      if (onClose) onClose();
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
                  multiline
                  disabled={!!notification?.subtitle}
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
                  disabled={!!notification?.from_date}
                  name="fromDate"
                  label="From Date"
                  disablePast
                />
                <RHFDateField disablePast name="toDate" label="To Date" />
                {notification && (
                  <Stack sx={{ gap: 1 }}>
                    <Typography variant="caption" fontWeight={500} color="text.secondary">
                      Active / Inactive
                    </Typography>
                    <CustomSwitch
                      checked={getValues('active')}
                      onChange={(e) => {
                        setValue('active', e.target.checked);
                      }}
                    />
                  </Stack>
                )}
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button type="submit" variant="contained">
              {isSubmitting ? <CircularProgress size={22} /> : 'Save Changes'}
            </Button>
          </Box>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default AnnouncementForm;
