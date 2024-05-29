'use client';

import { Box, Card, Container, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

import { PDFUploadTabs, pdfUploadData } from 'src/types/product-upload.types';
import AIF from './tabs/aif';
import MutualFunds from './tabs/mutual-funds';
import PMS from './tabs/pms';

const PDFUploadView = () => {
  const [tab, setTab] = useState<PDFUploadTabs>(PDFUploadTabs.MUTUAL_FUND);

  const handleChange = (_event: React.SyntheticEvent, newValue: PDFUploadTabs) => {
    setTab(newValue);
  };

  const tabContent = (newTab: PDFUploadTabs) => {
    switch (newTab) {
      case PDFUploadTabs.MUTUAL_FUND:
        return <MutualFunds data={pdfUploadData} />;
      case PDFUploadTabs.PMS:
        return <PMS data={pdfUploadData} />;
      case PDFUploadTabs.AIF:
        return <AIF data={pdfUploadData} />;

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
      <Typography variant="h4">PDF Upload</Typography>
      <Card sx={{ width: '100%', mt: 3 }}>
        <Box sx={{ borderBottom: 1, px: 2, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange} aria-label="notification tabs">
            {Object.values(PDFUploadTabs).map((p) => (
              <Tab key={p} label={p} value={p} />
            ))}
          </Tabs>
        </Box>
        {tabContent(tab)}
      </Card>
    </Container>
  );
};

export default PDFUploadView;
