import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { productUploadApi } from 'src/redux/api/product-upload.api';
import { handleError } from 'src/utils/handle-error';
import ProductLayout from '../../product-layout';

const MutualFunds = () => {
  const [isUpload, setIsUpload] = useState(false);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [uploadExcel] = productUploadApi.useUploadExcelMutation();

  const handleFileChange = async (file: File | null) => {
    setUploadedFile(file);
    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        await uploadExcel({
          type: 'mf',
          file: formData,
        }).unwrap();
        enqueueSnackbar('File uploaded successfully', { variant: 'success' });
      }
    } catch (error) {
      handleError(error);
    }
  };

  const [triggerDownload] = productUploadApi.useLazyDownloadExcelQuery();

  const handleDownload = async () => {
    try {
      const { data } = await triggerDownload({ type: 'mf' });
      if (data) {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        console.log(url, link);
        link.setAttribute('download', 'file.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
        enqueueSnackbar('File downloaded successfully', { variant: 'success' });
      }
    } catch (error) {
      console.error('Download error:', error);
      enqueueSnackbar('Failed to download file', { variant: 'error' });
    }
  };

  return (
    <ProductLayout
      handleFileChange={handleFileChange}
      isUpload={isUpload}
      setIsUpload={setIsUpload}
      uploadedFile={uploadedFile}
      handleDownload={handleDownload}
    />
  );
};

export default MutualFunds;
