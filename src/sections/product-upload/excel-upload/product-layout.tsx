import { Box, Button, Divider, Stack } from '@mui/material';
import React from 'react';
import UploadOutlinedIcon from 'src/assets/icons/upload-outlined-icon';
import { PreviewFile } from 'src/components/preview-file';
import { ExcelUploadTabs, UploadResponseData } from 'src/types/product-upload.types';
import DownloadFile from './download-file';
import ExcelViewer from './excel-viewer';
import ExcelFileUpload from './file-upload';
import UploadFileModal from './upload-file-modal';

interface ExcelData {
  [key: string]: any;
}

interface Props {
  isUpload: boolean;

  handleFileChange: (file: File | null) => void;
  uploadedFile: File | null;
  handleDownload: () => Promise<void>;
  data: UploadResponseData | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpload: () => Promise<void>;
  open: boolean;
  tab: ExcelUploadTabs;
}

const ProductLayout = (props: Props) => {
  const {
    handleUpload,
    handleFileChange,
    isUpload,
    uploadedFile,
    handleDownload,
    data,
    setOpen,
    open,
    tab,
  } = props;

  return (
    <>
      {isUpload ? (
        <ExcelViewer data={data} handleDownload={handleDownload} setOpen={setOpen} />
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', minHeight: '400px' }}>
          <DownloadFile handleDownload={handleDownload} tab={tab} />
          <Divider orientation="vertical" sx={{ minHeight: '450px' }} />
          <Stack sx={{ flex: 1, p: 3, gap: 3 }}>
            <ExcelFileUpload handleFileChange={handleFileChange} />
            {uploadedFile ? (
              <PreviewFile handleFileChange={handleFileChange} selectedFile={uploadedFile} />
            ) : (
              <Box />
            )}
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                onClick={handleUpload}
                variant="contained"
                sx={{ width: '200px' }}
                startIcon={<UploadOutlinedIcon />}
                disabled={!uploadedFile}
              >
                Upload
              </Button>
            </Box>
          </Stack>
        </Box>
      )}
      <UploadFileModal
        open={open}
        handleClose={() => setOpen(false)}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
        uploadedFile={uploadedFile}
      />
    </>
  );
};

export default ProductLayout;
