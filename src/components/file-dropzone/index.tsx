import { Box } from '@mui/material';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {
  handleFileChange: (file: File) => void;
  children: React.ReactNode;
};

export const FileDropzone = (props: Props) => {
  const { handleFileChange, children } = props;
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) handleFileChange(file);
    },
    [handleFileChange]
  );

  const { getRootProps } = useDropzone({ onDrop });

  return (
    <Box {...getRootProps()} sx={{ cursor: 'pointer' }}>
      {children}
    </Box>
  );
};
