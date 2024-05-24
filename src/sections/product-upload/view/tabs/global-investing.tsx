import { useState } from 'react';
import ProductLayout from '../../product-layout';

const GlobalInvesting = () => {
  const [isUpload, setIsUpload] = useState(false);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    setUploadedFile(file);
  };

  return (
    <ProductLayout
      handleFileChange={handleFileChange}
      isUpload={isUpload}
      setIsUpload={setIsUpload}
      uploadedFile={uploadedFile}
    />
  );
};

export default GlobalInvesting;
