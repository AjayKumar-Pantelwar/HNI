import { useDropzone } from 'react-dropzone';
// @mui
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
//
import { Typography } from '@mui/material';
import Iconify from '../iconify';
//
import { UploadProps } from './types';

// ----------------------------------------------------------------------

export type Props = UploadProps & { file?: File };

export default function UploadBox({ file, placeholder, error, disabled, sx, ...other }: Props) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    disabled,
    ...other,
  });

  const hasError = isDragReject || error;

  return (
    <Box
      {...getRootProps()}
      sx={{
        m: 0.5,
        width: 64,
        height: 64,
        flexShrink: 0,
        display: 'flex',
        borderRadius: 1,
        cursor: 'pointer',
        alignItems: 'center',
        color: 'text.disabled',
        justifyContent: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
        border: (theme) => `dashed 1px ${alpha(theme.palette.grey[500], 0.16)}`,
        ...(isDragActive && {
          opacity: 0.72,
        }),
        ...(disabled && {
          opacity: 0.48,
          pointerEvents: 'none',
        }),
        ...(hasError && {
          color: 'error.main',
          bgcolor: 'error.lighter',
          borderColor: 'error.light',
        }),
        '&:hover': {
          opacity: 0.72,
        },
        ...sx,
      }}
    >
      <input {...getInputProps()} />

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          px: 3,
          justifyContent: file ? 'space-between' : 'center',
        }}
      >
        {file ? (
          <>
            <Typography>{file.name}</Typography>
            <Typography color="text.secondary">Click to re-upload</Typography>
          </>
        ) : (
          placeholder || (
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Iconify icon="eva:cloud-upload-fill" width={28} /> Upload here
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
}
