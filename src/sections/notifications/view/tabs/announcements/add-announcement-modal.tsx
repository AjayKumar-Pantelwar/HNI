import Close from '@mui/icons-material/Close';
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Notifications } from 'src/types/notifications.types';
import AnnouncementForm from './announcement-form';

interface Props {
  open: boolean;
  onClose: () => void;
  notification?: Notifications;
}

const AddAnnouncementModal = (props: Props) => {
  const { onClose, open, notification } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          // p: 2,
          minWidth: '650px',
        },
      }}
    >
      <Stack sx={{ gap: 2 }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">
            {notification ? 'Edit Announcement' : 'Add New Announcement'}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <AnnouncementForm notification={notification} />
        </Box>
      </Stack>
    </Dialog>
  );
};

export default AddAnnouncementModal;
