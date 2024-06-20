import { AvatarProps } from '@mui/material/Avatar';
import { avatarGroupClasses, AvatarGroupProps } from '@mui/material/AvatarGroup';
import { alpha, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

const COLORS = ['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const colorByName = (name: string) => {
  const charAt = name.charAt(0).toLocaleUpperCase();

  if (['A', 'C', 'F'].includes(charAt)) return '#5A32FF';
  if (['E', 'D', 'H'].includes(charAt)) return '#FD3359';
  if (['I', 'K', 'L'].includes(charAt)) return '#FD7740';
  if (['M', 'N', 'P'].includes(charAt)) return '#FBB03B';
  if (['Q', 'S', 'T'].includes(charAt)) return '#4F4F4F';
  if (['V', 'X', 'Y'].includes(charAt)) return '#5C64AF';
  return 'default';
};

// NEW VARIANT
declare module '@mui/material/AvatarGroup' {
  interface AvatarGroupPropsVariantOverrides {
    compact: true;
  }
}

// ----------------------------------------------------------------------

export default function Avatar(theme: Theme) {
  return {
    MuiAvatar: {
      variants: COLORS.map((color) =>
        color === 'default'
          ? {
              props: { color: 'default' },
              style: {
                color: theme.palette.text.secondary,
                backgroundColor: alpha(theme.palette.grey[500], 0.24),
              },
            }
          : {
              props: { color },
              style: {
                color: theme.palette[color].contrastText,
                backgroundColor: theme.palette[color].main,
              },
            }
      ),

      styleOverrides: {
        root: {
          textTransform: 'uppercase',
        },
        rounded: {
          borderRadius: theme.shape.borderRadius * 1.5,
        },
        colorDefault: ({ ownerState }: { ownerState: AvatarProps }) => {
          const color = colorByName(`${ownerState.alt}`);

          return {
            ...(!!ownerState.alt && {
              color: theme.palette.secondary.contrastText,
              backgroundColor: color,
            }),
          };
        },
      },
    },
    MuiAvatarGroup: {
      defaultProps: {
        max: 4,
      },
      styleOverrides: {
        root: ({ ownerState }: { ownerState: AvatarGroupProps }) => ({
          textTransform: 'uppercase',

          justifyContent: 'flex-end',
          ...(ownerState.variant === 'compact' && {
            width: 40,
            height: 40,
            position: 'relative',
            [`& .${avatarGroupClasses.avatar}`]: {
              margin: 0,
              width: 28,
              height: 28,
              position: 'absolute',
              '&:first-of-type': {
                left: 0,
                bottom: 0,
                zIndex: 9,
              },
              '&:last-of-type': {
                top: 0,
                right: 0,
              },
            },
          }),
        }),
        avatar: {
          fontSize: 16,
          fontWeight: theme.typography.fontWeightSemiBold,
          '&:first-of-type': {
            fontSize: 12,
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary.lighter,
          },
        },
      },
    },
  };
}
