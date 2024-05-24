import { Grid } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import { PreviewFile } from 'src/components/preview-file';
import { UploadFile } from 'src/components/upload-file';
import { InsuranceFormValues } from 'src/types/unverise/vas.types';

interface Props {
  methods: UseFormReturn<InsuranceFormValues>;
}

const InsuranceName = (props: Props) => {
  const { methods } = props;
  const { watch, setValue } = methods;

  const logo = watch('insurance_icon');

  const handleFileChangePerm = (file: File | null) => {
    setValue('insurance_icon', file as any);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <RHFTextField fullWidth name="insurance_name" label="Insurance Name" />
      </Grid>

      <Grid item xs={12} md={6}>
        {!logo ? (
          <UploadFile
            uploadAs="JPG"
            maxFile={2}
            label="Upload Image"
            handleFileChange={handleFileChangePerm}
          />
        ) : (
          <PreviewFile
            label="Image"
            selectedFile={logo as any}
            handleFileChange={handleFileChangePerm}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default InsuranceName;
