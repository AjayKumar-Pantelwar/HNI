'use client';

import { Box, Button, Card, Container, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { useBoolean } from 'src/hooks/use-boolean';
import { notificationsApi } from 'src/redux/api/notifications.api';
import { paths } from 'src/routes/paths';
import kebabToCapitalize from 'src/utils/change-case';
import AddAnnouncementModal from './tabs/announcements/add-announcement-modal';
import Announcement from './tabs/announcements/announcement';
import AppUpdate from './tabs/app-update';

export enum NotificationTabs {
  ANNOUNCEMENT = 'announcement',
  APP_UPDATE = 'app_update',
}

const NotificationsView = () => {
  const settings = useSettingsContext();

  const [tab, setTab] = useState<NotificationTabs>(NotificationTabs.ANNOUNCEMENT);

  const handleChange = (_event: React.SyntheticEvent, newValue: NotificationTabs) => {
    setTab(newValue);
  };

  const quickAdd = useBoolean();

  const { data } = notificationsApi.useGetNotificationsQuery();

  const tabContent = (newTab: NotificationTabs) => {
    switch (newTab) {
      case NotificationTabs.ANNOUNCEMENT:
        return <Announcement data={data} />;
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
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Notifications"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Notifications', href: paths.dashboard.notifications.root },
          { name: kebabToCapitalize(tab) },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={
          tab === NotificationTabs.ANNOUNCEMENT &&
          !data?.data?.length && (
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={quickAdd.onTrue}
            >
              New Announcement
            </Button>
          )
        }
      />

      <Card sx={{ width: '100%', mt: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange} aria-label="notification tabs">
            <Tab value={NotificationTabs.ANNOUNCEMENT} label="Announcements" />
            <Tab value={NotificationTabs.APP_UPDATE} label="App Updates" />
          </Tabs>
        </Box>
        {tabContent(tab)}
      </Card>
      <AddAnnouncementModal open={quickAdd.value} onClose={quickAdd.onFalse} />
    </Container>
  );
};

export default NotificationsView;
