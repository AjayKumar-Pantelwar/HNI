import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Button, Stack, Typography } from '@mui/material';

import MutualFundsIcon from 'src/assets/icons/mutual-funds';

const DownloadFile = () => (
  <Stack sx={{ gap: 2, alignItems: 'center', flex: 1, p: 3 }}>
    <MutualFundsIcon />
    <Typography variant="h6">Download Whitelisted Mutual Funds</Typography>
    <Button startIcon={<SystemUpdateAltIcon />} variant="contained">
      Download Now
    </Button>
  </Stack>
);

export default DownloadFile;
