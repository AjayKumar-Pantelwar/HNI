'use client';

import Close from '@mui/icons-material/Close';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from 'react';
import { VASApi } from 'src/redux/api/vas.api';
import { handleError } from 'src/utils/handle-error';

interface Props {
  open: boolean;
  onClose: () => void;
  tabName: string;
  tid: string;
}

const EditTabName = (props: Props) => {
  const { onClose, open, tabName, tid } = props;

  const [value, setValue] = useState('');

  const [loading, setLoading] = useState(false);

  const [editTabName] = VASApi.useEditTabNameMutation();

  useEffect(() => {
    if (tabName) {
      setValue(tabName);
    }
  }, [tabName]);

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (tid && value) {
        await editTabName({ id: tid, name: value }).unwrap();
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

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
          <Typography variant="h5">Edit Tab Name</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 3 }}>
          <Stack sx={{ minHeight: '150px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Tab Name
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
          <Button variant="contained" onClick={onSubmit} disabled={!value || loading}>
            {loading ? <CircularProgress /> : 'Save Changes'}
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default EditTabName;
