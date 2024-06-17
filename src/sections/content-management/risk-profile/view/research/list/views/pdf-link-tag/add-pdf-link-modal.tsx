import { yupResolver } from '@hookform/resolvers/yup';
import Close from '@mui/icons-material/Close';
import { Box, Button, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
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

const AddPDFLinkModal = (props: Props) => {
  const { onClose, open, card, page } = props;

  const { enqueueSnackbar } = useSnackbar();
  const [updateCard] = researchApi.useUpdateCardMutation();
  const [addCard] = researchApi.useAddCardMutation();

  const addReportSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    tags: Yup.string().required('Tags is required'),
    subtitle: Yup.string()
      .required('description is required')
      .max(200, 'description must be less than 150 characters'),
    // uploadDate: Yup.string().required('Upload Date is required'),
    image: Yup.mixed().nonNullable().required('Image is required'),
    link: Yup.string().required('Link is required'),
  });

  const defaultValues = {
    title: card?.title || '',
    // uploadDate: '',
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
    tags: card?.tags.join(',') || '',
    text: card?.text || '',
    video: card?.video_link || '',
    page_type: page?.type || '',
    article: card?.article_link || '',
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
    const fdata = { ...data, tags: data.tags.split(',') };
    try {
      if (card) {
        await updateCard({ body: convertToFD(fdata), id: card?.card_id }).unwrap();
        enqueueSnackbar('Update success!');
      } else {
        await addCard(convertToFD(fdata)).unwrap();
        enqueueSnackbar('Add success!');
      }
    } catch (error) {
      handleError(error);
    } finally {
      onClose();
    }
  });

  const image = watch('image');

  const handleFileChangePerm = (file: File | null) => {
    setValue('image', file as any);
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
          <Typography variant="h5">Add News</Typography>
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
                <RHFTextField
                  name="subtitle"
                  label="Description"
                  maxLimitCharacters={200}
                  multiline
                  rows={3}
                />
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
              </Stack>
            </Grid>
            <Grid item md={6} xs={12}>
              <Stack gap={3}>
                <RHFTextField name="tags" label="Tags" />
                <RHFTextField name="link" label="Link" />
                {/* <RHFDateField name="uploadDate" label="Upload Date" /> */}
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            {card ? 'Save Changes' : 'Create Article Link'}
          </Button>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default AddPDFLinkModal;
