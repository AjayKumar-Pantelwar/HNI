import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { GetUserRequest } from 'src/types/user.types';

interface Props {
  open: boolean;
  onClose: () => void;
  defaultFilters: GetUserRequest;
  setFilters: Dispatch<SetStateAction<GetUserRequest>>;
}

const UserFilterDrawer = (props: Props) => {
  const { onClose, open, defaultFilters, setFilters } = props;
  const [currentFilters, setCurrentFilters] = useState<GetUserRequest>(defaultFilters);
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
          <Typography variant="h6">Filter by</Typography>
          <Stack sx={{ gap: 2 }}>
            <Typography variant="subtitle1">KYC Missmatch</Typography>
            <Divider variant="fullWidth" />
            <RadioGroup
              row
              value={currentFilters.kyc_mismatch}
              onChange={(e) => {
                setCurrentFilters((prev) => ({
                  ...prev,
                  kyc_mismatch: e.target.value === 'true',
                }));
              }}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Stack>
          <Stack sx={{ gap: 2 }}>
            <Typography variant="subtitle1">AML</Typography>
            <Divider variant="fullWidth" />
            <RadioGroup
              row
              value={currentFilters.aml}
              onChange={(e) => {
                setCurrentFilters((prev) => ({
                  ...prev,
                  aml: e.target.value === 'true',
                }));
              }}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Stack>
          <Stack sx={{ gap: 2 }}>
            <Typography variant="subtitle1">Caliber</Typography>
            <Divider variant="fullWidth" />
            <RadioGroup
              row
              value={currentFilters.calibre}
              onChange={(e) => {
                setCurrentFilters((prev) => ({
                  ...prev,
                  calibre: e.target.value === 'true',
                }));
              }}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          onClick={() => {
            setCurrentFilters(defaultFilters);
            setFilters(currentFilters);
            onClose();
          }}
        >
          Clear All
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            setFilters(currentFilters);
            onClose();
          }}
        >
          Apply Filters
        </Button>
      </Box>
    </Drawer>
  );
};

export default UserFilterDrawer;
