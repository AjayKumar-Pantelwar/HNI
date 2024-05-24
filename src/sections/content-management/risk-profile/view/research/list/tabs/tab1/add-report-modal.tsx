import { yupResolver } from '@hookform/resolvers/yup';
import Close from '@mui/icons-material/Close';
import { Box, Button, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import RHFDateField from 'src/components/hook-form/rhf-date-field';
import { ResearchCard } from 'src/types/content-management/research.types';
import * as Yup from 'yup';

interface Props {
  open: boolean;
  onClose: () => void;
  card?: ResearchCard;
}

const AddReportModal = (props: Props) => {
  const { onClose, open, card } = props;

  const addReportSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .max(40, 'Title must be less than 50 characters'),
    category: Yup.string().required('Category is required'),
    description: Yup.string()
      .required('description is required')
      .max(87, 'description must be less than 150 characters'),
    expiryDate: Yup.string().required('Expire Date is required'),
    image: Yup.mixed().nonNullable().required('Image is required'),
    document: Yup.mixed().nonNullable().required('Document is required'),
  });

  const defaultValues = {
    title: card?.title || '',
    category: '',
    description: '',
    expiryDate: '',
    image: '',
    document: '',
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
  } = methods;

  const onSubmit = handleSubmit(async (data) => {});

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
                  name="description"
                  label="Description"
                  maxLimitCharacters={87}
                  multiline
                  rows={3}
                />
              </Stack>
            </Grid>
            <Grid item md={6} xs={12}>
              <Stack gap={3}>
                <RHFTextField name="category" label="Category" />
                <RHFDateField name="expriyDate" label="Date of Expiry" />
              </Stack>
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

export default AddReportModal;
