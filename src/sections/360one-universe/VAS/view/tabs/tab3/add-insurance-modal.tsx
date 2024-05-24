'use client';

import { Box, LinearProgress, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from 'react';
import { InsuranceItem } from 'src/types/unverise/vas.types';

interface Props {
  open: boolean;
  onClose: () => void;
  insuranceItem?: InsuranceItem;
}

const steps = ['Insurance Name', 'Introduction', 'Key Features', 'Benefits', 'Footer'];

const AddInsuranceModal = (props: Props) => {
  const { onClose, open, insuranceItem } = props;

  const defaultValue = {
    name: insuranceItem?.insurance_name || '',
    logo: insuranceItem?.insurance_logo || '',
  };

  const [activeStep, setActiveStep] = useState(2);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const p = (activeStep / steps.length) * 100;
    setProgress(p);
  }, [activeStep]);

  console.log(insuranceItem);

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
      <Box sx={{ p: 3 }}>
        <Typography>Hello</Typography>
      </Box>
    </Dialog>
  );
};

export default AddInsuranceModal;
