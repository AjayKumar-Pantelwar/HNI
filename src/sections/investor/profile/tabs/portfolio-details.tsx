import { Box, Card, Stack, Typography } from '@mui/material';

const PortfolioDetails = () => (
  <Box>
    <Typography variant="h4">Portfolio Details</Typography>
    <Card
      sx={{
        mt: 3,
        p: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '250px',
        width: '100%',
      }}
    >
      <Stack>
        <Typography variant="h6" color="text.secondary">
          No Portfolio details found
        </Typography>
      </Stack>
    </Card>
  </Box>
);

export default PortfolioDetails;
