// @mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
// types
import Iconify from 'src/components/iconify';
// theme
import Typography from '@mui/material/Typography';
import Label from 'src/components/label/label';
import { bgGradient } from 'src/theme/css';
import { Investor } from 'src/types/investor.types';

// ----------------------------------------------------------------------

type Props = { investor: Investor };

export default function ProfileCover({ investor }: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[800], 0.8),
          imgUrl: '/assets/background/cover_image.jpg',
        }),
        color: 'common.white',
        height: 1,
      }}
    >
      <Stack
        alignItems="center"
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          left: { md: 24 },
          bottom: { md: 24 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: 'absolute' },
        }}
      >
        <Avatar
          src="/assets/profile-icon.jpg"
          alt={investor.preferred_name}
          sx={{
            mx: 'auto',
            width: { xs: 64, md: 128 },
            height: { xs: 64, md: 128 },
            border: `solid 2px ${theme.palette.common.white}`,
          }}
        />

        <ListItemText
          sx={{
            mt: 3,
            ml: { md: 3 },
            textAlign: { xs: 'center', md: 'unset' },
          }}
          primary={
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="h6">{investor.preferred_name}</Typography>
              <Label
                variant="filled"
                color={investor.is_subscribed ? 'success' : 'error'}
                startIcon={<Iconify icon="tdesign:member" />}
              >
                {investor.is_subscribed ? 'Subscribed' : 'Not Subscribed'}
              </Label>
            </Stack>
          }
          secondary={investor.mobile_number}
          primaryTypographyProps={{
            typography: 'h4',
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            color: 'inherit',
            component: 'span',
            typography: 'body2',
            sx: { opacity: 0.48 },
          }}
        />
      </Stack>
    </Box>
  );
}
