import { useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';

const Step1Form = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <RHFTextField name="insurance_name" label="Insurance Name" fullWidth />
    </div>
  );
};

export default Step1Form;
