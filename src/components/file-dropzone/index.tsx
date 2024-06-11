import { Box } from '@mui/material';
import { useCallback } from 'react';
import { Accept, useDropzone } from 'react-dropzone';

type Props = {
  handleFileChange: (file: File) => void;
  children: React.ReactNode;
  accept?: Accept;
  maxSize?: number;
};

export const FileDropzone = (props: Props) => {
  const { handleFileChange, children, accept, maxSize } = props;
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) handleFileChange(file);
    },
    [handleFileChange]
  );

  const { getRootProps, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    maxSize: maxSize && maxSize * 1024 * 1024,
  });

  console.log({ isDragReject, maxSize });

  return (
    <Box {...getRootProps()} sx={{ cursor: 'pointer' }}>
      {children}
    </Box>
  );
};
