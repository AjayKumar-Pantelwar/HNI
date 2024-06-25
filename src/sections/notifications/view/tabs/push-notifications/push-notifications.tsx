import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, MenuItem, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { CustomCheckbox } from 'src/components/custom-checkbox';
import { RHFRadioGroup, RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { PreviewFile } from 'src/components/preview-file';
import CustomSwitch from 'src/components/toggle-button';
import { UploadFile } from 'src/components/upload-file';
import * as Yup from 'yup';
import NotificationViewer from './notification-viewer';

const PushNotifications = () => {
  const notificationSchema = Yup.object().shape({
    event: Yup.string().required('Title is required'),
    title: Yup.string()
      .required('Subtitle is required')
      .max(80, 'Subtitle must be less than 80 characters'),
    navigation_key: Yup.string().required('Navigation key is required'),
    //   .max(80, 'Navigation key must be less than 80 characters'),
    description: Yup.string()
      .required('Description is required')
      .max(200, 'Description must be less than 200 characters'),
    rich_notification: Yup.bool().required('App mandatory is required'),
    image: Yup.mixed().test('image-required', 'Image is required', (value, context) => {
      const appMandatory = context?.parent?.rich_notification;
      if (appMandatory === 'false') {
        return Yup.mixed().nonNullable().isValidSync(value);
      }
      return true;
    }),
    ctas: Yup.array()
      .of(
        Yup.object().shape({
          key: Yup.string().required('key is required'),
          label: Yup.string().required('value is required'),
        })
      )
      .required('Tags are required'),
    cta_label1: Yup.string().required('cta label 1 is required'),
    cta_label2: Yup.string().required('cta label 2 is required'),
    cta_key1: Yup.string().required('cta key 1 is required'),
    cta_key2: Yup.string().required('cta key 2 is required'),
    deliver_type: Yup.string()
      .required('Type is required')
      .oneOf(['android', 'ios'], 'Type must be either android or ios'),
    notification_box: Yup.bool().required('Notification box is required'),
  });

  const defaultValues = {
    event: '',
    title: '',
    navigation_key: '',
    description: '',
    rich_notification: false,
    image: '',
    ctas: [{ key: '', label: '' }],
    cta_label1: '',
    cta_label2: '',
    cta_key1: '',
    cta_key2: '',
    deliver_type: '',
    notification_box: false,
  };

  const methods = useForm({
    resolver: yupResolver(notificationSchema),
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
    // try {
    //   if (card) {
    //     await updateCard({ body: convertToFD(data), id: card?.card_id }).unwrap();
    //     enqueueSnackbar('Update success!');
    //   } else {
    //     await addCard(convertToFD(data)).unwrap();
    //     enqueueSnackbar('Add success!');
    //   }
    // } catch (error) {
    //   handleError(error);
    // } finally {
    //   onClose();
    // }
  });

  const cta = watch('ctas');

  const image = watch('image');

  const handleFileChangePerm = (file: File | null) => {
    setValue('image', file as any);
  };

  return (
    <Box sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Grid container spacing={3} sx={{ flex: 1 }}>
            <Grid item xs={12} md={6}>
              <Stack sx={{ gap: 2 }}>
                <RHFSelect name="event" label="Event">
                  <MenuItem value="MF Management">MF Management</MenuItem>
                  <MenuItem value="PMS Management">PMS Management</MenuItem>
                  <MenuItem value="Admin Management">Admin Management</MenuItem>
                </RHFSelect>
                <RHFTextField
                  name="title"
                  label="Title"
                  maxLimitCharacters={80}
                  multiline
                  rows={2}
                />
                <RHFTextField name="navigation_key" label="Navigation Key" />
                <RHFTextField name="cta_label1" label="CTA 1 Label" />
                <RHFTextField name="cta_label2" label="CTA 2 Label" />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack sx={{ gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'start' }}>
                  <Stack sx={{ gap: 1 }}>
                    <Typography variant="caption" fontWeight={500} color="text.secondary">
                      Rich Notification
                    </Typography>
                    <CustomSwitch
                      checked={watch('rich_notification')}
                      onChange={(e) => {
                        setValue('rich_notification', e.target.checked);
                      }}
                    />
                  </Stack>
                  <Stack sx={{ gap: 1 }}>
                    <Typography variant="caption" fontWeight={500} color="text.secondary">
                      Deliver To (OS)
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CustomCheckbox
                          name="deliver_type"
                          label="Android"
                          checked={watch('deliver_type') === 'android'}
                          onChange={(e) => {
                            if (e.target.checked) setValue('deliver_type', 'android');
                            else setValue('deliver_type', '');
                          }}
                        />
                        <Typography variant="subtitle2">Android</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CustomCheckbox
                          name="deliver_type"
                          label="Android"
                          checked={watch('deliver_type') === 'ios'}
                          onChange={(e) => {
                            if (e.target.checked) setValue('deliver_type', 'ios');
                            else setValue('deliver_type', '');
                          }}
                        />
                        <Typography variant="subtitle2">IOS</Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
                <RHFTextField name="description" label="Description" multiline rows={3} />
                <RHFRadioGroup
                  name="notification_box"
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]}
                  label="Add to notification box"
                  sx={{ display: 'flex', flexDirection: 'row' }}
                />
                <RHFTextField name="cta_key1" label="CTA 1 Key" />

                <RHFTextField name="cta_key2" label="CTA 2 Key" />
              </Stack>
            </Grid>
            {/* <Grid item xs={12}>
              <Stack sx={{ gap: 2 }}>
                {cta.map((c, i) => (
                  <Box
                    key={crypto.randomUUID()}
                    sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}
                  >
                    <RHFTextField
                      fullWidth
                      key={cta?.length}
                      name={`ctas[${i}].key`}
                      label={`CTA Key ${i + 1}`}
                      stackProps={{ sx: { width: '100%' } }}
                    />
                    <RHFTextField
                      fullWidth
                      key={cta?.length}
                      name={`ctas[${i}].label`}
                      label={`CTA Label ${i + 1}`}
                      stackProps={{ sx: { width: '100%' } }}
                    />
                    <IconButton
                      sx={{ mt: 1 }}
                      onClick={() => {
                        setValue('ctas', cta?.filter((_, index) => index !== i) || []);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  fullWidth
                  onClick={() => setValue('ctas', [...cta, { key: '', label: '' }])}
                >
                  Add CTA
                </Button>
              </Stack>
            </Grid> */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'end',
                  gap: 3,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  {!image ? (
                    <UploadFile
                      uploadAs="JPG"
                      maxFileSize={2}
                      label="Upload Image"
                      handleFileChange={handleFileChangePerm}
                    />
                  ) : (
                    <PreviewFile
                      selectedFile={image as any}
                      handleFileChange={handleFileChangePerm}
                    />
                  )}
                </Box>
                <Box sx={{ flex: 1 / 2 }}>
                  <Button type="submit" variant="contained" size="large" fullWidth>
                    Send Notification
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box>
            <NotificationViewer
              description={watch('description')}
              title={watch('title')}
              image={watch('image') as any}
            />
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default PushNotifications;
