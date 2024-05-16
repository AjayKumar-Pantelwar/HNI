'use client';

import { Box, Card, Container, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { ProductUploadTabs } from 'src/types/product-upload.types';
import AIF from './tabs/aif';
import Exclusives from './tabs/exclusives';
import GlobalInvesting from './tabs/global-investing';
import MutualFunds from './tabs/mutual-funds';
import PMS from './tabs/pms';

const ProductUploadView = () => {
  const [tab, setTab] = useState<ProductUploadTabs>(ProductUploadTabs.MUTUAL_FUND);

  const handleChange = (_event: React.SyntheticEvent, newValue: ProductUploadTabs) => {
    setTab(newValue);
  };

  const tabContent = (newTab: ProductUploadTabs) => {
    switch (newTab) {
      case ProductUploadTabs.MUTUAL_FUND:
        return <MutualFunds />;
      case ProductUploadTabs.PMS:
        return <PMS />;
      case ProductUploadTabs.AIF:
        return <AIF />;
      case ProductUploadTabs.GLOBAL_INVESTING:
        return <GlobalInvesting />;
      case ProductUploadTabs.EXCLUSIVES:
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
      <Typography variant="h4">Notification</Typography>
      <Card sx={{ width: '100%', mt: 3 }}>
        <Box sx={{ borderBottom: 1, px: 2, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange} aria-label="notification tabs">
            {Object.values(ProductUploadTabs).map((p) => (
              <Tab key={p} label={p} value={p} />
            ))}
          </Tabs>
        </Box>
        {tabContent(tab)}
      </Card>
    </Container>
  );
};

export default ProductUploadView;
