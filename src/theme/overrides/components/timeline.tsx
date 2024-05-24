import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Timeline(theme: Theme) {
  return {
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          // transform: 'rotate(-90deg)',
        },
      },
    },

    // MuiTimelineConnector: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: theme.palette.divider,
    //       textAlign: 'left',
    //     },
    //   },
    // },
    // MuiTimeline: {
    //   styleOverrides: {
    //     root: {
    //       transform: 'rotate(90deg)',
    //     },
    //   },
    // },
    // MuiTimelineContent: {
    //   styleOverrides: {
    //     root: {
    //       display: 'inline-block',
    //       transform: 'rotate(-90deg)',
    //       textAlign: 'center',
    //       minWidth: 50,
    //     },
    //   },
    // },
    // MuiTimelineIcon: {
    //   styleOverrides: {
    //     root: {
    //       transform: 'rotate(-90deg)',
    //     },
    //   },
    // },
  };
}
