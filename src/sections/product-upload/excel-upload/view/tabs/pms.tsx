import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { productUploadApi } from 'src/redux/api/product-upload.api';
import { ExcelUploadTabs, UploadResponseData } from 'src/types/product-upload.types';
import { handleError } from 'src/utils/handle-error';
import ProductLayout from '../../product-layout';

const PMS = () => {
  const [isUpload, setIsUpload] = useState(false);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [uploadExcel] = productUploadApi.useUploadExcelMutation();

  const [excelData, setExcelData] = useState<UploadResponseData>();

  const handleFileChange = async (file: File | null) => {
    setUploadedFile(file);
  };

  const [triggerDownload] = productUploadApi.useLazyDownloadExcelQuery();

  const handleUpload = async () => {
    if (uploadedFile) {
      setIsUpload(true);
      try {
        const formData = new FormData();
        formData.append('file', uploadedFile);
        const res = await uploadExcel({
          type: 'pms',
          file: formData,
        }).unwrap();
        setExcelData(res.data);
        enqueueSnackbar('File uploaded successfully', { variant: 'success' });
      } catch (error) {
        handleError(error);
      }
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const { data } = await triggerDownload({ type: 'pms' });
      if (data) {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        console.log(url, link);
        link.setAttribute('download', 'Whitelisted-PMS.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
        enqueueSnackbar('File downloaded successfully', { variant: 'success' });
      }
    } catch (error) {
      console.error('Download error:', error);
      enqueueSnackbar('Failed to download file', { variant: 'error' });
    } finally {
      setDownloading(false);
    }
  };
  return (
    <ProductLayout
      isUpload={isUpload}
      handleFileChange={handleFileChange}
      uploadedFile={uploadedFile}
      handleDownload={handleDownload}
      data={excelData}
      setOpen={setOpen}
      handleUpload={handleUpload}
      open={open}
      tab={ExcelUploadTabs.PMS}
      downloading={downloading}
    />
  );
};

export default PMS;
