import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Typography,
} from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import Compress from 'compress.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cropperjs/dist/cropper.css';
import * as React from 'react';
import type { ReactCropperElement } from 'react-cropper';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cropper from 'react-cropper';
import { convertBase64ToFile } from 'src/utils/file';
import { handleError } from 'src/utils/handle-error';
import Iconify from '../iconify';

interface Props {
  filename: string;
  base64: string | undefined;
  open: boolean;
  onChange: (file: File | null, base64: string | null) => void;
  onClose: () => void;
  aspectRatio?: string;
}

const compressOptions = {
  size: 5, // the max size in MB, defaults to 2MB
  quality: 1, // the quality of the image, max is 1,
  maxWidth: 1920, // the max width of the output image, defaults to 1920px
  maxHeight: 1920, // the max height of the output image, defaults to 1920px
  resize: true, // defaults to true, set false if you do not want to resize the image width and height
  orientation: 0,
};

export const EditDialog = ({ open, filename, base64, onClose, onChange, aspectRatio }: Props) => {
  const cropperRef = React.useRef<ReactCropperElement>(null);
  const [isCompressing, setIsCompressing] = React.useState(false);

  const compressFile = async () => {
    setIsCompressing(true);
    try {
      if (cropperRef.current === null) throw new Error('cropper not initialized');
      const canvas = cropperRef.current.cropper.getCroppedCanvas({ fillColor: 'white' });
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((resolvedBlob) => {
          if (resolvedBlob) resolve(resolvedBlob);
          else reject();
        });
      });
      const compress = new Compress();
      const file = new File([blob], filename);
      const data = await compress.compress([file], compressOptions);
      const img = data[0];
      const fileSrc = `${img.prefix}${img.data}`;
      const convertedFile = await convertBase64ToFile(fileSrc, filename);
      onChange(convertedFile, fileSrc);
      onClose();
    } catch (error) {
      handleError(error);
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { p: 3, m: 2, width: 'min(96%, 400px)' } }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          '& path': { fill: (theme) => `${theme.palette.secondary.main} !important` },
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Edit Image
        </Typography>
        <IconButton
          edge="end"
          sx={{ background: 'transparent !important' }}
          onClick={onClose}
          aria-label="close"
        >
          <Iconify icon="material-symbols:close" />
        </IconButton>
      </Box>
      <Box sx={{ height: 300, width: 'auto', m: '0 auto' }}>
        <Cropper
          ref={cropperRef}
          src={base64}
          viewMode={2}
          style={{ height: 300 }}
          // eslint-disable-next-line no-eval
          aspectRatio={aspectRatio ? eval(aspectRatio) : undefined}
        />
      </Box>
      {aspectRatio && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="info">
            Please maintain an aspect ratio of{' '}
            <Typography component="span" sx={{ fontWeight: 'bold' }}>
              {aspectRatio?.replace('/', ':')}
            </Typography>
          </Alert>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          my: 2,
        }}
      >
        <Button
          fullWidth
          variant="text"
          startIcon={<Iconify icon="material-symbols:rotate-left" />}
          onClick={() => cropperRef.current?.cropper?.rotate?.(-90)}
        >
          Rotate Left
        </Button>
        <Button
          fullWidth
          variant="text"
          startIcon={<Iconify icon="material-symbols:rotate-right" />}
          onClick={() => cropperRef.current?.cropper?.rotate?.(90)}
        >
          Rotate Right
        </Button>
      </Box>
      <Button fullWidth variant="contained" onClick={compressFile} disabled={isCompressing}>
        {isCompressing ? <CircularProgress /> : 'Continue'}
      </Button>
    </Dialog>
  );
};
