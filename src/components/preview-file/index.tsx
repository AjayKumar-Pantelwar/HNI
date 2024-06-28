'use client';

import { Box, IconButton, Stack, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import DeleteIcon from 'src/assets/icons/delete-icon';
import PreviewFileIcon from 'src/assets/icons/preview-file';
import RetryFileIcon from 'src/assets/icons/retry-file.icon';
import useMounted from 'src/hooks/mounted';
import { secondaryFont } from 'src/theme/typography';
import { convertUrlToFile } from 'src/utils/convert-url-to-file';
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

  const fileSizeInMB = (file: File) => Number.isNaN((file.size / (1024 * 1024)).toFixed(2)) || '0';

  const getFileName = (file: File) => {
    const { name } = file;
    if (name?.length > 24) {
      const extension = name.split('.').pop();
      return `${name.slice(0, 15)}...${extension}`;
    }
    return name || '--';
  };

  const [modifiedFile, setModifiedFile] = useState<File>();

  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return;
    async function handleImageLink() {
      if (typeof selectedFile === 'string') {
        convertUrlToFile(selectedFile).then((file) => {
          if (file) setModifiedFile(file);
        });
      }
    }
    handleImageLink();
  }, [selectedFile, mounted]);

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
              {getFileName(modifiedFile || selectedFile)}{' '}
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
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Stack>
  );
};
