'use client';

import { Box, Card, Container, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { useBoolean } from 'src/hooks/use-boolean';
import { researchApi } from 'src/redux/api/research.api';
import { paths } from 'src/routes/paths';
import { ResearchData } from 'src/types/content-management/research.types';
import { capitalize } from 'src/utils/change-case';
import EditTabName from '../edit-tab-name';
import ResearchMainView from './views/research-main-view';

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
  const { data } = researchApi.useGetResearchQuery();

  const edit = useBoolean();

  const [tabName, setTabName] = useState('');

  const [tab, setTab] = useState(1);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const tabContent = (newTab: number) => {
    const flag = data?.data?.[newTab - 1];
    console.log({ flag });
    if (!flag) return <></>;
    return <ResearchMainView data={data?.data?.[newTab - 1]} />;
  };

  const id = data?.data?.[tab - 1]?.tab_id || '';

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
          <Tabs
            value={tab}
            allowScrollButtonsMobile
            onChange={handleChange}
            aria-label="notification tabs"
          >
            {data?.data?.map((d, i) => (
              <Tab
                key={i}
                value={i + 1}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2">{capitalize(d?.table_name)}</Typography>
                    {tab === i + 1 && (
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          edit.onTrue();
                          setTabName(d?.table_name);
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
      <EditTabName open={edit.value} onClose={edit.onFalse} tabName={tabName} tabId={id} />
    </Container>
  );
};

export default ResearchListView;
