import { Investor } from 'src/types/investor.types';

import { useCallback, useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import Tab from '@mui/material/Tab';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
// routes

// components
import Iconify from 'src/components/iconify';
import ProfileCover from './profile-cover';
import BasicDetails from './tabs/basic-details';

import PortfolioDetails from './tabs/portfolio-details';
import QuestionnaireDetails from './tabs/questionnaire-details';
import RMDetails from './tabs/rm-details';
//

// ----------------------------------------------------------------------

type Props = { investor: Investor };

const TABS = [
  {
    value: 'profile',
    label: 'Profile',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'rm',
    label: 'RM Details',
    icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
  },
  {
    value: 'questionnaire',
    label: 'Questionnaire',
    icon: <Iconify icon="solar:heart-bold" width={24} />,
  },
  {
    value: 'portfolio',
    label: 'Portfolio',
    icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function InvestorProfile(props: Props) {
  const { investor } = props;

  const [currentTab, setCurrentTab] = useState('profile');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <>
      <Card
        sx={{
          mb: 3,
          height: 290,
        }}
      >
        <ProfileCover investor={investor} />

        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            bgcolor: 'background.paper',
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 3 },
              justifyContent: {
                sm: 'center',
                md: 'flex-end',
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Card>

      {currentTab === 'profile' && <BasicDetails investor={investor} />}

      {currentTab === 'rm' && <RMDetails investor={investor} />}

      {currentTab === 'questionnaire' && <QuestionnaireDetails />}

      {currentTab === 'portfolio' && <PortfolioDetails investor={investor} />}
    </>
  );
}
