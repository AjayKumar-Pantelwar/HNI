import { Box, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
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

  const [deleteCard] = researchApi.useDeleteCardMutation();

  async function handleSubmit() {
    try {
      if (cardId) {
        await deleteCard({ id: cardId }).unwrap();
        enqueueSnackbar('Deleted successfully');
      }
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          minWidth: '500px',
          p: 3,
        },
      }}
    >
      <Stack>
        <DeleteLarge />
        <Typography variant="h6">Are you sure you want to delete this card?</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" fullWidth color="secondary">
            Cancel
          </Button>
          <Button variant="contained" fullWidth onClick={() => handleSubmit()}>
            Yes
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default DeleteCardModal;
