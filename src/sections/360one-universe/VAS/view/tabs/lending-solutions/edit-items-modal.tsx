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

const EditItemsModal = (props: Props) => {
  const { onClose, open, card } = props;

  const [addDescription] = VASApi.useEditLendingSolutionsDescriptionMutation();
  const [editDescription] = VASApi.useEditLendingSolutionsDescriptionMutation();

  const { enqueueSnackbar } = useSnackbar();

  const addReportSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .max(40, 'Title must be less than 40 characters'),
    description: Yup.array()
      .of(
        Yup.string()
          .required('description is required')
          .max(200, 'description must be less than 200 characters')
      )
      .required('description is required'),
    logo: Yup.mixed().nonNullable().required('logo is required'),
  });

  const defaultValues = {
    title: card?.title || '',
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

  const logo = watch('logo');

  const onSubmit = handleSubmit(async (data) => {
    const formData = card ? convertToFD({ id: card?.id, ...data }) : convertToFD(data);
    try {
      if (card) {
        await editDescription(formData).unwrap();
        enqueueSnackbar('Added Successfully', { variant: 'success' });
      } else {
        await addDescription(formData).unwrap();
        enqueueSnackbar('Edited Successfully', { variant: 'success' });
      }
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
          <Typography variant="h5">Add New Item</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3} sx={{ alignItems: 'center' }}>
            <Grid item xs={12}>
              <Stack sx={{ gap: 3 }}>
                <RHFTextField sx={{ flex: 1 }} name="title" label="Title" maxLimitCharacters={40} />
                {!logo ? (
                  <UploadFile
                    uploadAs="JPG"
                    maxFileSize={2}
                    label="Upload Image"
                    handleFileChange={handleFileChangePerm}
                  />
                ) : (
                  <PreviewFile selectedFile={logo as any} handleFileChange={handleFileChangePerm} />
                )}
              </Stack>
            </Grid>
            {description?.map((p, i) => (
              <Grid item xs={12} md={6}>
                <RHFTextField
                  key={i}
                  fullWidth
                  name={`description[${i}]`}
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
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress /> : card ? 'Save Changes' : 'Create'}
          </Button>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default EditItemsModal;
