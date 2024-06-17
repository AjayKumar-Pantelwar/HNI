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

const AddReportModal = (props: Props) => {
  const { onClose, open, card, page } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [updateCard] = researchApi.useUpdateCardMutation();
  const [addCard] = researchApi.useAddCardMutation();

  const addReportSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .max(40, 'Title must be less than 50 characters'),
    subtitle: Yup.string().required('Category is required'),
    sub_text1: Yup.string()
      .required('description is required')
      .max(87, 'description must be less than 150 characters'),
    image: Yup.mixed().nonNullable().required('Image is required'),
    pdf: Yup.mixed().nonNullable().required('Document is required'),
    card_id: Yup.string(),
    color: Yup.string(),
  });

  const defaultValues = {
    title: card?.title || '',
    subtitle: card?.subtitle || '',
    sub_text1: card?.sub_text1 || '',
    // expiryDate: '',
    image: card?.image_link || '',
    pdf: card?.pdf_link || '',
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
    video: card?.video_link || '',
    page_type: page?.type || '',
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

  const document = watch('pdf');

  const handleDocumentChangePerm = (
    file: File | null
    // key: keyof Yup.InferType<typeof addReportSchema>
  ) => {
    setValue('pdf', file as any);
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
          <Typography variant="h5">Add New Report</Typography>
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
                <RHFTextField
                  name="sub_text1"
                  label="Description"
                  maxLimitCharacters={87}
                  multiline
                  rows={3}
                />
                {!image ? (
                  <UploadFile
                    uploadAs="SVG"
                    maxFileSize={2}
                    accept={{ 'image/svg': ['.svg'] }}
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
                <RHFTextField name="subtitle" label="Category" />
                {/* <RHFDateField name="expriyDate" label="Date of Expiry" /> */}
                {!document ? (
                  <UploadFile
                    uploadAs="PDF"
                    maxFileSize={2}
                    label="Upload Document"
                    handleFileChange={handleDocumentChangePerm}
                    accept={{ 'application/pdf': ['.pdf'] }}
                  />
                ) : (
                  <PreviewFile
                    selectedFile={document as any}
                    handleFileChange={handleDocumentChangePerm}
                  />
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress /> : card ? 'Save Changes' : 'Create Report'}
          </Button>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default AddReportModal;
