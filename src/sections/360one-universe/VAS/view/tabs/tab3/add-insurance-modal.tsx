'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, LinearProgress, Stack, Step, StepLabel, Stepper } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { InsuranceFormSteps, InsuranceItem } from 'src/types/unverise/vas.types';

import { convertUrlToFile } from 'src/utils/convert-url-to-file';
import * as Yup from 'yup';
import InsuranceItemContent from './insurance-item-content';
import Benefits from './steps/benefits';
import Footer from './steps/footer';
import InsuranceName from './steps/insurance-name';
import Introduction from './steps/introduction';
import KeyFeatures from './steps/key-features';

interface Props {
  open: boolean;
  onClose: () => void;
  insuranceItem?: InsuranceItem;
}

const initialValues: InsuranceItem = {
  benefits: [],
  plan_benefit: [],
  insurance_icon: '',
  insurance_name: '',
  fixed_income_icon: '',
  insurance_description: '',
  insurance_subtitle: '',
  insurance_section1_title: '',
  insurance_section2_title: '',
  insurance_note: '',
  insurance_logo: '',
  insurance_short_note: '',
};

const AddInsuranceModal = (props: Props) => {
  const { onClose, open, insuranceItem } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [reviewData, setReviewData] = useState<InsuranceItem>(initialValues);

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
      benefits: Yup.array().of(
        Yup.object().shape({
          title: Yup.string().required('Title is required'),
        })
      ),
    }),
    Yup.object().shape({
      insurance_note: Yup.string().required('Footer is required'),
    }),
  ];

  const defaultValues = useMemo(() => {
    const df = [
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
        insurance_note: insuranceItem?.insurance_note || '',
      },
    ];
    return df[activeStep];
  }, [activeStep]);

  type FormValues = NonNullable<typeof defaultValues>;

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<FormValues>(validationSchemas[activeStep] as any),
    defaultValues,
  });

  const [progress, setProgress] = useState(0);

  const {
    reset,
    handleSubmit,
    formState: { defaultValues: dv, errors, isSubmitting },
    watch,
    setValue,
  } = methods;

  const onSubmit = async (data: FormValues) => {
    if (activeStep !== steps.length) {
      if (activeStep === 0 && data) {
        setReviewData((prev) => ({
          ...prev,
          insurance_name: data?.insurance_name || '',
          insurance_icon: data?.insurance_icon || '',
        }));
      }
      if (activeStep === 1 && data) {
        setReviewData((prev) => ({
          ...prev,
          insurance_section1_title: data?.insurance_section1_title || '',
          insurance_logo: data?.insurance_logo || '',
          insurance_section2_title: data?.insurance_section2_title || '',
        }));
      }

      if (activeStep === 2 && data) {
        setReviewData((prev) => ({
          ...prev,
          plan_benefit: data?.plan_benefit || [],
        }));
      }

      if (activeStep === 3 && data) {
        setReviewData((prev) => ({
          ...prev,
          benefits: data?.benefits || [],
        }));
      }
      if (activeStep === 4 && data) {
        setReviewData((prev) => ({
          ...prev,
          insurance_note: data?.insurance_note || '',
        }));
      }
      setActiveStep((prevStep) => prevStep + 1);
    }
    console.log(data);
  };

  useEffect(() => {
    const p = (activeStep / steps.length) * 100;
    setProgress(p);
    methods.reset(defaultValues);
  }, [activeStep]);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    if (insuranceItem) {
      insuranceItem.plan_benefit.map((f, i) =>
        convertUrlToFile(f?.benefit_icon).then(
          // @ts-ignore
          (file) => file && setValue(`plan_benefit.[${i}].benefit_icon`, file)
        )
      );
    }
  }, [insuranceItem]);

  console.log(errors);

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
        <Box
          sx={{
            p: 2,
            width: '100%',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ height: '350px', overflow: 'auto' }}>
            {activeStep === 0 && <InsuranceName methods={methods as any} />}
            {activeStep === 1 && <Introduction methods={methods as any} />}
            {activeStep === 2 && <KeyFeatures methods={methods as any} />}
            {activeStep === 3 && <Benefits methods={methods as any} />}
            {activeStep === 4 && <Footer methods={methods as any} />}
            {activeStep === 5 && reviewData && (
              <InsuranceItemContent item={reviewData} edit={false} />
            )}
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
              {activeStep === steps.length ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default AddInsuranceModal;
