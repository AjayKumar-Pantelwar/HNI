import { yupResolver } from '@hookform/resolvers/yup';
import Close from '@mui/icons-material/Close';
import { Box, Button, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { PreviewFile } from 'src/components/preview-file';
import { UploadFile } from 'src/components/upload-file';
import { AdvantageSection, ConceptSection } from 'src/types/unverise/vas.types';
import * as Yup from 'yup';

interface Props {
  open: boolean;
  onClose: () => void;
  concept: ConceptSection | undefined;
  advantage: AdvantageSection | undefined;
}

const EditDetails = (props: Props) => {
  const { onClose, open, concept, advantage } = props;

  const addReportSchema = Yup.object().shape({
    conceptTitle: Yup.string()
      .required('Concept title is required')
      .max(30, 'Concept title must be less than 30 characters'),
    conceptDescription: Yup.string()
      .required('Concept Description is required')
      .max(80, 'Concept Description must be less than 80 characters'),
    advantageTitle: Yup.string()
      .required('Advantage title is required')
      .max(30, 'Advantage title must be less than 30 characters'),
    advantageDescription: Yup.string()
      .required('Advantage Description is required')
      .max(80, 'Advantage Description must be less than 80 characters'),

    image: Yup.mixed().nonNullable().required('Image is required'),
  });

  const defaultValues = {
    conceptTitle: concept?.concept_title || '',
    conceptDescription: concept?.concept_description || '',
    advantageTitle: advantage?.advantage_title || '',
    advantageDescription: advantage?.advantage_description || '',
    image: '',
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
  const onSubmit = handleSubmit(async (data) => {});

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
          <Typography variant="h5">Edit Details</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3} sx={{ alignItems: 'center' }}>
            <Grid item xs={12} md={6}>
              <Stack sx={{ gap: 3 }}>
                <RHFTextField
                  sx={{ flex: 1 }}
                  name="conceptTitle"
                  label="Bullet Point 1"
                  maxLimitCharacters={80}
                />
                <RHFTextField
                  sx={{ flex: 1 }}
                  name="conceptDescription"
                  label="Bullet Point 2"
                  maxLimitCharacters={80}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack sx={{ gap: 3 }}>
                <RHFTextField
                  sx={{ flex: 1 }}
                  name="advantageTitle"
                  label="Bullet Point 3"
                  maxLimitCharacters={80}
                />
                <RHFTextField
                  sx={{ flex: 1 }}
                  name="advantageDescription"
                  label="Bullet Point 4"
                  maxLimitCharacters={80}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              {!image ? (
                <UploadFile
                  uploadAs="JPG"
                  maxFileSize={2}
                  label="Upload Image"
                  handleFileChange={handleFileChangePerm}
                />
              ) : (
                <PreviewFile selectedFile={image as any} handleFileChange={handleFileChangePerm} />
              )}
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            Save Changes
          </Button>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default EditDetails;
