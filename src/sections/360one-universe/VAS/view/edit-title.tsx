import Close from '@mui/icons-material/Close';
import { Box, Button, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  onSubmit?: () => void;
}

const EditTitle = (props: Props) => {
  const { onClose, open, title, onSubmit } = props;

  const [value, setValue] = useState('');

  useEffect(() => {
    if (title) {
      setValue(title);
    }
  }, [title]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
      }}
      PaperProps={{
        sx: {
          minWidth: '600px',
        },
      }}
    >
      <Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
          <Typography variant="h5">Edit Title Name</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 3 }}>
          <Stack sx={{ minHeight: '150px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Title Name
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Max Limit: 40 Characters
              </Typography>
            </Box>
            <TextField value={value} onChange={(e) => setValue(e.target.value)} />
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'end', p: 3 }}>
          <Button variant="contained" disabled={!value} onClick={onSubmit}>
            Save Changes
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default EditTitle;
