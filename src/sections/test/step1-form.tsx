import { useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';

const Step1Form = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <RHFTextField name="field1" label="Insurance Name" fullWidth />
    </div>
  );
};

export default Step1Form;
