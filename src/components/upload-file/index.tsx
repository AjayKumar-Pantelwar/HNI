import { Box, Stack, Typography } from '@mui/material';

import { UploadIcon } from 'src/assets/icons/upload.icon';
import { FileDropzone } from '../file-dropzone';

type Props = {
  handleFileChange: (file: File) => void;
  label: string;
  uploadAs?: string;
  maxFile?: number;
};

export const UploadFile = (props: Props) => {
  const { handleFileChange, label, uploadAs, maxFile } = props;
  return (
    <Stack>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Box
        border="1px dashed"
        borderColor="divider"
        borderRadius={1}
        p={1}
        alignItems="center"
        pl={2}
      >
        <FileDropzone handleFileChange={handleFileChange}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box
              sx={{
                boxShadow: 4,
                borderRadius: '100%',
                display: 'flex',
                alignItems: 'center',
                height: '32px',
                width: '32px',
                justifyContent: 'center',
              }}
            >
              <UploadIcon />
            </Box>
            <Stack>
              {uploadAs && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Upload As:{' '}
                  </Typography>
                  <Typography variant="body2">{uploadAs}</Typography>
                </Box>
              )}
              {maxFile && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Max file size:{' '}
                  </Typography>
                  <Typography variant="body2">{maxFile}</Typography>
                </Box>
              )}
            </Stack>
          </Box>
        </FileDropzone>
      </Box>
    </Stack>
  );
};
