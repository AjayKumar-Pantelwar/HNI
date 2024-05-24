import { Tab, Tabs, Typography } from '@mui/material';
import { SubTabs } from 'src/types/content-management/research.types';
import { capitalize } from 'src/utils/change-case';

interface Props {
  tab: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const SubTabsInternal = (props: Props) => {
  const { handleChange, tab } = props;
  return (
    <Tabs
      value={tab}
      onChange={handleChange}
      aria-label="notification tabs"
      TabIndicatorProps={{
        sx: {
          display: 'none',
        },
      }}
      sx={{
        minHeight: '35px',
        backgroundColor: 'divider',
        borderRadius: '8px',
        p: 0.5,
        '&  .Mui-selected': {
          backgroundColor: 'background.paper',
          borderRadius: '8px',
        },
      }}
    >
      {Object.values(SubTabs).map((d, i) => (
        <Tab
          label={<Typography variant="subtitle2">{capitalize(d)}</Typography>}
          sx={{
            '&.MuiButtonBase-root': {
              mr: 'unset',
              minHeight: '35px',
            },
            '&.Mui-selected': {
              color: 'primary.main',
              boxShadow: 3,
            },
            color: 'text.secondary',
            px: { xs: 1, md: 3 },
            py: '0',
          }}
          key={d}
          value={i + 1}
        />
      ))}
    </Tabs>
  );
};

export default SubTabsInternal;
