import { useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';

const Step2Form = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <RHFTextField name="field2" label="Insurance Name" fullWidth />
    </div>
  );
};

export default Step2Form;
