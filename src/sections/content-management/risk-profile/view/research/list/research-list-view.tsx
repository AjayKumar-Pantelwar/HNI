'use client';

import { Box, Card, Container, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { useBoolean } from 'src/hooks/use-boolean';
import { paths } from 'src/routes/paths';
import { ResearchData, mockGetResearchResponse } from 'src/types/content-management/research.types';
import { capitalize } from 'src/utils/change-case';
import EditTabName from '../edit-tab-name';
import ResearchTab1 from './tabs/tab1/tab1';

import ResearchTab2 from './tabs/tab2/tab2';
import ResearchTab3 from './tabs/tab3/tab3';
import ResearchTab4 from './tabs/tab4/tab4';

interface TabProps {
  tab: ResearchData;
  value: number;
  currentTab: number;
}

const CustomeTab = (props: TabProps) => {
  const { tab, value, currentTab } = props;

  return <></>;
};

const ResearchListView = () => {
  const settings = useSettingsContext();
  const { data } = mockGetResearchResponse;

  const edit = useBoolean();

  const [tabName, setTabName] = useState('');

  const [tab, setTab] = useState(1);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const tabContent = (newTab: number) => {
    switch (newTab) {
      case 1:
        return <ResearchTab1 data={data[newTab - 1]} />;
      case 2:
        return <ResearchTab2 data={data[newTab - 1]} />;
      case 3:
        return <ResearchTab3 data={data[newTab - 1]} />;
      case 4:
        return <ResearchTab4 data={data[newTab - 1]} />;
      default:
        return <></>;
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Research"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Content Management', href: paths.dashboard.contentManagement.root },
          { name: 'Research' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Card sx={{ width: '100%', mt: 3 }}>
        <Box sx={{ borderBottom: 1, px: 2, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange} aria-label="notification tabs">
            {data.map((d, i) => (
              <Tab
                key={i}
                value={i + 1}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2">{capitalize(d.tab_name)}</Typography>
                    {tab === i + 1 && (
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          edit.onTrue();
                          setTabName(d.tab_name);
                        }}
                      >
                        <EditIcon fontSize="small" color="primary" />
                      </IconButton>
                    )}
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>
        {tabContent(tab)}
      </Card>
      <EditTabName open={edit.value} onClose={edit.onFalse} tabName={tabName} />
    </Container>
  );
};

export default ResearchListView;