'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Close from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { PreviewFile } from 'src/components/preview-file';
import { useSnackbar } from 'src/components/snackbar';
import { UploadFile } from 'src/components/upload-file';
import { carouselApi } from 'src/redux/api/carousel.api';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { Carousel } from 'src/types/carousel.types';
import { convertToFD } from 'src/utils/convert-fd';
import * as Yup from 'yup';

interface Props {
  open: boolean;
  onClose: () => void;
  currentCarousel?: Carousel;
}

export default function CarouselEditModal(props: Props) {
  const { onClose, open, currentCarousel } = props;

  const router = useRouter();

  const [insertCarousel] = carouselApi.useInsertCarouselMutation();
  const [editCarousel] = carouselApi.useEditCarouselMutation();

  const { enqueueSnackbar } = useSnackbar();

  const CarouselSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('description is required'),
    icon: Yup.mixed<any>().nullable().required('Icon is required'),
    media_url: Yup.mixed<any>().nullable().required('Media URL is required'),
    is_active: Yup.bool().required('Is Active is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentCarousel?.title || '',
      description: currentCarousel?.description || '',
      icon: currentCarousel?.icon || '',
      media_url: currentCarousel?.media_url || '',
      is_active: currentCarousel?.is_active || true,
    }),
    [currentCarousel]
  );

  const methods = useForm({
    resolver: yupResolver(CarouselSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    getValues,
    watch,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const formData = convertToFD(data);
    try {
      if (currentCarousel) {
        await editCarousel({ id: currentCarousel.id.toString(), body: formData }).unwrap();
      } else {
        await insertCarousel(formData).unwrap();
      }
      enqueueSnackbar(currentCarousel ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.admin.roles.list);
    } catch (error) {
      enqueueSnackbar(error.error, { variant: 'error' });
      console.error(error);
    }
  });

  const image = watch('media_url');

  const handleImageFileChangePerm = (file: File | null) => {
    setValue('media_url', file as any);
  };
  const icon = watch('icon');
  const handleIconFileChangePerm = (file: File | null) => {
    setValue('icon', file as any);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          minWidth: '700px',
        },
      }}
    >
      <Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
          <Typography variant="h5">Edit Carousel</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
      </Stack>
      <Box sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Box>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack sx={{ gap: 3 }}>
                    <RHFTextField name="title" label="Choose title" fullWidth />
                    <RHFTextField name="description" label="Choose Description" fullWidth />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack sx={{ gap: 3 }}>
                    {!image ? (
                      <UploadFile
                        uploadAs="JPG"
                        maxFileSize={2}
                        label="Upload Image"
                        handleFileChange={handleImageFileChangePerm}
                      />
                    ) : (
                      <PreviewFile
                        label="Image"
                        selectedFile={image as any}
                        handleFileChange={handleImageFileChangePerm}
                      />
                    )}
                    {!icon ? (
                      <UploadFile
                        uploadAs="JPG"
                        maxFileSize={2}
                        label="Upload Image"
                        handleFileChange={handleIconFileChangePerm}
                      />
                    ) : (
                      <PreviewFile
                        label="Icon"
                        selectedFile={icon as any}
                        handleFileChange={handleIconFileChangePerm}
                      />
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentCarousel ? 'Create Carousel' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Box>
        </FormProvider>
      </Box>
    </Dialog>
  );
}
