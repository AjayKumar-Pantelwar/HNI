import Close from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Box, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'src/components/snackbar';
import { researchApi } from 'src/redux/api/research.api';
import { handleError } from 'src/utils/handle-error';

interface Props {
  open: boolean;
  onClose: () => void;
  tabName: string;
  tabId: string;
}

const EditTabName = (props: Props) => {
  const { onClose, open, tabName, tabId } = props;

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [updateTab] = researchApi.useUpdateTabMutation();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (tabName) {
      setValue(tabName);
    }
  }, [tabName]);

  async function handleSubmit() {
    console.log({ value, tabId });

    try {
      setIsLoading(true);
      if (value && tabId) {
        await updateTab({ tab_name: value, tab_id: tabId }).unwrap();
        enqueueSnackbar('Update success!');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  }

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
          <LoadingButton
            disabled={!value || isLoading}
            loading={isLoading}
            variant="contained"
            onClick={() => handleSubmit()}
          >
            Save Changes
          </LoadingButton>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default EditTabName;
