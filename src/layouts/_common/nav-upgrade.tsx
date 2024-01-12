import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSelector } from 'src/redux/store';

export default function NavUpgrade() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <Avatar alt={user?.username} sx={{ width: 48, height: 48 }} />
        </Box>

        <Stack spacing={0.5} sx={{ mt: 1.5, mb: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.username}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
