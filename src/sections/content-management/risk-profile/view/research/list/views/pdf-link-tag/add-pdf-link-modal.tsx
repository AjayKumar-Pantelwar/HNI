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
import DeleteIcon from 'src/assets/icons/delete-icon';
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
    tags: Yup.array()
      .of(
        Yup.object().shape({
          key: Yup.string().required('key is required'),
          value: Yup.string().required('value is required'),
        })
      )
      .required('Tags are required'),
    image_link: Yup.mixed().nonNullable().required('Image is required'),
    article_link: Yup.string().required('Link is required'),
  });

  const defaultValues: ResearchCard = {
    title: card?.title || '',
    subtitle: card?.subtitle || '',
    sub_text1: card?.sub_text1 || '',
    image_link: card?.image_link || '',
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
    tags: card?.tags || [{ key: 'type', value: '' }],
    text: card?.text || '',
    video_link: card?.video_link || '',
    page_type: page?.type || '',
    article_link: card?.article_link || '',
    pdf_link: card?.pdf_link || '',
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

  const image = watch('image_link');

  const handleFileChangePerm = (file: File | null) => {
    setValue('image_link', file as any);
  };

  const tags = watch('tags');

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
          <Typography variant="h5">Add New Article</Typography>
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
                {!image ? (
                  <UploadFile
                    uploadAs="PNG"
                    maxFileSize={2}
                    label="Upload Image"
                    handleFileChange={handleFileChangePerm}
                    accept={{ 'image/png': ['.png'] }}
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
              <RHFTextField name="article_link" label="Link" />
            </Grid>
            {tags?.map((p, i) => (
              <Grid item xs={12} key={i}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                  <RHFTextField
                    stackProps={{
                      sx: {
                        width: '100%',
                      },
                    }}
                    fullWidth
                    key={tags?.length}
                    name={`tags[${i}].value`}
                    label={`Tag ${i + 1}`}
                    maxLimitCharacters={80}
                  />
                  <IconButton
                    sx={{ mt: 1 }}
                    onClick={() => {
                      console.log(i, tags);
                      setValue('tags', tags?.filter((_, index) => index !== i) || []);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                fullWidth
                onClick={() =>
                  setValue('tags', [
                    ...(tags || []),
                    {
                      key: 'type',
                      value: '',
                    },
                  ])
                }
              >
                Add Tags
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            {isSubmitting ? (
              <CircularProgress size={22} />
            ) : card ? (
              'Save Changes'
            ) : (
              'Create Article Link'
            )}
          </Button>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default AddPDFLinkModal;
