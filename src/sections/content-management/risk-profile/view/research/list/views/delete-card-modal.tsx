import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import DeleteLarge from 'src/assets/icons/delete-large';
import { useSnackbar } from 'src/components/snackbar';
import { researchApi } from 'src/redux/api/research.api';
import { handleError } from 'src/utils/handle-error';

interface Props {
  open: boolean;
  onClose: () => void;
  cardId: string;
}

const DeleteCardModal = (props: Props) => {
  const { onClose, open, cardId } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const [deleteCard] = researchApi.useDeleteCardMutation();

  async function handleSubmit() {
    try {
      setLoading(true);
      if (cardId) {
        await deleteCard({ id: cardId }).unwrap();
        enqueueSnackbar('Deleted successfully');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          minWidth: '300px',
          p: 3,
        },
      }}
    >
      <Stack sx={{ alignItems: 'center', gap: 3 }}>
        <DeleteLarge />
        <Typography variant="h6">Are you sure you want to delete this card?</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" fullWidth color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" fullWidth onClick={() => handleSubmit()} disabled={loading}>
            {loading ? <CircularProgress size={22} /> : 'Yes'}
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default DeleteCardModal;
