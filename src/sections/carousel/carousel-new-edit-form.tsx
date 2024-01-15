'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { EditDialog } from 'src/components/edit-dialog';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUpload,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { carouselApi } from 'src/redux/api/carousel.api';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { Carousel } from 'src/types/carousel.types';
import { convertToFD } from 'src/utils/convert-fd';
import * as Yup from 'yup';

// ----------------------------------------------------------------------

type Props = {
  currentCarousel?: Carousel;
};

export default function CarouselNewEditForm({ currentCarousel }: Props) {
  const router = useRouter();

  const [insertCarousel] = carouselApi.useInsertCarouselMutation();
  const [editCarousel] = carouselApi.useEditCarouselMutation();

  const [icon, setIcon] = React.useState<File>();
  const [media, setMedia] = React.useState<File>();

  const { enqueueSnackbar } = useSnackbar();

  const CarouselSchema = Yup.object().shape({
    title: Yup.object().shape({
      normal: Yup.string().required('Title is required'),
      bold: Yup.string().required('Title is required'),
    }),
    subtitle: Yup.object().shape({
      number: Yup.number().required('Subtitle is required'),
      data: Yup.string().required('Subtitle is required'),
      suffix: Yup.string().required('Subtitle is required'),
    }),
    icon: Yup.mixed<any>().nullable().required('Icon is required'),
    media_url: Yup.mixed<any>().nullable().required('Media URL is required'),
    is_active: Yup.bool().required('Is Active is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: {
        normal: currentCarousel?.title?.normal || '',
        bold: currentCarousel?.title?.bold || '',
      },
      subtitle: {
        number: currentCarousel?.subtitle?.number || 0,
        data: currentCarousel?.subtitle?.data || '',
        suffix: currentCarousel?.subtitle?.suffix || '',
      },
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
      router.push(paths.dashboard.roles.list);
    } catch (error) {
      enqueueSnackbar(error.error, { variant: 'error' });
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (key: string) => (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      if (key === 'media_url') {
        setMedia(newFiles[0]);
      } else if (key === 'icon') {
        setIcon(newFiles[0]);
      }
    },
    []
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      setValue('media_url', null);
    },
    [setValue]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('media_url', null);
  }, [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Stack sx={{ gap: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <RHFSwitch name="is_active" label="Is Active" />
          </Box>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <RHFTextField name="title.bold" label="Choose title bold" fullWidth />
            <RHFTextField name="title.normal" label="Choose title normal" fullWidth />
          </Box>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <RHFTextField
              name="subtitle.number"
              label="Choose subtitle number"
              type="number"
              fullWidth
            />
            <RHFTextField name="subtitle.suffix" label="Choose subtitle suffix" fullWidth />
          </Box>
          <RHFTextField name="subtitle.data" label="Choose subtitle data" fullWidth />
          <RHFUploadAvatar
            name="icon"
            maxSize={3145728}
            onDrop={handleDrop('icon')}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  mt: 3,
                  mb: 3,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.disabled',
                }}
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif
              </Typography>
            }
          />
          <RHFUpload
            thumbnail
            name="media_url"
            maxSize={3145728}
            onDrop={handleDrop('media_url')}
            onRemove={handleRemoveFile}
            onRemoveAll={handleRemoveAllFiles}
          />
        </Stack>

        {icon && (
          <EditDialog
            open
            base64={URL.createObjectURL(icon)}
            filename={icon.name}
            onChange={(file) => {
              if (file === null) return;
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              });
              setValue('icon', file);
            }}
            onClose={() => setIcon(undefined)}
            aspectRatio="1 / 1"
          />
        )}
        {media && (
          <EditDialog
            open
            base64={URL.createObjectURL(media)}
            filename={media.name}
            onChange={(file) => {
              if (file === null) return;
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              });
              setValue('media_url', file);
            }}
            onClose={() => setMedia(undefined)}
            aspectRatio="3.5/2"
          />
        )}
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!currentCarousel ? 'Create Carousel' : 'Save Changes'}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
