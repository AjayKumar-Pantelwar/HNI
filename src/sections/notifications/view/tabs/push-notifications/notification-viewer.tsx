import { Box, Card, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import AndroidIcon from 'src/assets/icons/android-icon';
import IOSIcon from 'src/assets/icons/ios-icon';

interface Props {
  image?: File;
  title: string;
  description: string;
}

const NotificationViewer = (props: Props) => {
  const { description, title, image } = props;

  const url = image ? URL.createObjectURL(image) : '';

  const [tab, setTab] = useState('ios');

  return (
    <Stack sx={{ gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Tabs
          TabIndicatorProps={{ sx: { display: 'none' } }}
          sx={{
            '& .MuiTab-root': {
              mr: 'unset',
              // mx: 1,
              // mt: 1,
              bgcolor: 'grey.100',
              '&.Mui-selected': {
                bgcolor: 'background.paper',
                boxShadow: '0px 1px 4px 0px #0000001F',
                borderBottom: '2px solid',
                borderColor: 'primary.main',
              },
            },
          }}
          value={tab}
          onChange={(_, value) => setTab(value)}
        >
          <Tab label={<IOSIcon />} value="ios" />
          <Tab label={<AndroidIcon />} value="android" />
        </Tabs>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(/assets/illustrations/mobile.svg)`,
          backgroundSize: 'contain',
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
          <Stack sx={{ gap: 2 }}>
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
                  // noWrap
                  sx={{
                    fontSize: '6px',
                    fontWeight: 400,
                    // flex: 1,
                    width: '100px',
                    whiteSpace: 'pre-wrap',
                  }}
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
            {image && (
              <img
                src={url}
                alt="file"
                height={100}
                style={{ objectFit: 'contain', borderRadius: '10px' }}
              />
            )}
          </Stack>
        </Card>
      </Box>
    </Stack>
  );
};

export default NotificationViewer;
