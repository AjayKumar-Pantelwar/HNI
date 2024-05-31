import Close from '@mui/icons-material/Close';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import Dialog from '@mui/material/Dialog';
import { PreviewFile } from 'src/components/preview-file';
import ExcelFileUpload from './file-upload';

interface Props {
  open: boolean;
  handleClose: () => void;
  handleUpload: () => Promise<void>;
  handleFileChange: (file: File | null) => void;
  uploadedFile: File | null;
}

const UploadFileModal = (props: Props) => {
  const { handleClose, handleUpload, open, handleFileChange, uploadedFile } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          minWidth: '600px',
          p: 3,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Upload Excel</Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>
      <Stack sx={{ mt: 3, gap: 3 }}>
        <ExcelFileUpload handleFileChange={handleFileChange} />
        {uploadedFile ? (
          <PreviewFile handleFileChange={handleFileChange} selectedFile={uploadedFile} />
        ) : (
          <Box />
        )}
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            onClick={() => {
              handleUpload().finally(() => {
                handleClose();
              });
            }}
            variant="contained"
            sx={{ width: '200px' }}
            startIcon={<FileUploadIcon />}
          >
            Upload
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default UploadFileModal;
