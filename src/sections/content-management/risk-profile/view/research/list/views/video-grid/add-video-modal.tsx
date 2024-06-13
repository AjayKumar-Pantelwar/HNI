import { yupResolver } from '@hookform/resolvers/yup';
import Close from '@mui/icons-material/Close';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { PreviewFile } from 'src/components/preview-file';
import { useSnackbar } from 'src/components/snackbar';
import { UploadFile } from 'src/components/upload-file';
import { researchApi } from 'src/redux/api/research.api';
import { ResearchCard, ResearchRecord } from 'src/types/content-management/research.types';
import { convertToFD } from 'src/utils/convert-fd';
import { handleError } from 'src/utils/handle-error';

import * as Yup from 'yup';

interface Props {
  open: boolean;
  onClose: () => void;
  card?: ResearchCard;
  page: ResearchRecord;
}

const AddVideoModal = (props: Props) => {
  const { onClose, open, card, page } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [updateCard] = researchApi.useUpdateCardMutation();
  const [addCard] = researchApi.useAddCardMutation();

  const addReportSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .max(40, 'Title must be less than 50 characters'),
    image: Yup.mixed().nonNullable().required('Image is required'),
    video: Yup.mixed().nonNullable().required('Document is required'),
  });

  const defaultValues = {
    title: card?.title || '',
    subtitle: card?.subtitle || '',
    sub_text1: card?.sub_text1 || '',
    // expiryDate: '',
    image: card?.image || '',
    pdf: card?.pdf || '',
    card_id: card?.card_id || '',
    color: card?.color || '',
    field1: card?.field1 || '',
    field2: card?.field2 || '',
    field3: card?.field3 || '',
    link: card?.link || '',
    logo: card?.logo || '',
    page_id: page?.page_id || '',
    sub_text2: card?.sub_text2 || '',
    sub_text3: card?.sub_text3 || '',
    tags: card?.tags || [],
    text: card?.text || '',
    video: card?.video || '',
    page_type: page?.type || '',
    article: card?.article || '',
  };

  const methods = useForm({
    resolver: yupResolver(addReportSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = methods;

  const image = watch('image');

  const handleImageChangePerm = (file: File | null) => {
    setValue('image', file as any);
  };

  const video = watch('video');

  const handleVideoChangePerm = (file: File | null) => {
    setValue('video', file as any);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (card) {
        await updateCard({ body: convertToFD(data), id: card?.card_id }).unwrap();
        enqueueSnackbar('Update success!');
      } else {
        await addCard(convertToFD(data)).unwrap();
        enqueueSnackbar('Add success!');
      }
    } catch (error) {
      handleError(error);
    } finally {
      onClose();
    }
  });

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
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
          <Typography variant="h5">Add New Video</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Stack gap={3}>
                <RHFTextField name="title" label="Title" maxLimitCharacters={40} />

                {!image ? (
                  <UploadFile
                    uploadAs="SVG"
                    maxFileSize={2}
                    label="Upload Image"
                    handleFileChange={handleImageChangePerm}
                  />
                ) : (
                  <PreviewFile
                    selectedFile={image as any}
                    handleFileChange={handleImageChangePerm}
                  />
                )}
              </Stack>
            </Grid>
            <Grid item md={6} xs={12}>
              <Stack gap={3}>
                {!video ? (
                  <UploadFile
                    uploadAs="MP4"
                    maxFileSize={88}
                    label="Upload Video"
                    handleFileChange={handleVideoChangePerm}
                    accept={{ 'video/mp4': ['.mp4'] }}
                  />
                ) : (
                  <PreviewFile
                    selectedFile={video as any}
                    handleFileChange={handleVideoChangePerm}
                  />
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress /> : card ? 'Save Changes' : 'Create Video'}
          </Button>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default AddVideoModal;