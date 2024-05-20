import { yupResolver } from '@hookform/resolvers/yup';
import Close from '@mui/icons-material/Close';
import { Box, Button, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { PreviewFile } from 'src/components/preview-file';
import { UploadFile } from 'src/components/upload-file';
import { ResearchCard } from 'src/types/content-management/research.types';
import * as Yup from 'yup';

interface Props {
  open: boolean;
  onClose: () => void;
  card?: ResearchCard;
}

const AddSpeakerModal = (props: Props) => {
  const { onClose, open, card } = props;

  const addReportSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    speakerName: Yup.string().required('Speaker Name is required'),
    description: Yup.string()
      .required('description is required')
      .max(87, 'description must be less than 150 characters'),
    logo: Yup.mixed().required('Logo is required'),
    image: Yup.mixed().required('Image is required'),
    video: Yup.mixed().required('video is required'),
  });

  const defaultValues = {
    title: card?.title || '',
    speakerName: '',
    description: '',
    logo: '',
    image: '',
    video: '',
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

  const onSubmit = handleSubmit(async (data) => {});

  const logo = watch('logo');

  const handleFileChangePerm = (file: File | null) => {
    setValue('logo', file as any);
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
                  name="description"
                  label="Description"
                  maxLimitCharacters={200}
                  multiline
                  rows={3}
                />
              </Stack>
            </Grid>
            <Grid item md={6} xs={12}>
              <Stack gap={3}>
                <RHFTextField name="speakerName" label="Tags" />
                {!logo ? (
                  <UploadFile
                    uploadAs="JPG"
                    maxFile={2}
                    label="Upload Logo"
                    handleFileChange={handleFileChangePerm}
                  />
                ) : (
                  <PreviewFile selectedFile={logo as any} handleFileChange={handleFileChangePerm} />
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            {card ? 'Save Changes' : 'Add Speaker'}
          </Button>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default AddSpeakerModal;
