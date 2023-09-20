import { Box, Typography } from '@mui/material';
import { Investor } from 'src/types/investor.types';

type Props = { investor: Investor };

export const InvestorProfile = ({ investor }: Props) => (
  <Box>
    <Typography>{investor.preferred_name}</Typography>
  </Box>
);
