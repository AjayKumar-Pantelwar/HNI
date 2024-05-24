import { useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';

const Step2Form = () => {
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

export default Step2Form;
