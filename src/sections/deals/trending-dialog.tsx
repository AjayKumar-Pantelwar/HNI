import { LoadingButton } from '@mui/lab';
import { Dialog, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { dealApi } from 'src/redux/api/deal.api';
import { handleError } from 'src/utils/handle-error';

type Props = { open: boolean; id: string; status: boolean; onClose: () => void };

export const TrendingDialog = ({ open, onClose, id, status }: Props) => {
  const [updateTrending] = dealApi.useTrendingDealMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    try {
      await updateTrending({ deal_ids: [id], status }).unwrap();
      onClose();
      enqueueSnackbar('Update trending successfully', { variant: 'success' });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <Stack gap={1} p={2}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {status ? 'Add to trending' : 'Remove from trending'}
        </Typography>
        <Typography>
          Are you sure you want to {status ? 'add' : 'remove'} this deal {status ? 'to' : 'from'}{' '}
          trending?
        </Typography>
        <LoadingButton
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          color={status ? 'success' : 'error'}
          variant="contained"
          size="large"
        >
          {status ? 'Add' : 'Remove'}
        </LoadingButton>
      </Stack>
    </Dialog>
  );
};
