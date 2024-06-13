import { yupResolver } from '@hookform/resolvers/yup';
import Close from '@mui/icons-material/Close';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { PreviewFile } from 'src/components/preview-file';
import { useSnackbar } from 'src/components/snackbar';
import { UploadFile } from 'src/components/upload-file';
import { VASApi } from 'src/redux/api/vas.api';
import { NbfcSpecializations } from 'src/types/unverise/vas.types';
import { convertToFD } from 'src/utils/convert-fd';
import { handleError } from 'src/utils/handle-error';
import * as Yup from 'yup';

interface Props {
  open: boolean;
  onClose: () => void;
  card?: NbfcSpecializations;
}

const EditSpecificationsModal = (props: Props) => {
  const { onClose, open, card } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [editDescription] = VASApi.useEditWillsDescriptionMutation();

  const addReportSchema = Yup.object().shape({
    description: Yup.array()
      .of(
        Yup.string()
          .required('description is required')
          .max(80, 'description must be less than 80 characters')
      )
      .required('description is required'),

    logo: Yup.mixed().nonNullable().required('Logo is required'),
  });

  const defaultValues = {
    description: card?.description || [],
    logo: card?.logo || '',
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

  const image = watch('logo');
  const onSubmit = handleSubmit(async (data) => {
    const formData = convertToFD({ id: card?.id, ...data });
    try {
      await editDescription(formData).unwrap();
      enqueueSnackbar('Added Successfully', { variant: 'success' });
    } catch (error) {
      handleError(error);
    } finally {
      onClose();
    }
  });

  const handleFileChangePerm = (file: File | null) => {
    setValue('logo', file as any);
  };

  const description = watch('description');

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
            {description?.map((p, i) => (
              <Grid item xs={12} md={6}>
                <RHFTextField
                  key={i}
                  fullWidth
                  name={`description.[${i}]`}
                  label={`Description ${i + 1}`}
                  maxLimitCharacters={80}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button fullWidth onClick={() => setValue('description', [...description, ''])}>
                Add Description
              </Button>
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
            {isSubmitting ? <CircularProgress /> : card ? 'Save Changes' : 'Create'}
          </Button>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default EditSpecificationsModal;
