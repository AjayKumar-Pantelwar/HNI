import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import React, { useState } from 'react';
import { secondaryFont } from 'src/theme/typography';

interface Props {
  open: boolean;
  onClose: () => void;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const FiltersDrawer = (props: Props) => {
  const { onClose, open, setStatus } = props;
  const [value, setValue] = useState('');
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          minWidth: '350px',
          p: 3,
          bgcolor: 'background.paper',
        },
      }}
    >
      <Stack sx={{ height: '100%' }}>
        <Stack sx={{ flex: 1, gap: 3 }}>
          <Typography variant="h6" sx={{ fontFamily: secondaryFont.style.fontFamily }}>
            Filter by
          </Typography>
          <Stack sx={{ gap: 3 }}>
            <Typography variant="subtitle1" sx={{ fontFamily: secondaryFont.style.fontFamily }}>
              Status
            </Typography>
            <Divider variant="fullWidth" />
            <RadioGroup
              row
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            >
              <FormControlLabel value="success" control={<Radio />} label="Success" />
              <FormControlLabel value="error" control={<Radio />} label="Failed" />
            </RadioGroup>
          </Stack>
        </Stack>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => {
              setStatus('');
              setValue('');
              onClose();
            }}
          >
            Clear All
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setStatus(value);
              onClose();
            }}
          >
            Apply Filters
          </Button>
        </Box>
      </Stack>
    </Drawer>
  );
};

export default FiltersDrawer;
