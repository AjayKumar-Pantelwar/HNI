import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import EditIcon from 'src/assets/icons/edit-icon';
import { Vas } from 'src/types/unverise/landing-page';

interface Props {
  vas: Vas;
}

const LandingPageVAS = (props: Props) => {
  const { vas } = props;
  return (
    <Card sx={{ p: 2 }}>
      <Stack sx={{ gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="subtitle1">{vas.label}</Typography>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Box>
        <Grid container spacing={3}>
          {vas?.products?.map((p) => (
            <Grid item xs={12} md={4} lg={6}>
              <Box
                key={p?.product_name}
                sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'end' }}>
                  <Stack sx={{ alignItems: 'start', flex: 1 }}>
                    <img
                      style={{ objectFit: 'cover' }}
                      src={p?.product_logo}
                      height={24}
                      width={24}
                      alt={p.product_name}
                    />
                    <Typography variant="subtitle2" sx={{ flex: 1 }}>
                      {p?.product_name}
                    </Typography>
                  </Stack>
                  <IconButton sx={{ display: 'flex', justifyContent: 'end', flex: 1 }}>
                    <EditIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Card>
  );
};

export default LandingPageVAS;
