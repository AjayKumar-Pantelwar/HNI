import { yupResolver } from '@hookform/resolvers/yup';
import Close from '@mui/icons-material/Close';
import { Box, Button, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { ReasonsWhy } from 'src/types/unverise/vas.types';
import * as Yup from 'yup';

interface Props {
  open: boolean;
  onClose: () => void;
  card?: ReasonsWhy;
}

const AddBenefitsModal = (props: Props) => {
  const { onClose, open, card } = props;

  const addReportSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .max(120, 'Title must be less than 120 characters'),
    points: Yup.array()
      .of(
        Yup.string().max(80, 'Point contains maximum 80 characters').required('Point is required')
      )
      .required('Points is required'),
  });

  const defaultValues = {
    title: card?.label || '',
    points: card?.items || [],
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

  const points = watch('points');

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
            <Grid item xs={12}>
              <RHFTextField fullWidth name="title" label="Title" maxLimitCharacters={80} />
            </Grid>
            {points.map((p, i) => (
              <Grid item xs={12} md={6}>
                <RHFTextField
                  key={i}
                  fullWidth
                  name={`points[${i}]`}
                  label={`Point ${i + 1}`}
                  maxLimitCharacters={80}
                />
              </Grid>
            ))}
          </Grid>

          <Button onClick={() => setValue('points', [...points, ''])}>Add Point</Button>
        </Stack>
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

export default AddBenefitsModal;
