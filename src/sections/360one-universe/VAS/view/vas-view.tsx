'use client';

import { Box, Card, Container, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { useBoolean } from 'src/hooks/use-boolean';

import { VASApi } from 'src/redux/api/vas.api';
import { paths } from 'src/routes/paths';
import { ResearchData } from 'src/types/content-management/research.types';
import { VASProductTabs } from 'src/types/unverise/vas.types';
import { capitalize } from 'src/utils/change-case';
import EditTabName from './edit-tab-name';
import LendingSolutionsTab from './tabs/lending-solutions/lending-solutions';
import WillsTab from './tabs/wills/wills';

interface TabProps {
  tab: ResearchData;
  value: number;
  currentTab: number;
}

const VASView = () => {
  const settings = useSettingsContext();
  const { data } = VASApi.useVasProductsQuery();

  const edit = useBoolean();

  const [tabName, setTabName] = useState('');
  const [tabId, setTabId] = useState('');

  const [tab, setTab] = useState<VASProductTabs>(VASProductTabs.LENDINGSOLUTIONS);

  const handleChange = (_event: React.SyntheticEvent, newValue: VASProductTabs) => {
    setTab(newValue);
  };

  const tabContent = (newTab: VASProductTabs) => {
    switch (newTab) {
      case VASProductTabs.LENDINGSOLUTIONS:
        return <LendingSolutionsTab data={data?.data?.lending_solutions} />;
      case VASProductTabs.WILLS:
        return <WillsTab data={data?.data?.wills} />;
      // case 3:
      //   return <VASTab3 data={data[newTab - 1]} />;
      // case 4:
      //   return <VASTab4 data={data[newTab - 1]} />;
      // case 5:
      //   return <VASTab5 data={data[newTab - 1]} />;
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
          { name: '360 Universe', href: paths.dashboard.universe.root },
          { name: 'Research' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Card sx={{ width: '100%', mt: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tabs
            allowScrollButtonsMobile
            value={tab}
            onChange={handleChange}
            aria-label="notification tabs"
          >
            {data &&
              Object.entries(data?.data).map(([key, d], i) => (
                <Tab
                  key={key}
                  value={key}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle2">{capitalize(d?.product_name)}</Typography>
                      {tab === key && (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            edit.onTrue();
                            setTabName(d?.product_name);
                            setTabId(d?.product_id);
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
      <EditTabName tid={tabId} open={edit.value} onClose={edit.onFalse} tabName={tabName} />
    </Container>
  );
};

export default VASView;
