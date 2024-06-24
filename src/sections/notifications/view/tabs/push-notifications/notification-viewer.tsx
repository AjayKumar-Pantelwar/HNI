import { Box, Card, Stack, Typography } from '@mui/material';

interface Props {
  image?: File;
  title: string;
  description: string;
}

const NotificationViewer = (props: Props) => {
  const { description, title, image } = props;

  console.log(image);

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(/assets/illustrations/mobile.svg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          width: '400px',
          height: '500px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Card sx={{ p: 1 }}>
          <Stack sx={{ gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, maxWidth: '170px' }}>
              <img src="/logo/360logo.svg" alt="notification" height={17} width={17} />
              <Stack>
                <Typography
                  variant="body2"
                  noWrap
                  sx={{ fontSize: '6px', fontWeight: 600, flex: 1 }}
                >
                  {title || 'Something about push notificaiton'}
                </Typography>
                <Typography
                  variant="body2"
                  noWrap
                  sx={{ fontSize: '6px', fontWeight: 400, flex: 1 }}
                >
                  {description || 'Something about push notificaiton'}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{ fontSize: '6px', fontWeight: 400, color: 'text.secondary' }}
              >
                5 min ago
              </Typography>
            </Box>
            {/* <img src={}/> */}
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};

export default NotificationViewer;
