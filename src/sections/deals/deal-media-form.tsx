'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Card, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import EmptyContent from 'src/components/empty-content/empty-content';
import FormProvider from 'src/components/hook-form';
import Iconify from 'src/components/iconify/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { dealApi } from 'src/redux/api/deal.api';
import { Deal, Media } from 'src/types/deals.types';
import { convertUrlToFile } from 'src/utils/convert-url-to-file';
import { handleError } from 'src/utils/handle-error';
import * as Yup from 'yup';
import MediaDeleteForm from './media/media-delete-form';
import MediaNewEditForm from './media/media-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  currentDeal: Deal;
};

export default function DealsMediaForm({ currentDeal }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const [updateMedia] = dealApi.useBasicInfoMediaMutation();

  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [selectedMedia, setSelectedMedia] = React.useState<Media>();
  const [isPitch, setIsPitch] = React.useState(false);

  const NewMediaSchema = Yup.object().shape({
    media: Yup.array()
      .of(
        Yup.object({
          link: Yup.string(),
          description: Yup.string().required(),
          thumbnail_link: Yup.string(),
          type: Yup.string().required(),
          priority: Yup.number().required(),
          is_published: Yup.string().required(),
          media: Yup.mixed().required().nullable(),
          thumbnail: Yup.mixed().required().nullable(),
        })
      )
      .required(),
  });

  const defaultValues = useMemo<Yup.InferType<typeof NewMediaSchema>>(
    () => ({
      media: currentDeal?.media?.map((m) => ({ ...m, media: null, thumbnail: null })) || [],
    }),
    [currentDeal]
  );

  const methods = useForm({
    resolver: yupResolver(NewMediaSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const media = watch('media');

  useEffect(() => {
    if (currentDeal) {
      reset(defaultValues);
      currentDeal.media?.forEach((m, index) => {
        convertUrlToFile(m.link)
          .then((file) => {
            setValue(`media.${index}.media`, file);
          })
          .catch(handleError);
        convertUrlToFile(m.thumbnail_link)
          .then((file) => {
            setValue(`media.${index}.thumbnail`, file);
          })
          .catch(handleError);
      });
    }
  }, [currentDeal, defaultValues, reset, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      const jsonMedia: Media[] = data.media.map((m) => ({
        link: m.link || '',
        description: m.description,
        is_published: m.is_published,
        priority: m.priority,
        thumbnail_link: m.thumbnail_link || '',
        type: m.type as Media['type'],
      }));

      formData.append('media', JSON.stringify(jsonMedia));

      data.media.forEach((m, index) => {
        if (m.media instanceof File) formData.append(`media_${index}`, m.media);
        if (m.thumbnail instanceof File) formData.append(`thumbnail_${index}`, m.thumbnail);
      });

      await updateMedia({ id: currentDeal.deal_id, body: formData }).unwrap();
      reset();
      enqueueSnackbar(currentDeal ? 'Update success' : 'Create success', { variant: 'success' });
    } catch (error) {
      handleError(error);
    }
  });

  const pitchVideo = media?.find((m) => m.type === 'pitch_video');
  const pitchVideoIndex = media?.findIndex((m) => m.type === 'pitch_video');

  return (
    <>
      <MediaNewEditForm
        open={open}
        isPitch={isPitch}
        selectedId={selectedId}
        onClose={() => {
          setOpen(false);
          setIsPitch(false);
          setSelectedId(null);
          setSelectedMedia(undefined);
        }}
        onMediaSubmit={(updatedMedia) => {
          console.log('MEDIA', updatedMedia);
          const newMedia = [...media];
          if (selectedId !== null) {
            newMedia[selectedId] = updatedMedia;
            setValue('media', newMedia);
          }
        }}
        media={selectedMedia}
      />
      <MediaDeleteForm
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setIsPitch(false);
          setSelectedId(null);
          setSelectedMedia(undefined);
        }}
        index={selectedId}
        onDelete={(index) => {
          const newMedia = [...media];
          if (index !== null) {
            newMedia.splice(index, 1);
            setValue('media', newMedia);
          }
        }}
      />
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1,
            mb: 2,
          }}
        >
          <Typography variant="h4">Pitch Video</Typography>
          <Button
            onClick={() => {
              setOpen(true);
              setIsPitch(true);
              setSelectedId(media.length);
            }}
            disabled={!!pitchVideo}
            variant="outlined"
            color="success"
          >
            Add Pitch Video
          </Button>
        </Box>
        {!pitchVideo ? (
          <EmptyContent filled title="No Pitch Video Added" sx={{ py: 10 }} />
        ) : (
          <Card sx={{ p: 2, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <img
                src={(media[pitchVideoIndex]?.thumbnail as any)?.preview}
                height="150px"
                alt={media[pitchVideoIndex].description}
              />
              <video
                src={(media[pitchVideoIndex]?.media as any)?.preview}
                style={{ height: '100%', maxHeight: '330px' }}
                controls
                loop
              />
              <Stack sx={{ height: '10%%', justifyContent: 'space-between' }}>
                <Typography>{pitchVideo.description}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                  <Button
                    color="error"
                    onClick={() => {
                      setDeleteOpen(true);
                      setSelectedId(pitchVideoIndex);
                    }}
                  >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    Delete
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Card>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1,
            my: 2,
          }}
        >
          <Typography variant="h4">Media Gallery</Typography>
          <Button
            onClick={() => {
              setOpen(true);
              setSelectedId(media.length);
            }}
            variant="outlined"
            color="success"
          >
            Add Media
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {!media || media.filter((m) => m.type !== 'pitch_video').length === 0 ? (
            <EmptyContent filled title="No Media Added" sx={{ py: 10 }} />
          ) : (
            media.map((m, index) =>
              m.type === 'pitch_video' ? null : (
                <Card sx={{ p: 2, width: 300 }}>
                  <Stack sx={{ gap: 2 }}>
                    {media[index]?.type === 'video/mp4' ? (
                      <video
                        src={(media[index]?.media as any)?.preview}
                        style={{ height: '100%', maxHeight: '330px' }}
                        controls
                        loop
                      />
                    ) : (
                      <img
                        src={(media[index]?.media as any)?.preview}
                        height="150px"
                        alt={m.description}
                      />
                    )}
                    <Typography>{m.description}</Typography>
                    <Button
                      color="error"
                      onClick={() => {
                        setDeleteOpen(true);
                        setSelectedId(index);
                      }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" />
                      Delete
                    </Button>
                  </Stack>
                </Card>
              )
            )
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            // flexDireection: 'row-reverse',
            alignItems: 'center',
            py: 1,
            my: 2,
          }}
        >
          <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Box>
      </FormProvider>
    </>
  );
}
