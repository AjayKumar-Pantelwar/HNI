import { Button, Grid } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
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
        <Grid item xs={12} md={6}>
          <RHFTextField
            fullWidth
            name={`plan_benefit[${i}].benefit_description`}
            label={`Description -${i + 1}`}
          />
        </Grid>
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

export default KeyFeatures;
