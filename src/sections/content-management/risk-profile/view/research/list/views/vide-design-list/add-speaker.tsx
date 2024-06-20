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

const AddSpeakerModal = (props: Props) => {
  const { onClose, open, card, page } = props;

  const { enqueueSnackbar } = useSnackbar();
  const [updateCard] = researchApi.useUpdateCardMutation();
  const [addCard] = researchApi.useAddCardMutation();

  const addReportSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    text: Yup.string().required('Speaker Name is required'),
    sub_text1: Yup.string()
      .required('designation is required')
      .max(87, 'designation must be less than 150 characters'),
    logo: Yup.mixed().required('Logo is required'),
    image_link: Yup.mixed().required('Image is required'),
    video_link: Yup.mixed().required('video is required'),
  });

  const defaultValues: ResearchCard = {
    title: card?.title || '',
    logo: card?.logo || '',
    image_link: card?.image_link || '',
    pdf_link: card?.pdf_link || '',
    card_id: card?.card_id || '',
    color: card?.color || '',
    field1: card?.field1 || '',
    field2: card?.field2 || '',
    field3: card?.field3 || '',
    link: card?.link || '',
    page_id: page?.page_id || '',
    sub_text2: card?.sub_text2 || '',
    sub_text3: card?.sub_text3 || '',
    sub_text1: card?.sub_text1 || '',
    tags: card?.tags || [{ key: 'type', value: '' }],
    text: card?.text || '',
    video_link: card?.video_link || '',
    page_type: page?.type || '',
    article_link: card?.article_link || '',
    subtitle: card?.subtitle || '',
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

  const logo = watch('logo');

  const handleFileChangePerm = (file: File | null) => {
    setValue('logo', file as any);
  };

  const image = watch('image_link');

  const handleImageChangePerm = (file: File | null) => {
    setValue('image_link', file as any);
  };

  const video = watch('video_link');

  const handleVideoChangePerm = (file: File | null) => {
    setValue('video_link', file as any);
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
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
          <Typography variant="h5">Add New Speaker</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Stack gap={3}>
                <RHFTextField name="title" label="Title" />
                <RHFTextField name="sub_text1" label="Designation" maxLimitCharacters={200} />
                {!video ? (
                  <UploadFile
                    uploadAs="MP4"
                    maxFileSize={800}
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
            <Grid item md={6} xs={12}>
              <Stack gap={3}>
                <RHFTextField name="text" label="Speaker Name" />
                {!logo ? (
                  <UploadFile
                    uploadAs="JPG"
                    maxFileSize={2}
                    label="Upload Logo"
                    handleFileChange={handleFileChangePerm}
                    accept={{ 'image/jpg': ['.jpg'] }}
                  />
                ) : (
                  <PreviewFile selectedFile={logo as any} handleFileChange={handleFileChangePerm} />
                )}
                {!image ? (
                  <UploadFile
                    uploadAs="JPG"
                    maxFileSize={2}
                    label="Upload Image"
                    handleFileChange={handleImageChangePerm}
                    accept={{ 'image/jpg': ['.jpg'] }}
                  />
                ) : (
                  <PreviewFile
                    selectedFile={image as any}
                    handleFileChange={handleImageChangePerm}
                  />
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            {isSubmitting ? <CircularProgress size={22} /> : card ? 'Save Changes' : 'Add Speaker'}
          </Button>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default AddSpeakerModal;
