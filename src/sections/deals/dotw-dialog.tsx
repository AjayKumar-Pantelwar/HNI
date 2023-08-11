import { LoadingButton } from '@mui/lab';
import { Dialog, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { dealApi } from 'src/redux/api/deal.api';
import { handleError } from 'src/utils/handle-error';

type Props = { open: boolean; id: string; onClose: () => void };

export const DotwDialog = ({ open, onClose, id }: Props) => {
  const [updateDeal] = dealApi.useDealOfTheWeekMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    try {
      await updateDeal(id).unwrap();
      onClose();
      enqueueSnackbar('Update deal of the week successfully', { variant: 'success' });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <Stack gap={1} p={2}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Deal of the week
        </Typography>
        <Typography>Are you sure you want to set this deal as deal of the week?</Typography>
        <LoadingButton
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          color="success"
          variant="contained"
          size="large"
        >
          Yes
        </LoadingButton>
      </Stack>
    </Dialog>
  );
};
