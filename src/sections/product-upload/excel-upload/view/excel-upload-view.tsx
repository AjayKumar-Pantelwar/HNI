'use client';

import { Box, Card, Container, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { ExcelUploadTabs } from 'src/types/product-upload.types';
import AIF from './tabs/aif';
import Exclusives from './tabs/exclusives';
import GlobalInvesting from './tabs/global-investing';
import MutualFunds from './tabs/mutual-funds';
import PMS from './tabs/pms';

const ExcelUploadView = () => {
  const [tab, setTab] = useState<ExcelUploadTabs>(ExcelUploadTabs.MUTUAL_FUND);

  const handleChange = (_event: React.SyntheticEvent, newValue: ExcelUploadTabs) => {
    setTab(newValue);
  };

  const tabContent = (newTab: ExcelUploadTabs) => {
    switch (newTab) {
      case ExcelUploadTabs.MUTUAL_FUND:
        return <MutualFunds />;
      case ExcelUploadTabs.PMS:
        return <PMS />;
      case ExcelUploadTabs.AIF:
        return <AIF />;
      case ExcelUploadTabs.GLOBAL_INVESTING:
        return <GlobalInvesting />;
      case ExcelUploadTabs.EXCLUSIVES:
        return <Exclusives />;
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
      <Typography variant="h4">Excel Upload</Typography>
      <Card sx={{ width: '100%', mt: 3 }}>
        <Box sx={{ borderBottom: 1, px: 2, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange} aria-label="notification tabs">
            {Object.values(ExcelUploadTabs).map((p) => (
              <Tab key={p} label={p} value={p} />
            ))}
          </Tabs>
        </Box>
        {tabContent(tab)}
      </Card>
    </Container>
  );
};

export default ExcelUploadView;
