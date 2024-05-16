import { Box, IconButton, Typography } from '@mui/material';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteFileIcon from 'src/assets/icons/delete-file.icon';
import RetryFileIcon from 'src/assets/icons/retry-file.icon';
import { FileDropzone } from '../file-dropzone';

type Props = {
  selectedFile: File | null;
  handleFileChange: (file: File | null) => void;
};

export const PreviewFile = (props: Props) => {
  const { selectedFile, handleFileChange } = props;

  const handleDelete = () => {
    handleFileChange(null);
  };

  const fileSizeInMB = (file: File) => (file.size / (1024 * 1024)).toFixed(2);

  const getFileName = (file: File) => {
    const { name } = file;
    if (name.length > 25) {
      const extension = name.split('.').pop();
      return `...${extension}`;
    }
    return name;
  };

  return (
    <Box>
      {selectedFile && (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            p: 1,
            height: '56px',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          <InsertDriveFileIcon />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              fontWeight={400}
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {getFileName(selectedFile)}
            </Typography>

            {/* <Typography
              variant="h6"
              fontSize={9}
              fontWeight={400}
              color="text.primary"
              display="flex"
            >
              <Box sx={{ color: 'text.secondary' }}>File Size :</Box>&nbsp;
              {fileSizeInMB(selectedFile)} MB
            </Typography> */}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FileDropzone handleFileChange={handleFileChange}>
              <IconButton sx={{ p: 1, marginRight: '5px' }}>
                <RetryFileIcon />
              </IconButton>
            </FileDropzone>
            <IconButton onClick={handleDelete} sx={{ p: 1 }}>
              <DeleteFileIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};
