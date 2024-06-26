import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { PreviewFile } from 'src/components/preview-file';
import { UploadFile } from 'src/components/upload-file';
import * as Yup from 'yup';

const InApp = () => {
  const inAppSchema = Yup.object().shape({
    navigation_key: Yup.string().required('Navigation key is required'),
    image: Yup.mixed().nonNullable().required('Image is required'),
  });

  const defaultValues = {
    navigation_key: '',
    image: '',
  };

  const methods = useForm({
    resolver: yupResolver(inAppSchema),
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

  const image = watch('image');

  const handleFileChangePerm = (file: File | null) => {
    setValue('image', file as any);
  };

  const url = image ? URL.createObjectURL(image as any) : '';

  return (
    <Box sx={{ p: 5 }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box sx={{ display: 'flex' }}>
          <Stack sx={{ gap: 2, flex: 1 }}>
            {!image ? (
              <UploadFile
                uploadAs="JPEG, PNG"
                maxFileSize={2}
                label="Upload Image"
                handleFileChange={handleFileChangePerm}
                accept={{ 'image/*': ['.jpg', '.jpeg', '.png'] }}
              />
            ) : (
              <PreviewFile selectedFile={image as any} handleFileChange={handleFileChangePerm} />
            )}
            <RHFTextField name="navigation_key" label="Navigation key" />
          </Stack>
          <Box
            sx={{
              flex: 1,
              backgroundImage: `url(/assets/illustrations/mobile.svg)`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              width: '400px',
              height: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              p: 2,
            }}
          >
            {image && (
              <img
                src={url}
                alt="file"
                height={100}
                style={{ objectFit: 'cover', borderRadius: '10px' }}
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Send Notification{' '}
            </LoadingButton>
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default InApp;
