import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Divider(theme: Theme) {
  return {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderStyle: 'dashed',
        },
      },
    },
  };
}
