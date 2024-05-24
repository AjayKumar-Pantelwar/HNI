'use client';

import { Box, Card, Container, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import Announcement from './tabs/announcements/announcement';
import AppUpdate from './tabs/app-update';

export enum NotificationTabs {
  ANNOUNCEMENT = 'announcement',
  APP_UPDATE = 'app_update',
}

const NotificationsView = () => {
  const [tab, setTab] = useState<NotificationTabs>(NotificationTabs.ANNOUNCEMENT);

  const handleChange = (_event: React.SyntheticEvent, newValue: NotificationTabs) => {
    setTab(newValue);
  };

  const tabContent = (newTab: NotificationTabs) => {
    switch (newTab) {
      case NotificationTabs.ANNOUNCEMENT:
        return <Announcement />;
      case NotificationTabs.APP_UPDATE:
        return <AppUpdate />;
      default:
        return (
          <Typography component="div" sx={{ p: 3 }}>
            <Box>No content available.</Box>
          </Typography>
        );
    }
  };

  return (
    <Container>
      <Typography variant="h4">Notification</Typography>
      <Card sx={{ width: '100%', mt: 3 }}>
        <Box sx={{ borderBottom: 1, px: 2, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange} aria-label="notification tabs">
            <Tab value={NotificationTabs.ANNOUNCEMENT} label="Announcements" />
            <Tab value={NotificationTabs.APP_UPDATE} label="App Updates" />
          </Tabs>
        </Box>
        {tabContent(tab)}
      </Card>
    </Container>
  );
};

export default NotificationsView;
