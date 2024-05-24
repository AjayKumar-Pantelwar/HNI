'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, LinearProgress, Stack, Step, StepLabel, Stepper } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { InsuranceFormSteps, InsuranceItem } from 'src/types/unverise/vas.types';
import * as Yup from 'yup';
import InsuranceName from './steps/insurance-name';
import Introduction from './steps/introduction';
import KeyFeatures from './steps/key-features';

interface Props {
  open: boolean;
  onClose: () => void;
  insuranceItem?: InsuranceItem;
}

const AddInsuranceModal = (props: Props) => {
  const { onClose, open, insuranceItem } = props;
  const [activeStep, setActiveStep] = useState(0);

  const steps = Object.values(InsuranceFormSteps).map((c) => c);

  const validationSchemas = [
    Yup.object().shape({
      insurance_name: Yup.string().required('Name is required'),
      insurance_icon: Yup.mixed().nonNullable().required('Image is required'),
    }),
    Yup.object().shape({
      insurance_section1_title: Yup.string().required('Title is required'),
      insurance_logo: Yup.mixed().nonNullable().required('Logo is required'),
      insurance_section2_title: Yup.string().required('Description is required'),
    }),
    Yup.object().shape({
      plan_benefit: Yup.array().of(
        Yup.object().shape({
          benefit_description: Yup.string().required('Description is required'),
          benefit_icon: Yup.mixed().nonNullable().required('Icon is required'),
        })
      ),
    }),
    Yup.object().shape({
      benefits: Yup.object().shape({
        title: Yup.string().required('Title is required'),
      }),
    }),
    Yup.object().shape({
      insurance_footer: Yup.string().required('Footer is required'),
    }),
  ];

  const defaultValues = [
    {
      insurance_name: insuranceItem?.insurance_name || '',
      insurance_icon: '',
    },
    {
      insurance_section1_title: insuranceItem?.insurance_section1_title || '',
      insurance_logo: '',
      insurance_section2_title: insuranceItem?.insurance_section2_title || '',
    },
    {
      plan_benefit: insuranceItem?.plan_benefit || [],
    },
    {
      benefits: insuranceItem?.benefits || [],
    },
    {
      insurance_footer: '',
    },
  ];

  type FormValues = NonNullable<(typeof defaultValues)[number]>;

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<FormValues>(validationSchemas[activeStep] as any),
    defaultValues: defaultValues[activeStep],
  });

  const [progress, setProgress] = useState(0);

  const {
    reset,
    handleSubmit,
    formState: { defaultValues: dv, errors, isSubmitting },
    watch,
    setValue,
  } = methods;
  console.log(dv, watch(), errors);

  const onSubmit = async (data: FormValues) => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  useEffect(() => {
    const p = (activeStep / steps.length) * 100;
    setProgress(p);
  }, [activeStep]);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          minWidth: '800px',
        },
      }}
    >
      <Stack>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 3 }}>
          <Stepper activeStep={activeStep} sx={{ width: '100%' }} alternativeLabel>
            {steps.map((label, index) => (
              <Step>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <LinearProgress variant="buffer" sx={{ width: '100%' }} value={progress} />
      </Stack>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Box sx={{ p: 2, width: '100%' }}>
          <Box>
            {activeStep === 0 && <InsuranceName methods={methods as any} />}
            {activeStep === 1 && <Introduction methods={methods as any} />}
            {activeStep === 2 && <KeyFeatures methods={methods as any} />}
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              color="secondary"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button variant="contained" type="submit">
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default AddInsuranceModal;
