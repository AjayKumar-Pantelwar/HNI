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
import { useSnackbar } from 'src/components/snackbar';
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

const AddBenefitsModal = (props: Props) => {
  const { onClose, open, card } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [editDescription] = VASApi.useEditWillsDescriptionMutation();

  const addReportSchema = Yup.object().shape({
    description: Yup.array()
      .of(
        Yup.string()
          .required('description is required')
          .max(200, 'description must be less than 200 characters')
      )
      .required('description is required'),
  });

  const defaultValues = {
    description: card?.description || [],
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

  const points = watch('description');

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
          <Typography variant="h5">Edit Benefits of Estate Planning</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Stack sx={{ p: 3, gap: 2 }}>
          <Grid container spacing={3}>
            {points.map((p, i) => (
              <Grid item xs={12} md={6}>
                <RHFTextField
                  key={i}
                  fullWidth
                  name={`description[${i}]`}
                  label={`Point ${i + 1}`}
                  maxLimitCharacters={80}
                />
              </Grid>
            ))}
          </Grid>

          <Button onClick={() => setValue('description', [...points, ''])}>Add Point</Button>
        </Stack>
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

export default AddBenefitsModal;
