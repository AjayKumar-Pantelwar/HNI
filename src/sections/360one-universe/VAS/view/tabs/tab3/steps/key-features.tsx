import { Button, Grid } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import { PreviewFile } from 'src/components/preview-file';
import { UploadFile } from 'src/components/upload-file';
import { InsuranceFormValues } from 'src/types/unverise/vas.types';

interface Props {
  methods: UseFormReturn<InsuranceFormValues>;
}

const KeyFeatures = (props: Props) => {
  const { methods } = props;
  const { watch, setValue } = methods;
  const planBenefits = watch('plan_benefit') || [{ benefit_description: '', benefit_icon: '' }];

  const handleFileChangePerm = (file: File | null) => {
    setValue('insurance_icon', file as any);
  };

  return (
    <Grid container spacing={3}>
      {planBenefits?.map((f, i) => (
        <>
          <Grid item xs={12} md={6}>
            <RHFTextField
              fullWidth
              name={`plan_benefit.[${i}].benefit_description`}
              label={`Description -${i + 1}`}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {!f?.benefit_icon ? (
              <UploadFile
                uploadAs="JPG"
                maxFileSize={2}
                label="Upload Image"
                handleFileChange={handleFileChangePerm}
              />
            ) : (
              <PreviewFile
                label="Image"
                selectedFile={f?.benefit_icon as any}
                handleFileChange={handleFileChangePerm}
              />
            )}
          </Grid>
        </>
      ))}
      <Grid item xs={12}>
        <Button
          onClick={() =>
            setValue('plan_benefit', [
              ...planBenefits,
              { benefit_description: '', benefit_icon: '' },
            ])
          }
        >
          Add Benefit
        </Button>
      </Grid>
    </Grid>
  );
};

// const ImageView = (props: Props) => {
//   const { methods } = props;
//   const { watch, setValue } = methods;
//   const planBenefits = watch('plan_benefit') || [{ benefit_description: '', benefit_icon: '' }];
//   const image = watch('image');
//   const handleFileChangePerm = (file: File | null) => {
//     setValue('image', file as any);
//   };
//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} md={6}>
//         {!image ? (
//           <UploadFile
//             uploadAs="JPG"
//             maxFileSize={2}
//             label="Upload Image"
//             handleFileChange={handleFileChangePerm}
//           />
//         ) : (
//           <PreviewFile
//             label="Image"
//             selectedFile={image as any}
//             handleFileChange={handleFileChangePerm}
//           />
//         )}
//       </Grid>
//     </Grid>
//   );
// };

export default KeyFeatures;
