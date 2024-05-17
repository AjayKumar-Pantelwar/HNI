import Close from '@mui/icons-material/Close';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Notifications } from 'src/types/notifications.types';
import AnnouncementForm from './announcement-form';

interface Props {
  open: boolean;
  onClose: () => void;
  notification: Notifications;
}

const AddAnnouncementModal = (props: Props) => {
  const { onClose, open, notification } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          p: 2,
          minWidth: '650px',
        },
      }}
    >
      <Stack gap={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">
            {notification ? 'Edit Announcement' : 'Add New Announcement'}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <AnnouncementForm notification={notification} />
      </Stack>
    </Dialog>
  );
};

export default AddAnnouncementModal;
