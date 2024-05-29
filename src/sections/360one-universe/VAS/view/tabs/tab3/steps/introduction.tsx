import { Grid, Stack } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import { PreviewFile } from 'src/components/preview-file';
import { UploadFile } from 'src/components/upload-file';
import { InsuranceFormValues } from 'src/types/unverise/vas.types';

interface Props {
  methods: UseFormReturn<InsuranceFormValues>;
}

const Introduction = (props: Props) => {
  const { methods } = props;
  const { watch, setValue } = methods;

  const logo = watch('insurance_logo');

  const handleFileChangePerm = (file: File | null) => {
    setValue('insurance_logo', file as any);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Stack gap={3}>
          <RHFTextField fullWidth name="insurance_section1_title" label="Title" />
          <RHFTextField fullWidth name="insurance_section2_title" label="Description" />
        </Stack>
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
            label="Logo"
            selectedFile={logo as any}
            handleFileChange={handleFileChangePerm}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Introduction;
