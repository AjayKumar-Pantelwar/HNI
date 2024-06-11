import { Check, Clear } from '@mui/icons-material';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const CustomSwitch = styled((props: SwitchProps) => (
  <Switch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    checkedIcon={<Check />}
    icon={<Clear />}
    {...props}
  />
))(({ theme }) => ({
  width: 55,
  height: 28,
  padding: 0,

  '&:hover .MuiSwitch-switchBase': {
    backgroundColor: theme.palette.background.paper,
  },

  '&:hover .MuiSwitch-switchBase.Mui-checked': {
    backgroundColor: theme.palette.background.paper,
    '& svg path': {
      fill: theme.palette.primary.main,
    },
  },
  '& .MuiButtonBase-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiSwitch-switchBase': {
    padding: 0,
    marginBlock: 2,
    transitionDuration: '100ms',
    transitionTimingFunction: 'ease-in',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    '& .MuiSvgIcon-root path': {
      fill: theme.palette.secondary.main,
    },
    '&.Mui-checked': {
      margin: 2,
      '& .MuiSvgIcon-root path': {
        fill: theme.palette.primary.main,
      },
      transform: 'translateX(24px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },

    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    borderRadius: 4,
    boxSizing: 'border-box',
    width: 22,
    height: 22,
    color: theme.palette.background.paper,
  },
  '& .MuiSwitch-track': {
    borderRadius: 4,
    backgroundColor: theme.palette.secondary.main,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export default CustomSwitch;
