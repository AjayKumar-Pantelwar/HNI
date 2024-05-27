import { Button, Grid } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import { InsuranceFormValues } from 'src/types/unverise/vas.types';

interface Props {
  methods: UseFormReturn<InsuranceFormValues>;
}

const Benefits = (props: Props) => {
  const { methods } = props;

  const { watch, setValue } = methods;
  const benefits = watch('benefits') || [{ title: '' }];

  return (
    <Grid container spacing={3}>
      {benefits?.map((f, i) => (
        <Grid item xs={12} md={6}>
          <RHFTextField fullWidth name={`benefits.[${i}].title`} label={`Description -${i + 1}`} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button onClick={() => setValue('benefits', [...benefits, { title: '' }])}>
          Add Benefit
        </Button>
      </Grid>
    </Grid>
  );
};

export default Benefits;
