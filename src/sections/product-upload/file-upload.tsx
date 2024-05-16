import { Box, Button, Stack, Typography } from '@mui/material';
import { FileDropzone } from 'src/components/file-dropzone';

interface Props {
  handleFileChange: (file: File) => void;
}

const ExcelFileUpload = (props: Props) => {
  const { handleFileChange } = props;
  return (
    <FileDropzone handleFileChange={handleFileChange}>
      <Box
        sx={{
          border: '1px dashed',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6">Drag file to upload</Typography>
        <Typography variant="body2" color="text.secondary">
          Or
        </Typography>
        <Button variant="contained" component="label">
          Browse Files
        </Button>

        <Stack>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Upload As:{' '}
            </Typography>
            <Typography variant="body2">XLSX</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Max File As:{' '}
            </Typography>
            <Typography variant="body2">2 MB</Typography>
          </Box>
        </Stack>
      </Box>
    </FileDropzone>
  );
};

export default ExcelFileUpload;
