import { Theme } from '@mui/material/styles';
//
import { secondaryFont } from 'src/theme/typography';
import { menuItem } from '../../css';

// ----------------------------------------------------------------------

export default function Menu(theme: Theme) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: secondaryFont.style.fontFamily,
          ...menuItem(theme),
        },
      },
    },
  };
}
