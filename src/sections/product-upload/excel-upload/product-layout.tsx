import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, Button, Divider, Stack } from '@mui/material';
import { PreviewFile } from 'src/components/preview-file';
import DownloadFile from './download-file';
import ExcelUploadAndView from './excel-viewer';
import ExcelFileUpload from './file-upload';

interface ExcelData {
  [key: string]: any;
}

interface Props {
  isUpload: boolean;
  setIsUpload: React.Dispatch<React.SetStateAction<boolean>>;
  handleFileChange: (file: File | null) => void;
  uploadedFile: File | null;
  //   setUploadedFileno: React.Dispatch<React.SetStateAction<File | null>>;
}

const ProductLayout = (props: Props) => {
  const { handleFileChange, isUpload, setIsUpload, uploadedFile } = props;

  return (
    <>
      {isUpload ? (
        <ExcelUploadAndView file={uploadedFile} />
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', minHeight: '400px' }}>
          <DownloadFile />
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
                onClick={() => setIsUpload(true)}
                variant="contained"
                sx={{ width: '200px' }}
                startIcon={<FileUploadIcon />}
                disabled={!uploadedFile}
              >
                Upload
              </Button>
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default ProductLayout;
