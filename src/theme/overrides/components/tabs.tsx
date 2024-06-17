import { Theme } from '@mui/material/styles';
import { tabClasses } from '@mui/material/Tab';
import { secondaryFont } from 'src/theme/typography';

// ----------------------------------------------------------------------

export default function Tabs(theme: Theme) {
  return {
    MuiTabs: {
      defaultProps: {
        textColor: 'inherit',
        variant: 'scrollable',
        scrollButtons: false,
      },
      styleOverrides: {
        root: {
          paddingInline: theme.spacing(2),
        },
        indicator: {
          backgroundColor: theme.palette.primary.main,
          transform: 'scaleX(0.8)',
        },
        scrollButtons: {
          width: 48,
          borderRadius: '50%',
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
        iconPosition: 'start',
      },
      styleOverrides: {
        root: {
          padding: 0,
          opacity: 1,
          minWidth: 48,
          minHeight: 48,
          fontWeight: theme.typography.fontWeightMedium,
          fontSize: '16px',
          '&:not(:last-of-type)': {
            marginRight: theme.spacing(3),
            [theme.breakpoints.up('sm')]: {
              marginRight: theme.spacing(5),
            },
          },
          [`&:not(.${tabClasses.selected})`]: {
            color: theme.palette.text.secondary,
          },
          '&.Mui-selected': {
            fontFamily: secondaryFont.style.fontFamily,
            fontSize: '16px',
            fontWeight: theme.typography.fontWeightSemiBold,
          },
        },
      },
    },
  };
}
