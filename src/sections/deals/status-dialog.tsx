import { LoadingButton } from '@mui/lab';
import { Dialog, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { dealApi } from 'src/redux/api/deal.api';
import { handleError } from 'src/utils/handle-error';

type Props = { open: boolean; id: string; status: boolean; onClose: () => void };

export const StatusDialog = ({ open, onClose, id, status }: Props) => {
  const [updateStatus] = dealApi.useDealStatusMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    try {
      await updateStatus({ deal_id: id, status: !status }).unwrap();
      onClose();
      enqueueSnackbar(status ? 'Unpublished successfully' : 'Published successfully', {
        variant: 'success',
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <Stack gap={1} p={2}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {status ? 'Unpublish' : 'Publish'} Deal
        </Typography>
        <Typography>
          Are you sure you want to {status ? 'unpublish' : 'publish'} this deal?
        </Typography>
        <LoadingButton
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          color={status ? 'error' : 'success'}
          variant="contained"
          size="large"
        >
          {status ? 'Unpublish' : 'Publish'}
        </LoadingButton>
      </Stack>
    </Dialog>
  );
};
