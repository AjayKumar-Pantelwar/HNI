'use client';

import LoadingButton from '@mui/lab/LoadingButton';
import { Dialog } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { handleError } from 'src/utils/handle-error';

type Props = {
  open: boolean;
  onClose: () => void;
  onDelete: (index: number | null) => void;
  index: number | null;
};

export default function MediaDeleteForm({ open, index, onClose, onDelete }: Props) {
  const handleSubmit = async () => {
    try {
      onDelete(index);
      onClose();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <Stack gap={1} p={2}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Delete Media
        </Typography>
        <Typography>Are you sure you want to delete the selected media?</Typography>
        <LoadingButton
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          color="error"
          variant="contained"
          size="large"
        >
          Delete
        </LoadingButton>
      </Stack>
    </Dialog>
  );
}
