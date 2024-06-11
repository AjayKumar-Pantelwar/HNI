import { yupResolver } from '@hookform/resolvers/yup';
import Close from '@mui/icons-material/Close';
import { Box, Button, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { PreviewFile } from 'src/components/preview-file';
import { UploadFile } from 'src/components/upload-file';
import * as Yup from 'yup';

interface Props {
  open: boolean;
  onClose: () => void;
  card?: string[];
}

const EditSpecificationsModal = (props: Props) => {
  const { onClose, open, card } = props;

  const addReportSchema = Yup.object().shape({
    point1: Yup.string()
      .required('Point1 is required')
      .max(80, 'Point1 must be less than 80 characters'),
    point2: Yup.string()
      .required('Point2 is required')
      .max(80, 'Point2 must be less than 80 characters'),
    point3: Yup.string()
      .required('Point3 is required')
      .max(80, 'Point3 must be less than 80 characters'),
    point4: Yup.string()
      .required('Point4 is required')
      .max(80, 'Point4 must be less than 80 characters'),

    image: Yup.mixed().nonNullable().required('Image is required'),
  });

  const defaultValues = {
    point1: card?.[0] || '',
    point2: card?.[1] || '',
    point3: card?.[2] || '',
    point4: card?.[3] || '',
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
          <Typography variant="h5">Add Specifications</Typography>
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
                  name="point1"
                  label="Bullet Point 1"
                  maxLimitCharacters={80}
                />
                <RHFTextField
                  sx={{ flex: 1 }}
                  name="point2"
                  label="Bullet Point 2"
                  maxLimitCharacters={80}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack sx={{ gap: 3 }}>
                <RHFTextField
                  sx={{ flex: 1 }}
                  name="point3"
                  label="Bullet Point 3"
                  maxLimitCharacters={80}
                />
                <RHFTextField
                  sx={{ flex: 1 }}
                  name="point4"
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
            {card ? 'Save Changes' : 'Create Report'}
          </Button>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default EditSpecificationsModal;
