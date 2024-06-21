import { Box, IconButton, Stack, Typography } from '@mui/material';

import DeleteFileIcon from 'src/assets/icons/delete-file.icon';
import PreviewFileIcon from 'src/assets/icons/preview-file';
import RetryFileIcon from 'src/assets/icons/retry-file.icon';
import { secondaryFont } from 'src/theme/typography';
import { FileDropzone } from '../file-dropzone';

type Props = {
  selectedFile: File | null;
  handleFileChange: (file: File | null) => void;
  label?: string;
};

export const PreviewFile = (props: Props) => {
  const { selectedFile, handleFileChange, label } = props;

  const handleDelete = () => {
    handleFileChange(null);
  };

  const fileSizeInMB = (file: File) => (file.size / (1024 * 1024)).toFixed(2);

  const getFileName = (file: File) => {
    const { name } = file;
    if (name?.length > 24) {
      const extension = name.split('.').pop();
      return `${name.slice(0, 15)}...${extension}`;
    }
    return name || '--';
  };

  return (
    <Stack>
      <Typography variant="caption" color="text.secondary">
        {label || 'File'}
      </Typography>
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
          <PreviewFileIcon />
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontFamily: secondaryFont.style.fontFamily,
              }}
            >
              {getFileName(selectedFile)}{' '}
              <Typography
                fontWeight={500}
                fontSize={11}
                sx={{ color: 'text.secondary' }}
                component="span"
              >
                {fileSizeInMB(selectedFile)} MB
              </Typography>
            </Typography>
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
    </Stack>
  );
};
