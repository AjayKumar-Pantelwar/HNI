'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Dialog } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { EditDialog } from 'src/components/edit-dialog';
import FormProvider, { RHFTextField, RHFUpload } from 'src/components/hook-form';
import { Media } from 'src/types/deals.types';
import { convertUrlToFile } from 'src/utils/convert-url-to-file';
import { handleError } from 'src/utils/handle-error';
import * as Yup from 'yup';

type Props = {
  open: boolean;
  selectedId: number | null;
  onClose: () => void;
  onMediaSubmit: (media: Media & { media: any | null; thumbnail: any | null }) => void;
  media?: Media;
  isPitch?: boolean;
};

export default function MediaNewEditForm({
  open,
  selectedId,
  onClose,
  onMediaSubmit,
  isPitch,
  media,
}: Props) {
  const MediaSchema = Yup.object({
    link: Yup.string(),
    description: Yup.string().required(),
    thumbnail_link: Yup.string(),
    type: Yup.string().required(),
    priority: Yup.number().required(),
    is_published: Yup.string().required(),
    media: Yup.mixed().required().nullable(),
    thumbnail: Yup.mixed().required().nullable(),
  });

  const [mediaDetails, setMediaDetails] = React.useState<File>();

  const defaultValues = useMemo(
    () => ({
      link: '',
      description: media?.description || '',
      thumbnail_link: '',
      type: isPitch ? 'pitch_video' : media?.type || 'image',
      priority: media?.priority || 0,
      is_published: media?.is_published || 'true',
      media: null,
      thumbnail: null,
    }),
    [media, isPitch]
  );

  const methods = useForm({
    resolver: yupResolver(MediaSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (media) {
      reset(defaultValues);
      convertUrlToFile(media.link)
        .then((file) => {
          setValue(`media`, file);
        })
        .catch(handleError);
      convertUrlToFile(media.thumbnail_link)
        .then((file) => {
          setValue(`thumbnail`, file);
        })
        .catch(handleError);
    }
  }, [media, defaultValues, reset, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      onMediaSubmit({
        ...data,
        link: data.link || '',
        thumbnail_link: data.thumbnail_link || '',
        type: isPitch ? 'pitch_video' : (data.type as Media['type']),
      });
      reset();
      onClose();
    } catch (error) {
      handleError(error);
    }
  });

  const handleDrop = useCallback(
    (key: 'media' | 'thumbnail') => (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setValue(key, newFiles[0], { shouldValidate: true });
      setMediaDetails(newFiles[0]);
    },

    [setValue]
  );

  console.log(mediaDetails);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={false}
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}
      >
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack gap={1} p={2}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {media ? 'Edit Media' : 'Add Media'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box flex={1}>
                <Typography variant="subtitle2">{isPitch ? 'Video' : 'Image'}</Typography>
                <RHFUpload
                  name="media"
                  maxSize={5 * 1024 * 1024}
                  accept={
                    isPitch
                      ? {
                          'video/mp4': ['.mp4', '.MP4'],
                        }
                      : {
                          'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
                        }
                  }
                  onDrop={handleDrop('media')}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 3,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.disabled',
                      }}
                    >
                      Allowed {isPitch ? '*.mp4' : '*.jpeg, *.jpg, *.png, *.gif'}
                    </Typography>
                  }
                />
              </Box>
              {isPitch && (
                <Box flex={1}>
                  <Typography variant="subtitle2">Thumbnail</Typography>
                  <RHFUpload
                    name="thumbnail"
                    maxSize={3 * 1024 * 1024}
                    onDrop={handleDrop('thumbnail')}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 3,
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
                </Box>
              )}
            </Box>
            <RHFTextField name="description" label="Description" />
            <LoadingButton
              sx={{ mt: 2 }}
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              {!media ? 'Add Media' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Dialog>
      {mediaDetails && (
        <EditDialog
          open
          base64={URL.createObjectURL(mediaDetails)}
          filename={mediaDetails.name}
          onChange={(file) => {
            if (file === null) return;
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
            setValue('media', file);
          }}
          onClose={() => setMediaDetails(undefined)}
          aspectRatio="4 / 3"
        />
      )}
    </>
  );
}
