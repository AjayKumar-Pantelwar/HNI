'use client';

// import { yupResolver } from '@hookform/resolvers/yup';
// import { Box, Button, Container, Step, StepLabel, Stepper } from '@mui/material';
// import axios from 'axios';
// import { useState } from 'react';
// import { FormProvider, useForm } from 'react-hook-form';
// import { InsuranceFormSteps } from 'src/types/unverise/vas.types';
// import * as Yup from 'yup';
// import Step1Form from './step1-form';
// import Step2Form from './step2-form';

// // Import your step forms

// const steps = Object.values(InsuranceFormSteps).map((c) => c);

// const validationSchemas = {
//   [InsuranceFormSteps.INSURANCE_NAME]: {
//     insurance_name: Yup.string().required('Name is required'),
//     insurance_icon: Yup.mixed().nonNullable().required('Image is required'),
//   },
//   [InsuranceFormSteps.INTRODUCTION]: {
//     insurance_section1_title: Yup.string().required('Title is required'),
//     insurance_logo: Yup.mixed().nonNullable().required('Logo is required'),
//     insurance_section2_title: Yup.string().required('Description is required'),
//   },
//   [InsuranceFormSteps.KEY_FEATURES]: {
//     keyFeatures: Yup.array().of(
//       Yup.object().shape({
//         benefit_icon: Yup.mixed().nonNullable().required('Logo is required'),
//         benefit_description: Yup.string().required('Description is required'),
//       })
//     ),
//   },
//   [InsuranceFormSteps.BENEFITS]: {
//     benefits: Yup.object().shape({
//       title: Yup.string().required('Title is required'),
//     }),
//   },
//   [InsuranceFormSteps.FOOTER]: {
//     insurance_footer: Yup.string().required('Footer is required'),
//   },
// };

// const ParentComponent = () => {
//   const [activeStep, setActiveStep] = useState(1);
//   const methods = useForm({
//     mode: 'onChange',
//     resolver: yupResolver(validationSchemas[steps[activeStep]] as any),
//   });

//   const onSubmit = async (data: any) => {
//     if (activeStep === steps.length - 1) {
//       try {
//         await axios.post('https://example.com/api/submit', data);
//         alert('Form submitted successfully');
//       } catch (error) {
//         console.error('Form submission error:', error);
//       }
//     } else {
//       setActiveStep((prevStep) => prevStep + 1);
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };

//   return (
//     <Container>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((label, index) => (
//           <Step key={index}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <FormProvider {...methods}>
//         <form onSubmit={methods.handleSubmit(onSubmit)}>
//           {activeStep === 0 && <Step1Form />}
//           {activeStep === 1 && <Step2Form />}

//           <Box display="flex" justifyContent="space-between" mt={2}>
//             <Button disabled={activeStep === 0} onClick={handleBack}>
//               Back
//             </Button>
//             <Button type="submit">{activeStep === steps.length - 1 ? 'Submit' : 'Next'}</Button>
//           </Box>
//         </form>
//       </FormProvider>
//     </Container>
//   );
// };

// export default ParentComponent;
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Step, StepLabel, Stepper } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Step1Form from './step1-form';
import Step2Form from './step2-form';

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

const validationSchemas = [
  yup.object().shape({
    field1: yup.string().required('Field 1 is required'),
  }),
  yup.object().shape({
    field2: yup.string().required('Field 2 is required'),
  }),
  yup.object().shape({
    field3: yup.string().required('Field 3 is required'),
  }),
  yup.object().shape({
    field4: yup.string().required('Field 4 is required'),
  }),
  yup.object().shape({
    field5: yup.string().required('Field 5 is required'),
  }),
];

const ParentComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchemas[activeStep]),
  });

  const onSubmit = async (data) => {
    if (activeStep === steps.length - 1) {
      try {
        await axios.post('https://example.com/api/submit', data);
        alert('Form submitted successfully');
      } catch (error) {
        console.error('Form submission error:', error);
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Container>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {activeStep === 0 && <Step1Form />}
          {activeStep === 1 && <Step2Form />}

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button type="submit">{activeStep === steps.length - 1 ? 'Submit' : 'Next'}</Button>
          </Box>
        </form>
      </FormProvider>
    </Container>
  );
};

export default ParentComponent;
