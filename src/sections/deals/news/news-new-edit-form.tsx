'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Dialog } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { dealApi } from 'src/redux/api/deal.api';
import { AddNewsRequest } from 'src/types/deals.types';
import { convertUrlToFile } from 'src/utils/convert-url-to-file';
import { handleError } from 'src/utils/handle-error';
import * as Yup from 'yup';

type Props = {
  open: boolean;
  onClose: () => void;
  news?: AddNewsRequest & { id: string; thumbnail_link: string };
  dealId: string;
};

export default function NewsNewEditForm({ open, onClose, news, dealId }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const [addNews] = dealApi.useAddNewsMutation();
  const [editNews] = dealApi.useEditNewsMutation();

  const NewsSchema = Yup.object().shape({
    file: Yup.mixed().required('File is required').nullable(),
    article_link: Yup.string().required('Article Link is required'),
    title: Yup.string().required('Title is required'),
  });

  const defaultValues = useMemo<AddNewsRequest>(
    () => ({
      file: null,
      article_link: news?.article_link || '',
      title: news?.title || '',
    }),
    [news]
  );

  const methods = useForm({
    resolver: yupResolver(NewsSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (news) {
      reset(defaultValues);
      convertUrlToFile(news.thumbnail_link)
        .then((file) => {
          setValue(`file`, file);
        })
        .catch(handleError);
    }
  }, [news, defaultValues, reset, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        // @ts-ignore
        formData.append(key, data[key]);
      });

      if (news && news.id) {
        await editNews({ id: dealId, news_id: news.id, body: formData }).unwrap();
      } else {
        await addNews({ id: dealId, body: formData }).unwrap();
      }
      reset();
      onClose();
      enqueueSnackbar(news ? 'Update success' : 'Create success', { variant: 'success' });
    } catch (error) {
      handleError(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('file', newFiles[0], { shouldValidate: true });
    },
    [setValue]
  );

  return (
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
            {news ? 'Edit News' : 'Add News'}
          </Typography>
          <RHFTextField name="title" label="Title" />
          <RHFTextField name="article_link" label="Article Link" />
          <RHFUploadAvatar
            name="file"
            maxSize={3145728}
            onDrop={handleDrop}
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
          <LoadingButton
            sx={{ mt: 2 }}
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
          >
            {!news ? 'Add News' : 'Save Changes'}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Dialog>
  );
}
